import { Suspense } from 'react'
import { MOCK_BLOGS } from '@/lib/mock/blogs'
import { SectionHeader } from '@/components/shared/section-header'
import { BlogListClient } from '@/components/blog/blog-list-client'

export const metadata = {
  title: 'บทความทั้งหมด | SystemBlog',
  description: 'รวมบทความและความรู้ด้านการเงิน ธุรกิจ และการลงทุน',
}

const publishedBlogs = MOCK_BLOGS.filter((b) => b.is_published)

export default function BlogListPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 space-y-10">
      {/* Hero */}
      <div className="text-center space-y-4 py-6">
        <SectionHeader
          label="บทความของเรา"
          title="บทความที่เราได้จัดทำไว้"
          description="รวบรวมบทความคุณภาพด้านการเงิน ธุรกิจ และการลงทุน อัปเดตสม่ำเสมอ"
        />
      </div>

      {/* Blog List */}
      <Suspense fallback={<div className="text-center py-20 text-muted-foreground">กำลังโหลด...</div>}>
        <BlogListClient allBlogs={publishedBlogs} />
      </Suspense>
    </div>
  )
}
