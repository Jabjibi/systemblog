import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, CalendarDays, Eye } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { MOCK_BLOGS, MOCK_BLOG_IMAGES, MOCK_COMMENTS } from '@/lib/mock/blogs'
import { CommentList } from '@/components/blog/comment-list'
import { CommentForm } from '@/components/blog/comment-form'

type Props = {
  params: Promise<{ slug: string }>
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export async function generateStaticParams() {
  return MOCK_BLOGS.map((b) => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params
  const blog = MOCK_BLOGS.find((b) => b.slug === slug)
  if (!blog) return {}
  return { title: `${blog.title} | SystemBlog`, description: blog.excerpt }
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params
  const blog = MOCK_BLOGS.find((b) => b.slug === slug && b.is_published)
  if (!blog) notFound()

  const extraImages = MOCK_BLOG_IMAGES[blog.id] ?? []
  const approvedComments = MOCK_COMMENTS.filter(
    (c) => c.blog_id === blog.id && c.status === 'approved'
  )

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12 space-y-8">
      {/* Back */}
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        กลับไปหน้าบทความ
      </Link>

      {/* Header */}
      <div className="space-y-4">
        <Badge variant="secondary">บทความ</Badge>
        <h1 className="text-3xl font-bold leading-tight">{blog.title}</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <CalendarDays className="w-4 h-4" />
            <time dateTime={blog.published_at}>{formatDate(blog.published_at)}</time>
          </span>
          <span className="flex items-center gap-1.5">
            <Eye className="w-4 h-4" />
            {blog.view_count.toLocaleString('th-TH')} ครั้ง
          </span>
        </div>
      </div>

      {/* Cover Image */}
      <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden">
        <Image
          src={blog.cover_image_url}
          alt={blog.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>

      {/* Content */}
      <div className="prose prose-neutral max-w-none">
        {blog.content.split('\n').map((line, i) => (
          <p key={i} className={line.startsWith('#') ? 'font-bold text-xl mt-6 mb-2' : 'text-foreground/80 leading-relaxed'}>
            {line.replace(/^#+\s/, '')}
          </p>
        ))}
      </div>

      {/* Extra Images */}
      {extraImages.length > 0 && (
        <div className="space-y-3">
          <h2 className="font-semibold text-lg">รูปภาพประกอบเพิ่มเติม</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {extraImages.map((img) => (
              <div key={img.id} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={img.image_url}
                  alt={`รูปประกอบ ${img.sort_order}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <Separator />

      {/* Comments */}
      <div className="space-y-8">
        <CommentList comments={approvedComments} />
        <Separator />
        <CommentForm blogId={blog.id} />
      </div>
    </div>
  )
}
