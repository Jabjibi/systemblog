import Link from 'next/link'
import { BookOpen, Globe, Mail, MessageCircle } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { SubscribeForm } from './subscribe-form'
import siteContent from '@/lib/wording/site-content.json'

const { brand, quickLinks, topics, subscribe, copyright } = siteContent.footer

const SOCIALS = [
  { Icon: Globe, href: '#', label: 'Website' },
  { Icon: Mail, href: '#', label: 'Email' },
  { Icon: MessageCircle, href: '#', label: 'Chat' },
]

export function Footer() {
  return (
    <footer className="px-4 pb-4 mt-auto">
      <div className="bg-brand-bar-bg text-brand-bar-text rounded-2xl px-8 py-10">

        {/* 4-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-bold text-lg">
              <BookOpen className="w-5 h-5" />
              <span>{brand.name}</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              {brand.description}
            </p>
            <div className="flex gap-2">
              {SOCIALS.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Topics */}
          <div className="space-y-4">
            <h4 className="font-semibold">หัวข้อ</h4>
            <ul className="space-y-2.5">
              {topics.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Subscribe */}
          <div className="space-y-4">
            <h4 className="font-semibold">{subscribe.heading}</h4>
            <p className="text-sm text-white/60 leading-relaxed">
              {subscribe.description}
            </p>
            <SubscribeForm />
          </div>

        </div>

        <Separator className="my-6 bg-white/10" />

        <p className="text-center text-xs text-white/40">
          &copy; {new Date().getFullYear()} {copyright}
        </p>

      </div>
    </footer>
  )
}
