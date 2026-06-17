import Link from 'next/link'
import { ArrowLeft, CalendarDays, Eye } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

type Props = {
  title: string
  publishedAt: string | null
  viewCount: number
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export function BlogDetailHeader({ title, publishedAt, viewCount }: Props) {
  return (
    <>
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        กลับไปหน้าบทความ
      </Link>

      <div className="space-y-4">
        <Badge variant="secondary">บทความ</Badge>
        <h1 className="text-3xl font-bold leading-tight">{title}</h1>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {publishedAt && (
            <span className="flex items-center gap-1.5">
              <CalendarDays className="w-4 h-4" />
              <time dateTime={publishedAt}>{formatDate(publishedAt)}</time>
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Eye className="w-4 h-4" />
            {viewCount.toLocaleString('th-TH')} ครั้ง
          </span>
        </div>
      </div>
    </>
  )
}
