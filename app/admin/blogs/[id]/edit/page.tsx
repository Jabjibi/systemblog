import { AdminSidebar } from '@/components/admin/dashboard/sidebar'
import { BlogForm } from '@/components/admin/blogs/blog-form'

export default async function AdminBlogEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return (
    <div className="flex h-screen overflow-hidden">
      <AdminSidebar />
      <main className="flex-1 bg-[#F0EFF8] p-6 flex flex-col gap-6 overflow-hidden">
        <div>
          <h1 className="text-2xl font-bold text-foreground">แก้ไขบทความ</h1>
          <p className="text-sm text-muted-foreground mt-1">แก้ไขข้อมูลแล้วกดบันทึก</p>
        </div>
        <BlogForm />
      </main>
    </div>
  )
}
