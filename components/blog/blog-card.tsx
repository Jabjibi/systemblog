import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { BLOG_CATEGORY_MAP, DEFAULT_CATEGORY } from '@/lib/config/blog-categories'

type BlogCardProps = {
  slug: string
  title: string
  excerpt: string
  cover_image_url: string
  excerptVariant?: 'light' | 'dark'
}

export function BlogCard({ slug, title, excerpt, cover_image_url, excerptVariant = 'dark' }: BlogCardProps) {
  const category = BLOG_CATEGORY_MAP[slug] ?? DEFAULT_CATEGORY
  const Icon = category.icon

  return (
    <div className="group rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col bg-hero-bg">

      <div className="relative w-full h-44 overflow-hidden">
        {cover_image_url ? (
          <Image
            src={cover_image_url}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <Icon className="w-10 h-10 text-gray-300" />
          </div>
        )}
      </div>

      <div className="px-3 py-3 flex items-center gap-3">
        <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-gray-700" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-sm text-gray-900 truncate">{title}</p>
          <p className="text-xs text-gray-400 mt-0.5">{category.sublabel}</p>
        </div>
        <Link
          href={`/blog/${slug}`}
          className="w-8 h-8 rounded-full bg-card-arrow-bg flex items-center justify-center shrink-0 hover:opacity-80 transition-opacity"
          aria-label={`อ่าน ${title}`}
        >
          <ArrowRight className="w-4 h-4 text-white" />
        </Link>
      </div>

      <div
        className={[
          'mx-3 mb-3 rounded-xl px-3 py-3 flex-1',
          excerptVariant === 'dark' ? 'bg-card-dark-bg' : 'bg-white border border-gray-100',
        ].join(' ')}
      >
        <p
          className={[
            'text-xs leading-relaxed line-clamp-3',
            excerptVariant === 'dark' ? 'text-white/90' : 'text-gray-700',
          ].join(' ')}
        >
          {excerpt}
        </p>
      </div>
    </div>
  )
}
