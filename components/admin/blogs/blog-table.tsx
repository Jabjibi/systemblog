'use client'

import Link from 'next/link'
import { Pencil, Trash2 } from 'lucide-react'
import { useBlogList } from '@/lib/hooks/use-blog-list'

export function BlogTable() {
  const { blogs, status, togglePublish, deleteBlog } = useBlogList()

  if (status === 'loading') return <p className="text-sm text-muted-foreground">กำลังโหลด...</p>
  if (status === 'error') return <p className="text-sm text-red-500">โหลดข้อมูลไม่สำเร็จ</p>

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left text-muted-foreground">
              <th className="px-6 py-3 font-medium">ชื่อบทความ</th>
              <th className="px-6 py-3 font-medium">Slug</th>
              <th className="px-6 py-3 font-medium">สถานะ</th>
              <th className="px-6 py-3 font-medium">วันที่</th>
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
                <td className="px-6 py-4 font-medium text-foreground max-w-xs">
                  <span className="line-clamp-1">{blog.title}</span>
                </td>
                <td className="px-6 py-4 text-muted-foreground font-mono text-xs">{blog.slug}</td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => togglePublish(blog.id, blog.is_published)}
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                      blog.is_published
                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {blog.is_published ? 'เผยแพร่' : 'Draft'}
                  </button>
                </td>
                <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                  {new Date(blog.created_at).toLocaleDateString('th-TH', {
                    day: 'numeric',
                    month: 'short',
                    year: '2-digit',
                  })}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/blogs/${blog.id}/edit`}
                      className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => { if (confirm('ลบบทความนี้ใช่ไหม?')) deleteBlog(blog.id) }}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
