'use client'

import { useState } from 'react'

type Status = 'idle' | 'loading' | 'error'

export function useLoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setErrorMessage(data.message ?? 'อีเมลหรือรหัสผ่านไม่ถูกต้อง')
        setStatus('error')
        return
      }

      window.location.href = '/admin/blogs'
    } catch {
      setErrorMessage('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
      setStatus('error')
    }
  }

  return { email, setEmail, password, setPassword, status, errorMessage, submit }
}
