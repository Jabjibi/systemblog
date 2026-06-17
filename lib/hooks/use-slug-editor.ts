'use client'

import { useState, useEffect } from 'react'

const SLUG_REGEX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export function useSlugEditor(blogId: string) {
  const [slug, setSlug] = useState('')
  const [status, setStatus] = useState<'loading' | 'idle' | 'saving' | 'success' | 'error'>('loading')
  const [error, setError] = useState('')

  useEffect(() => {
    fetch(`/api/admin/blogs/${blogId}`)
      .then((r) => r.json())
      .then((data) => {
        setSlug(data.slug ?? '')
        setStatus('idle')
      })
  }, [blogId])

  const isValid = SLUG_REGEX.test(slug)

  async function save() {
    if (!isValid) { setError('Slug ไม่ถูกต้อง'); return }
    setStatus('saving')
    setError('')
    const res = await fetch(`/api/admin/blogs/${blogId}/slug`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({}))
      setError(data.message ?? 'เกิดข้อผิดพลาด')
      setStatus('error')
      return
    }
    setStatus('success')
  }

  return { slug, setSlug, isValid, save, status, error }
}
