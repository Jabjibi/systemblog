'use client'

import Link from 'next/link'
import { Pencil, Trash2, Link2, Check, X, Eye } from 'lucide-react'
import { useBlogList } from '@/lib/hooks/use-blog-list'

export function BlogTable() {
  const {
    blogs, status, togglePublish, deleteBlog,
    editingSlug, setEditingSlug, startEditSlug, cancelEditSlug, saveSlug, slugSaving,
  } = useBlogList()

  if (status === 'loading') return <p className="text-sm text-muted-foreground">กำลังโหลด...</p>
  if (status === 'error') return <p className="text-sm text-red-500">โหลดข้อมูลไม่สำเร็จ</p>

  if (blogs.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 py-16 flex flex-col items-center justify-center gap-2">
        <p className="text-sm font-medium text-foreground">ยังไม่มีบทความ</p>
        <Link href="/admin/blogs/new" className="text-sm text-purple-600 hover:underline">สร้างบทความแรก →</Link>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left text-muted-foreground">
              <th className="px-6 py-3 font-medium">ชื่อบทความ</th>
              <th className="px-6 py-3 font-medium">Slug</th>
              <th className="px-6 py-3 font-medium">สถานะ</th>
              <th className="px-6 py-3 font-medium">
                <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />ยอดวิว</span>
              </th>
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog.id} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
                <td className="px-6 py-4 font-medium text-foreground max-w-xs">
                  <span className="line-clamp-1">{blog.title}</span>
                </td>

                <td className="px-6 py-4 text-muted-foreground font-mono text-xs max-w-[200px]">
                  {editingSlug?.id === blog.id ? (
                    <div className="flex items-center gap-1">
                      <input
                        autoFocus
                        value={editingSlug.value}
                        onChange={(e) => setEditingSlug({ id: blog.id, value: e.target.value })}
                        onKeyDown={(e) => { if (e.key === 'Enter') saveSlug(); if (e.key === 'Escape') cancelEditSlug() }}
                        className="w-full px-2 py-1 rounded border border-purple-300 outline-none text-xs font-mono"
                      />
                      <button
                        onClick={saveSlug}
                        disabled={slugSaving}
                        className="p-1 rounded hover:bg-green-50 text-green-600 disabled:opacity-50"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={cancelEditSlug} className="p-1 rounded hover:bg-red-50 text-red-500">
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <span className="line-clamp-1">{blog.slug}</span>
                  )}
                </td>

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

                <td className="px-6 py-4 text-muted-foreground">
                  {blog.view_count.toLocaleString()}
                </td>

                <td className="px-6 py-4">
                  <div className="flex items-center gap-1">
                    <Link
                      href={`/admin/blogs/${blog.id}/edit`}
                      title="แก้ไขบทความ"
                      className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-700 transition-colors"
                    >
                      <Pencil className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => startEditSlug(blog.id, blog.slug)}
                      title="แก้ไข Slug"
                      className="p-1.5 rounded-lg hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <Link2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => { if (confirm('ลบบทความนี้ใช่ไหม?')) deleteBlog(blog.id) }}
                      title="ลบบทความ"
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
