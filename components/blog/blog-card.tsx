import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CalendarDays } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { type Blog } from '@/lib/mock/blogs'

type BlogCardProps = Pick<Blog, 'slug' | 'title' | 'excerpt' | 'cover_image_url' | 'published_at'>

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function BlogCard({ slug, title, excerpt, cover_image_url, published_at }: BlogCardProps) {
  return (
    <Card className="group overflow-hidden border hover:shadow-lg transition-shadow duration-300 flex flex-col h-full p-0">
      {/* Cover Image */}
      <div className="relative w-full aspect-[16/9] overflow-hidden">
        <Image
          src={cover_image_url}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Info Bar */}
      <div className="bg-primary px-4 py-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <Badge variant="secondary" className="shrink-0 text-xs">บทความ</Badge>
          <span className="text-primary-foreground text-sm font-semibold truncate">{title}</span>
        </div>
        <Link
          href={`/blog/${slug}`}
          className="shrink-0 w-7 h-7 rounded-full bg-primary-foreground/20 hover:bg-primary-foreground/40 flex items-center justify-center transition-colors"
          aria-label={`อ่าน ${title}`}
        >
          <ArrowRight className="w-3.5 h-3.5 text-primary-foreground" />
        </Link>
      </div>

      {/* Body */}
      <CardContent className="p-4 flex flex-col gap-3 flex-1">
        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">{excerpt}</p>
        <div className="mt-auto flex items-center gap-1.5 text-xs text-muted-foreground">
          <CalendarDays className="w-3.5 h-3.5" />
          <time dateTime={published_at}>{formatDate(published_at)}</time>
        </div>
      </CardContent>
    </Card>
  )
}
