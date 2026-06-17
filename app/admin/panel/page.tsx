import { AdminSidebar } from '@/components/dashboard-admin/admin-sidebar'
import { AdminTopbar } from '@/components/dashboard-admin/admin-topbar'
import { DashboardBanner } from '@/components/dashboard-admin/dashboard-banner'
import { QuickStatPills } from '@/components/dashboard-admin/quick-stat-pills'
import { RecentBlogCards } from '@/components/dashboard-admin/recent-blog-cards'
import { RecentCommentsTable } from '@/components/dashboard-admin/recent-comments-table'

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
