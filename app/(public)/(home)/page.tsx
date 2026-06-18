import { Suspense } from 'react'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { HeroSection } from '@/components/shared/hero-section'
import { BrandBar } from '@/components/shared/brand-bar'
import { BlogListClient } from '@/components/blog/blog-list-client'
import siteContent from '@/lib/wording/site-content.json'

export const metadata = {
  title: 'บทความทั้งหมด | SystemBlog',
  description: siteContent.hero.description,
}

const PER_PAGE = 10

export default async function BlogListPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; page?: string }>
}) {
  const { q, page: pageStr } = await searchParams
  const currentQuery = q?.trim() ?? ''
  const currentPage = Math.max(1, Number(pageStr ?? '1'))

  let query = supabaseAdmin
    .from('blogs')
    .select('id, title, slug, excerpt, cover_image_url, published_at', { count: 'exact' })
    .eq('is_published', true)
    .order('published_at', { ascending: false })
    .range((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE - 1)

  if (currentQuery) query = query.ilike('title', `%${currentQuery}%`)

  const { data: blogs, count } = await query
  const totalPages = Math.ceil((count ?? 0) / PER_PAGE)

  return (
    <>
      <HeroSection
        breadcrumb={siteContent.hero.breadcrumb}
        title={siteContent.hero.title}
        description={siteContent.hero.description}
      />
      <div className="container mx-auto max-w-6xl px-4 py-12 space-y-8">
        <BrandBar />
        <Suspense fallback={<div className="text-center py-20 text-muted-foreground">กำลังโหลด...</div>}>
          <BlogListClient
            blogs={blogs ?? []}
            totalPages={totalPages}
            currentPage={currentPage}
            currentQuery={currentQuery}
          />
        </Suspense>
      </div>
    </>
  )
}
