'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'

type FormState = {
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image_url: string
  is_published: boolean
  additional_images: string[]
}

const EMPTY: FormState = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  cover_image_url: '',
  is_published: false,
  additional_images: [],
}

export function useBlogForm() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string | undefined

  const [form, setForm] = useState<FormState>(EMPTY)
  const [status, setStatus] = useState<'idle' | 'loading' | 'saving' | 'error'>('idle')

  useEffect(() => {
    if (!id) return
    setStatus('loading')
    fetch(`/api/admin/blogs/${id}`)
      .then((r) => r.json())
      .then((data) => {
        setForm({
          title: data.title ?? '',
          slug: data.slug ?? '',
          excerpt: data.excerpt ?? '',
          content: data.content ?? '',
          cover_image_url: data.cover_image_url ?? '',
          is_published: data.is_published ?? false,
          additional_images: (data.images ?? []).map((img: { image_url: string }) => img.image_url),
        })
        setStatus('idle')
      })
  }, [id])

  function setField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('saving')

    const method = id ? 'PATCH' : 'POST'
    const url = id ? `/api/admin/blogs/${id}` : '/api/admin/blogs'

    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    })

    if (!res.ok) { setStatus('error'); return }
    router.push('/admin/blogs')
  }

  return { form, setField, status, submit, isEdit: !!id }
}
