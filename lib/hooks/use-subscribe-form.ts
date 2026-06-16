'use client'

import { useState, useCallback } from 'react'

export function useSubscribeForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const submit = useCallback(async () => {
    if (!email.trim()) return
    setStatus('loading')
    // TODO: wire up real subscription API
    await new Promise((r) => setTimeout(r, 600))
    setStatus('success')
    setEmail('')
  }, [email])

  return { email, setEmail, status, submit }
}
