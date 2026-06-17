import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const { data: blog, error } = await supabaseAdmin
    .from('blogs')
    .select('id, title, slug, content, excerpt, cover_image_url, view_count, published_at, created_at')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (error || !blog) return NextResponse.json({ message: 'ไม่พบบทความ' }, { status: 404 })

  const { data: images } = await supabaseAdmin
    .from('blog_images')
    .select('id, image_url, sort_order')
    .eq('blog_id', blog.id)
    .order('sort_order')

  await supabaseAdmin.rpc('increment_view_count', { blog_slug: slug })

  return NextResponse.json({ ...blog, images: images ?? [] })
}
