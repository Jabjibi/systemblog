import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

const THAI_REGEX = /^[฀-๿0-9\s\r\n]+$/

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const { data: blog } = await supabaseAdmin
    .from('blogs')
    .select('id')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!blog) return NextResponse.json({ message: 'ไม่พบบทความ' }, { status: 404 })

  const { data, error } = await supabaseAdmin
    .from('comments')
    .select('id, sender_name, message, created_at')
    .eq('blog_id', blog.id)
    .eq('status', 'approved')
    .order('created_at', { ascending: true })

  if (error) return NextResponse.json({ message: error.message }, { status: 500 })
  return NextResponse.json(data ?? [])
}

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const body = await request.json()
  const { sender_name, message } = body

  if (!sender_name?.trim()) return NextResponse.json({ message: 'กรุณากรอกชื่อผู้ส่ง' }, { status: 400 })
  if (!message?.trim()) return NextResponse.json({ message: 'กรุณากรอกข้อความ' }, { status: 400 })
  if (!THAI_REGEX.test(message)) return NextResponse.json({ message: 'ข้อความต้องเป็นภาษาไทยและ/หรือตัวเลขเท่านั้น' }, { status: 422 })

  const { data: blog } = await supabaseAdmin
    .from('blogs')
    .select('id')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!blog) return NextResponse.json({ message: 'ไม่พบบทความ' }, { status: 404 })

  const { error } = await supabaseAdmin.from('comments').insert({
    blog_id: blog.id,
    sender_name: sender_name.trim(),
    message: message.trim(),
    status: 'pending',
  })

  if (error) return NextResponse.json({ message: error.message }, { status: 500 })
  return NextResponse.json({ success: true }, { status: 201 })
}
