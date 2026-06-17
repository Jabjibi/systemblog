import { NextResponse } from 'next/server'
import { verifyAdminSession } from '@/lib/auth'
import { supabaseAdmin } from '@/lib/supabase/admin'

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifyAdminSession()
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const { id } = await params

  const { data: blog, error } = await supabaseAdmin
    .from('blogs')
    .select('*')
    .eq('id', id)
    .single()

  if (error || !blog) return NextResponse.json({ message: 'ไม่พบบทความ' }, { status: 404 })

  const { data: images } = await supabaseAdmin
    .from('blog_images')
    .select('id, image_url, sort_order')
    .eq('blog_id', id)
    .order('sort_order')

  return NextResponse.json({ ...blog, images: images ?? [] })
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifyAdminSession()
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const { id } = await params
  const body = await request.json()
  const { title, excerpt, content, cover_image_url, is_published, additional_images } = body

  const { error } = await supabaseAdmin
    .from('blogs')
    .update({
      title,
      excerpt,
      content,
      cover_image_url: cover_image_url || null,
      is_published,
      published_at: is_published ? new Date().toISOString() : null,
    })
    .eq('id', id)

  if (error) return NextResponse.json({ message: error.message }, { status: 500 })

  if (Array.isArray(additional_images)) {
    await supabaseAdmin.from('blog_images').delete().eq('blog_id', id)
    if (additional_images.length > 0) {
      const images = additional_images.slice(0, 6).map((url: string, i: number) => ({
        blog_id: id,
        image_url: url,
        sort_order: i,
      }))
      await supabaseAdmin.from('blog_images').insert(images)
    }
  }

  return NextResponse.json({ success: true })
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await verifyAdminSession()
  if (!session) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

  const { id } = await params

  const { error } = await supabaseAdmin.from('blogs').delete().eq('id', id)
  if (error) return NextResponse.json({ message: error.message }, { status: 500 })

  return NextResponse.json({ success: true })
}
