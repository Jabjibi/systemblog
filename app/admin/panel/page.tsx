import { AdminSidebar } from '@/components/admin/dashboard/sidebar'
import { AdminTopbar } from '@/components/admin/dashboard/topbar'
import { DashboardBanner } from '@/components/admin/dashboard/banner'
import { QuickStatPills } from '@/components/admin/dashboard/stat-pills'
import { RecentBlogCards } from '@/components/admin/dashboard/recent-blog-cards'
import { RecentCommentsTable } from '@/components/admin/dashboard/recent-comments-table'

export default function AdminPanelPage() {
  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 bg-[#F0EFF8] p-6 overflow-auto flex flex-col gap-5">
        <AdminTopbar />
        <DashboardBanner />
        <QuickStatPills />
        <div className="flex-1 flex flex-col">
          <RecentBlogCards />
        </div>
        <RecentCommentsTable />
      </main>
    </div>
  )
}
