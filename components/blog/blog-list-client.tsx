'use client'

import { useBlogSearch } from '@/lib/hooks/use-blog-search'
import { BlogSearch } from './blog-search'
import { BlogGrid } from './blog-grid'
import { BlogPagination } from './blog-pagination'

type PublicBlog = {
  id: string
  title: string
  slug: string
  excerpt: string
  cover_image_url: string | null
  published_at: string | null
}

type Props = {
  blogs: PublicBlog[]
  totalPages: number
  currentPage: number
  currentQuery: string
}

export function BlogListClient({ blogs, totalPages, currentPage, currentQuery }: Props) {
  const { inputValue, setInputValue, submitSearch, setPage } = useBlogSearch(currentQuery)

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <BlogSearch value={inputValue} onChange={setInputValue} onSubmit={submitSearch} />
        {currentQuery && (
          <p className="text-sm text-muted-foreground">
            ผลการค้นหา &ldquo;<span className="font-medium text-foreground">{currentQuery}</span>&rdquo;
          </p>
        )}
      </div>

      <BlogGrid blogs={blogs} query={currentQuery} />

      <div className="flex justify-center">
        <BlogPagination page={currentPage} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  )
}
