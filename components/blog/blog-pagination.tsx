'use client'

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

type BlogPaginationProps = {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function BlogPagination({ page, totalPages, onPageChange }: BlogPaginationProps) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const visiblePages = pages.filter((p) => {
    if (totalPages <= 5) return true
    return p === 1 || p === totalPages || Math.abs(p - page) <= 1
  })

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => { e.preventDefault(); if (page > 1) onPageChange(page - 1) }}
            aria-disabled={page === 1}
            className={page === 1 ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>

        {visiblePages.map((p, idx) => {
          const prev = visiblePages[idx - 1]
          const showEllipsisBefore = prev && p - prev > 1

          return (
            <span key={p} className="contents">
              {showEllipsisBefore && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink
                  href="#"
                  isActive={p === page}
                  onClick={(e) => { e.preventDefault(); onPageChange(p) }}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            </span>
          )
        })}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => { e.preventDefault(); if (page < totalPages) onPageChange(page + 1) }}
            aria-disabled={page === totalPages}
            className={page === totalPages ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
