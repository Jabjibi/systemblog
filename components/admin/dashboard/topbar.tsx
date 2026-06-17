'use client'

import { Search, User } from 'lucide-react'
import { useAdminSearch } from '@/lib/hooks/use-admin-search'

export function AdminTopbar() {
  const { query, setQuery } = useAdminSearch()

  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ค้นหาบทความ..."
          className="w-full pl-10 pr-4 py-2.5 bg-white rounded-xl border border-gray-100 text-sm text-foreground placeholder:text-gray-400 outline-none focus:border-purple-300 transition-colors"
        />
      </div>

      <div className="flex items-center gap-2.5 bg-white rounded-xl px-4 py-2.5 border border-gray-100 shrink-0">
        <div className="w-7 h-7 rounded-full bg-card-arrow-bg flex items-center justify-center">
          <User className="w-4 h-4 text-white" />
        </div>
        <span className="text-sm font-medium text-foreground">Admin</span>
      </div>
    </div>
  )
}
