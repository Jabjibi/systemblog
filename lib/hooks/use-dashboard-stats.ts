'use client'

import { useState, useEffect } from 'react'

type Stats = {
  total: number
  published: number
  pending: number
}

export function useDashboardStats() {
  const [stats, setStats] = useState<Stats>({ total: 0, published: 0, pending: 0 })
  const [status, setStatus] = useState<'loading' | 'idle'>('loading')

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/blogs').then((r) => (r.ok ? r.json() : [])),
      fetch('/api/admin/comments').then((r) => (r.ok ? r.json() : [])),
    ]).then(([blogs, comments]) => {
      setStats({
        total: blogs.length,
        published: blogs.filter((b: { is_published: boolean }) => b.is_published).length,
        pending: comments.filter((c: { status: string }) => c.status === 'pending').length,
      })
      setStatus('idle')
    })
  }, [])

  return { stats, status }
}
