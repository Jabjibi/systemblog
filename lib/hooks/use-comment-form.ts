'use client'

import { useState, useCallback } from 'react'

const THAI_REGEX = /^[฀-๿0-9\s\r\n]+$/

type FormState = {
  sender_name: string
  message: string
}

type ErrorState = {
  sender_name?: string
  message?: string
  submit?: string
}

export function useCommentForm(slug: string) {
  const [form, setForm] = useState<FormState>({ sender_name: '', message: '' })
  const [errors, setErrors] = useState<ErrorState>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const setField = useCallback(
    (field: keyof FormState, value: string) => {
      setForm((prev) => ({ ...prev, [field]: value }))
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    },
    []
  )

  const validate = useCallback((): boolean => {
    const next: ErrorState = {}
    if (!form.sender_name.trim()) {
      next.sender_name = 'กรุณากรอกชื่อผู้ส่ง'
    }
    if (!form.message.trim()) {
      next.message = 'กรุณากรอกข้อความ'
    } else if (!THAI_REGEX.test(form.message)) {
      next.message = 'ข้อความต้องเป็นภาษาไทยและ/หรือตัวเลขเท่านั้น'
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }, [form])

  const submit = useCallback(async () => {
    if (!validate()) return
    setIsSubmitting(true)
    try {
      const res = await fetch(`/api/blogs/${slug}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json()
        setErrors({ submit: data.message ?? 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง' })
        return
      }
      setIsSuccess(true)
      setForm({ sender_name: '', message: '' })
    } catch {
      setErrors({ submit: 'เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง' })
    } finally {
      setIsSubmitting(false)
    }
  }, [form, slug, validate])

  const reset = useCallback(() => {
    setIsSuccess(false)
    setErrors({})
  }, [])

  return { form, errors, isSubmitting, isSuccess, setField, submit, reset }
}
