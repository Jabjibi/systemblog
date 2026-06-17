'use client'

import { useState } from 'react'

export function useAdminSearch() {
  const [query, setQuery] = useState('')
  return { query, setQuery }
}
