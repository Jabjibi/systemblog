'use client'

import { useState, useEffect, useCallback } from 'react'

type Blog = {
  id: string
  title: string
  slug: string
  excerpt: string
  cover_image_url: string | null
  is_published: boolean
  view_count: number
  published_at: string | null
  created_at: string
  updated_at: string
}

type Status = 'loading' | 'idle' | 'error'

export function useBlogList() {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [status, setStatus] = useState<Status>('loading')
  const [editingSlug, setEditingSlug] = useState<{ id: string; value: string } | null>(null)
  const [slugSaving, setSlugSaving] = useState(false)

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

  function startEditSlug(id: string, currentSlug: string) {
    setEditingSlug({ id, value: currentSlug })
  }

  function cancelEditSlug() {
    setEditingSlug(null)
  }

  async function saveSlug() {
    if (!editingSlug) return
    const slugRegex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
    if (!slugRegex.test(editingSlug.value)) return

    setSlugSaving(true)
    await fetch(`/api/admin/blogs/${editingSlug.id}/slug`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: editingSlug.value }),
    })
    setSlugSaving(false)
    setEditingSlug(null)
    load()
  }

  return { blogs, status, togglePublish, deleteBlog, editingSlug, setEditingSlug, startEditSlug, cancelEditSlug, saveSlug, slugSaving }
}
