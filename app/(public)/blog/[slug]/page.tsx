import { notFound } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { BlogDetailHeader } from '@/components/blog/blog-detail-header'
import { BlogCoverImage } from '@/components/blog/blog-cover-image'
import { BlogContent } from '@/components/blog/blog-content'
import { BlogExtraImages } from '@/components/blog/blog-extra-images'
import { CommentList } from '@/components/blog/comment-list'
import { CommentForm } from '@/components/blog/comment-form'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const { data: blog } = await supabaseAdmin
    .from('blogs')
    .select('title, excerpt')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()
  if (!blog) return {}
  return { title: `${blog.title} | SystemBlog`, description: blog.excerpt }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params

  const { data: blog } = await supabaseAdmin
    .from('blogs')
    .select('id, title, slug, content, cover_image_url, view_count, published_at')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()

  if (!blog) notFound()

  const [{ data: images }, { data: comments }] = await Promise.all([
    supabaseAdmin
      .from('blog_images')
      .select('id, image_url, sort_order')
      .eq('blog_id', blog.id)
      .order('sort_order'),
    supabaseAdmin
      .from('comments')
      .select('id, sender_name, message, created_at')
      .eq('blog_id', blog.id)
      .eq('status', 'approved')
      .order('created_at', { ascending: true }),
  ])

  await supabaseAdmin.rpc('increment_view_count', { blog_slug: slug })

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 space-y-8">
      <BlogDetailHeader
        title={blog.title}
        publishedAt={blog.published_at}
        viewCount={blog.view_count}
      />

      {blog.cover_image_url && (
        <BlogCoverImage src={blog.cover_image_url} alt={blog.title} />
      )}

      <BlogContent content={blog.content} />

      <BlogExtraImages images={images ?? []} />

      <Separator />

      <div className="space-y-8">
        <CommentList comments={comments ?? []} />
        <Separator />
        <CommentForm slug={slug} />
      </div>
    </div>
  )
}
