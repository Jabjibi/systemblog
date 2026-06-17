import { NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase/admin'

export async function GET() {
  const session = await verifyAdminSession()
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabaseAdmin
    .from('blogs')
    .select('id, title, slug, excerpt, cover_image_url, is_published, view_count, published_at, created_at, updated_at')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ message: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: Request) {
  const session = await verifyAdminSession()
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const body = await request.json()
  const { title, slug, excerpt, content, cover_image_url, is_published, additional_images } = body

  if (!title || !slug) return NextResponse.json({ message: 'title และ slug จำเป็นต้องระบุ' }, { status: 400 })

  const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
  if (!slugRegex.test(slug)) return NextResponse.json({ message: 'รูปแบบ slug ไม่ถูกต้อง' }, { status: 400 })

  const { data: blog, error } = await supabaseAdmin
    .from('blogs')
    .insert({
      title,
      slug,
      excerpt: excerpt ?? '',
      content: content ?? '',
      cover_image_url: cover_image_url || null,
      is_published: is_published ?? false,
      published_at: is_published ? new Date().toISOString() : null,
    })
    .select('id')
    .single()

  if (error) return NextResponse.json({ message: error.message }, { status: 500 })

  if (Array.isArray(additional_images) && additional_images.length > 0) {
    const images = additional_images.slice(0, 6).map((url: string, i: number) => ({
      blog_id: blog.id,
      image_url: url,
      sort_order: i,
    }))
    await supabaseAdmin.from('blog_images').insert(images)
  }

  return NextResponse.json({ id: blog.id }, { status: 201 })
}
