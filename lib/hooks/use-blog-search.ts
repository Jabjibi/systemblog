'use client'

import { useState, useMemo, useCallback } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { type Blog, BLOGS_PER_PAGE } from '@/lib/mock/blogs'

export function useBlogSearch(allBlogs: Blog[]) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const query = searchParams.get('q') ?? ''
  const page = Number(searchParams.get('page') ?? '1')

  const [inputValue, setInputValue] = useState(query)

  const filtered = useMemo(() => {
    if (!query.trim()) return allBlogs
    return allBlogs.filter((b) =>
      b.title.toLowerCase().includes(query.toLowerCase())
    )
  }, [allBlogs, query])

  const totalPages = Math.ceil(filtered.length / BLOGS_PER_PAGE)

  const paginated = useMemo(() => {
    const start = (page - 1) * BLOGS_PER_PAGE
    return filtered.slice(start, start + BLOGS_PER_PAGE)
  }, [filtered, page])

  const setPage = useCallback(
    (p: number) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set('page', String(p))
      router.push(`${pathname}?${params.toString()}`)
    },
    [router, pathname, searchParams]
  )

  const submitSearch = useCallback(
    (value: string) => {
      const params = new URLSearchParams()
      if (value.trim()) params.set('q', value.trim())
      params.set('page', '1')
      router.push(`${pathname}?${params.toString()}`)
    },
    [router, pathname]
  )

  return {
    inputValue,
    setInputValue,
    query,
    page,
    totalPages,
    totalResults: filtered.length,
    blogs: paginated,
    setPage,
    submitSearch,
  }
}
