'use client'

import Link from 'next/link'
import { BookOpen, LayoutDashboard, MessageSquare, LogOut } from 'lucide-react'
import { useAdminNav } from '@/lib/hooks/use-admin-nav'

const NAV_ITEMS = [
  { label: 'Dashboard', href: '/admin/panel', icon: LayoutDashboard },
  { label: 'บทความ', href: '/admin/blogs', icon: BookOpen },
  { label: 'คอมเมนต์', href: '/admin/comments', icon: MessageSquare },
]

export function AdminSidebar() {
  const { isActive } = useAdminNav()

  return (
    <aside className="w-64 min-h-screen flex flex-col bg-brand-bar-bg text-brand-bar-text shrink-0">
      <div className="flex items-center gap-2 font-bold text-lg px-6 py-6 border-b border-white/10">
        <BookOpen className="w-5 h-5" />
        <span>SystemBlog</span>
      </div>

      <nav className="flex-1 px-4 py-6 flex flex-col gap-1">
        <p className="text-xs text-white/40 uppercase tracking-wider px-2 mb-3">OVERVIEW</p>
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
              isActive(href)
                ? 'bg-card-arrow-bg text-white'
                : 'text-white/60 hover:text-white hover:bg-white/10'
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        ))}
      </nav>

      <div className="px-4 pb-6 border-t border-white/10 pt-4">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 w-full transition-colors">
          <LogOut className="w-4 h-4" />
          ออกจากระบบ
        </button>
      </div>
    </aside>
  )
}
