import { AdminSidebar } from '@/components/dashboard-admin/admin-sidebar'
import { BlogForm } from '@/components/dashboard-admin/blog-form'

export default function AdminBlogNewPage() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-[#F0EFF8] p-6 flex flex-col gap-6 overflow-auto">
        <div>
          <h1 className="text-2xl font-bold text-foreground">สร้างบทความใหม่</h1>
          <p className="text-sm text-muted-foreground mt-1">กรอกข้อมูลแล้วกดบันทึก</p>
        </div>
        <BlogForm />
      </main>
    </div>
  )
}
