'use client'

import { useState, useCallback } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'

export function useBlogSearch(initialQuery: string) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [inputValue, setInputValue] = useState(initialQuery)

  const submitSearch = useCallback(
    (value: string) => {
      const params = new URLSearchParams()
      if (value.trim()) params.set('q', value.trim())
      params.set('page', '1')
      router.push(`${pathname}?${params.toString()}`)
    },
    [router, pathname]
  )

  const setPage = useCallback(
    (p: number) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('page', String(p))
      router.push(`${pathname}?${params.toString()}`)
    },
    [router, pathname, searchParams]
  )

  return { inputValue, setInputValue, submitSearch, setPage }
}
