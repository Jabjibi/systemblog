import Link from 'next/link'
import { Plus } from 'lucide-react'
import { AdminSidebar } from '@/components/admin/dashboard/sidebar'
import { BlogTable } from '@/components/admin/blogs/blog-table'

export default function AdminBlogsPage() {
  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 bg-[#F0EFF8] p-6 flex flex-col gap-6 overflow-y-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">บทความ</h1>
            <p className="text-sm text-muted-foreground mt-1">จัดการบทความทั้งหมด</p>
          </div>
          <Link
            href="/admin/blogs/new"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-card-arrow-bg text-white text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            สร้างบทความ
          </Link>
        </div>
        <BlogTable />
      </main>
    </div>
  )
}
