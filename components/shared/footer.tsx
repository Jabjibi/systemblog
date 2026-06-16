import Link from 'next/link'
import { BookOpen, Globe, Mail, MessageCircle } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { SubscribeForm } from './subscribe-form'

const QUICK_LINKS = [
  { label: 'เงื่อนไขการใช้งาน', href: '#' },
  { label: 'นโยบายความเป็นส่วนตัว', href: '#' },
  { label: 'ติดต่อสนับสนุน', href: '#' },
  { label: 'ศูนย์ช่วยเหลือ', href: '#' },
]

const SERVICES = [
  { label: 'ที่ปรึกษา', href: '#' },
  { label: 'การเงิน', href: '#' },
  { label: 'วิเคราะห์ข้อมูล', href: '#' },
  { label: 'ประกันภัย', href: '#' },
]

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
              <span>SystemBlog</span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              แหล่งรวมบทความและความรู้ด้านการเงิน ธุรกิจ และการลงทุน อัปเดตสม่ำเสมอ
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
              {QUICK_LINKS.map(({ label, href }) => (
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

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold">บริการ</h4>
            <ul className="space-y-2.5">
              {SERVICES.map(({ label, href }) => (
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
            <h4 className="font-semibold">เข้าร่วมกับเรา!</h4>
            <p className="text-sm text-white/60 leading-relaxed">
              รับข่าวสารและบทความใหม่ล่าสุดก่อนใคร สมัครได้เลยฟรี
            </p>
            <SubscribeForm />
          </div>

        </div>

        <Separator className="my-6 bg-white/10" />

        <p className="text-center text-xs text-white/40">
          &copy; {new Date().getFullYear()} SystemBlog | Powered by SystemBlog
        </p>

      </div>
    </footer>
  )
}
