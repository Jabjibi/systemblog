import Image from 'next/image'
import { MOCK_BLOGS } from '@/lib/mock/blogs'

export function RecentBlogCards() {
  const recent = MOCK_BLOGS.slice(0, 3)

  return (
    <div className="flex flex-col flex-1">
      <h2 className="font-semibold text-foreground mb-4">บทความล่าสุด</h2>
      <div className="grid grid-cols-3 gap-4 flex-1">
        {recent.map((blog) => (
          <div key={blog.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col">
            <div className="relative flex-1 min-h-44">
              <Image src={blog.cover_image_url} alt={blog.title} fill className="object-cover" />
            </div>
            <div className="p-4">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mb-2 ${
                blog.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
              }`}>
                {blog.is_published ? 'เผยแพร่' : 'Draft'}
              </span>
              <p className="text-sm font-medium text-foreground line-clamp-2 leading-snug mb-2">
                {blog.title}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(blog.published_at).toLocaleDateString('th-TH', {
                  day: 'numeric',
                  month: 'short',
                  year: '2-digit',
                })}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
