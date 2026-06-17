'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Blog } from '@/lib/mock/blogs'

type Status = 'loading' | 'idle' | 'error'

export function useBlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [status, setStatus] = useState<Status>('loading')

  const load = useCallback(async () => {
    setStatus('loading')
    const res = await fetch('/api/admin/blogs')
    if (!res.ok) { setStatus('error'); return }
    setBlogs(await res.json())
    setStatus('idle')
  }, [])

  useEffect(() => { load() }, [load])

  async function togglePublish(id: string, current: boolean) {
    await fetch(`/api/admin/blogs/${id}/publish`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_published: !current }),
    })
    load()
  }

  async function deleteBlog(id: string) {
    await fetch(`/api/admin/blogs/${id}`, { method: 'DELETE' })
    load()
  }

  return { blogs, status, togglePublish, deleteBlog }
}
