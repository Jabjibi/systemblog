import { AdminSidebar } from '@/components/admin/dashboard/sidebar'
import { CommentTable } from '@/components/admin/comments/comment-table'

export default function AdminCommentsPage() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-[#F0EFF8] p-6 flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">คอมเมนต์</h1>
          <p className="text-sm text-muted-foreground mt-1">จัดการคอมเมนต์ทั้งหมด — Approve หรือ Reject แต่ละรายการ</p>
        </div>
        <CommentTable />
      </main>
    </div>
  )
}
