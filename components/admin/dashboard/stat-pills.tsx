'use client'

import { FileText, CheckCircle, Clock } from 'lucide-react'
import { type LucideIcon } from 'lucide-react'
import { useDashboardStats } from '@/lib/hooks/use-dashboard-stats'

type StatPillProps = {
  label: string
  sub: string
  icon: LucideIcon
  iconColor: string
  iconBg: string
}

function StatPill({ label, sub, icon: Icon, iconColor, iconBg }: StatPillProps) {
  return (
    <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3.5 border border-gray-100 flex-1">
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
        <Icon className={`w-5 h-5 ${iconColor}`} />
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{sub}</p>
        <p className="font-semibold text-foreground text-sm">{label}</p>
      </div>
    </div>
  )
}

export function QuickStatPills() {
  const { stats } = useDashboardStats()

  return (
    <div className="flex gap-3">
      <StatPill label={`${stats.total} บทความ`} sub="ทั้งหมด" icon={FileText} iconColor="text-blue-600" iconBg="bg-blue-50" />
      <StatPill label={`${stats.published} บทความ`} sub="เผยแพร่แล้ว" icon={CheckCircle} iconColor="text-green-600" iconBg="bg-green-50" />
      <StatPill label={`${stats.pending} รายการ`} sub="รอ Approve" icon={Clock} iconColor="text-purple-600" iconBg="bg-purple-50" />
    </div>
  )
}
