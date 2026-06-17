import { FileText, CheckCircle, FileEdit, Clock } from 'lucide-react'
import { MOCK_BLOGS, MOCK_COMMENTS } from '@/lib/mock/blogs'
import { StatCard } from './stat-card'

export function DashboardStats() {
  const total = MOCK_BLOGS.length
  const published = MOCK_BLOGS.filter((b) => b.is_published).length
  const drafts = total - published
  const pending = MOCK_COMMENTS.filter((c) => c.status === 'pending').length

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard label="บทความทั้งหมด" value={total} icon={FileText} iconColor="text-blue-600" iconBg="bg-blue-50" />
      <StatCard label="เผยแพร่แล้ว" value={published} icon={CheckCircle} iconColor="text-green-600" iconBg="bg-green-50" />
      <StatCard label="Draft" value={drafts} icon={FileEdit} iconColor="text-orange-500" iconBg="bg-orange-50" />
      <StatCard label="รอ Approve" value={pending} icon={Clock} iconColor="text-purple-600" iconBg="bg-purple-50" />
    </div>
  )
}
