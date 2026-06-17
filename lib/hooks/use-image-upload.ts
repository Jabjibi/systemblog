'use client'

import { useState, useRef } from 'react'

type Status = 'idle' | 'uploading' | 'done' | 'error'

export function useImageUpload(onChange: (url: string) => void) {
  const [preview, setPreview] = useState<string | null>(null)
  const [status, setStatus] = useState<Status>('idle')
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(file: File) {
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target?.result as string)
    reader.readAsDataURL(file)

    setStatus('uploading')

    const formData = new FormData()
    formData.append('file', file)

    const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })

    if (!res.ok) {
      setStatus('error')
      return
    }

    const { url } = await res.json()
    onChange(url)
    setStatus('done')
  }

  function onInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) handleFile(file)
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault()
    const file = e.dataTransfer.files?.[0]
    if (file) handleFile(file)
  }

  return { preview, status, inputRef, onInputChange, onDrop }
}
