import { BlogCard } from './blog-card'
import { EmptyState } from '@/components/shared/empty-state'

type BlogGridProps = {
  blogs: { id: string; slug: string; title: string; excerpt: string; cover_image_url: string | null }[]
  query: string
}

export function BlogGrid({ blogs, query }: BlogGridProps) {
  if (blogs.length === 0) {
    return (
      <EmptyState
        title="ไม่พบบทความ"
        description={query ? `ไม่มีบทความที่ตรงกับ "${query}"` : 'ยังไม่มีบทความในขณะนี้'}
      />
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {blogs.map((blog, index) => (
        <BlogCard
          key={blog.id}
          slug={blog.slug}
          title={blog.title}
          excerpt={blog.excerpt}
          cover_image_url={blog.cover_image_url ?? ''}
          excerptVariant={index % 2 === 0 ? 'light' : 'dark'}
        />
      ))}
    </div>
  )
}
