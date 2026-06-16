'use client'

import { type Blog } from '@/lib/mock/blogs'
import { useBlogSearch } from '@/lib/hooks/use-blog-search'
import { BlogSearch } from './blog-search'
import { BlogGrid } from './blog-grid'
import { BlogPagination } from './blog-pagination'

type BlogListClientProps = {
  allBlogs: Blog[]
}

export function BlogListClient({ allBlogs }: BlogListClientProps) {
  const {
    inputValue,
    setInputValue,
    query,
    page,
    totalPages,
    totalResults,
    blogs,
    setPage,
    submitSearch,
  } = useBlogSearch(allBlogs)

  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <BlogSearch
          value={inputValue}
          onChange={setInputValue}
          onSubmit={submitSearch}
        />
        {query && (
          <p className="text-sm text-muted-foreground">
            พบ <span className="font-medium text-foreground">{totalResults}</span> บทความ
            สำหรับ &ldquo;<span className="font-medium text-foreground">{query}</span>&rdquo;
          </p>
        )}
      </div>

      {/* Grid */}
      <BlogGrid blogs={blogs} query={query} />

      {/* Pagination */}
      <div className="flex justify-center">
        <BlogPagination page={page} totalPages={totalPages} onPageChange={setPage} />
      </div>
    </div>
  )
}
