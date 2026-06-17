import { NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase/admin'

export async function POST(request: Request) {
  const session = await verifyAdminSession()
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const formData = await request.formData()
  const file = formData.get('file') as File | null

  if (!file) return NextResponse.json({ message: 'ไม่พบไฟล์' }, { status: 400 })

  const ext = file.name.split('.').pop()
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const buffer = await file.arrayBuffer()

  const { error } = await supabaseAdmin.storage
    .from('blog-images')
    .upload(filename, buffer, { contentType: file.type, upsert: false })

  if (error) return NextResponse.json({ message: error.message }, { status: 500 })

  const { data } = supabaseAdmin.storage.from('blog-images').getPublicUrl(filename)

  return NextResponse.json({ url: data.publicUrl })
}
