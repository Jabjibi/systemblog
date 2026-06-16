import { Suspense } from 'react'
import { MOCK_BLOGS } from '@/lib/mock/blogs'
import { HeroSection } from '@/components/shared/hero-section'
import { BrandBar } from '@/components/shared/brand-bar'
import { BlogListClient } from '@/components/blog/blog-list-client'

export const metadata = {
  title: 'บทความทั้งหมด | SystemBlog',
  description: 'รวมบทความและความรู้ด้านการเงิน ธุรกิจ และการลงทุน',
}

const publishedBlogs = MOCK_BLOGS.filter((b) => b.is_published)

export default function BlogListPage() {
  return (
    <>
      {/* Hero */}
      <HeroSection
        breadcrumb={{ label: 'หน้าหลัก', current: 'บทความ' }}
        title="บทความที่เราได้จัดทำไว้"
        description="รวบรวมบทความคุณภาพด้านการเงิน ธุรกิจ และการลงทุน อัปเดตสม่ำเสมอเพื่อให้คุณไม่พลาดทุกความเคลื่อนไหว"
      />

      {/* Content */}
      <div className="container mx-auto max-w-6xl px-4 py-12 space-y-8">
        {/* Brand Bar */}
        <BrandBar />

        {/* Blog List */}
        <Suspense fallback={<div className="text-center py-20 text-muted-foreground">กำลังโหลด...</div>}>
          <BlogListClient allBlogs={publishedBlogs} />
        </Suspense>
      </div>
    </>
  )
}
