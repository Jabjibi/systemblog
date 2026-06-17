'use client'

import { usePathname } from 'next/navigation'

export function useAdminNav() {
  const pathname = usePathname()

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(href + '/')
  }

  return { isActive }
}
