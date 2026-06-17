'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Plus, FileText } from 'lucide-react'
import { useBlogList } from '@/lib/hooks/use-blog-list'

export function RecentBlogCards() {
  const { blogs, status } = useBlogList()
  const recent = blogs.slice(0, 3)

  return (
    <div className="flex flex-col flex-1">
      <h2 className="font-semibold text-foreground mb-4">บทความล่าสุด</h2>

      {status === 'loading' ? (
        <div className="grid grid-cols-3 gap-4 flex-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 flex-1 animate-pulse min-h-44" />
          ))}
        </div>
      ) : recent.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center bg-white rounded-2xl border border-gray-100 border-dashed py-16 gap-4">
          <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center">
            <FileText className="w-7 h-7 text-purple-400" />
          </div>
          <div className="text-center">
            <p className="font-medium text-foreground">ยังไม่มีบทความ</p>
            <p className="text-sm text-muted-foreground mt-1">เริ่มสร้างบทความแรกของคุณได้เลย</p>
          </div>
          <Link
            href="/admin/blogs/new"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-card-arrow-bg text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            สร้างบทความใหม่
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4 flex-1">
          {recent.map((blog) => (
            <div key={blog.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 flex flex-col">
              {blog.cover_image_url && (
                <div className="relative flex-1 min-h-44">
                  <Image src={blog.cover_image_url} alt={blog.title} fill className="object-cover" />
                </div>
              )}
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
                  {new Date(blog.created_at).toLocaleDateString('th-TH', {
                    day: 'numeric',
                    month: 'short',
                    year: '2-digit',
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
