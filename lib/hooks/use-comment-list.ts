'use client'

import { useState, useEffect, useCallback } from 'react'
import type { Comment } from '@/lib/mock/blogs'

type Status = 'loading' | 'idle' | 'error'

export function useCommentList() {
  const [comments, setComments] = useState<Comment[]>([])
  const [status, setStatus] = useState<Status>('loading')

  const load = useCallback(async () => {
    setStatus('loading')
    const res = await fetch('/api/admin/comments')
    if (!res.ok) { setStatus('error'); return }
    setComments(await res.json())
    setStatus('idle')
  }, [])

  useEffect(() => { load() }, [load])

  async function updateStatus(id: string, newStatus: 'approved' | 'rejected') {
    await fetch(`/api/admin/comments/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    })
    load()
  }

  return { comments, status, updateStatus }
}
