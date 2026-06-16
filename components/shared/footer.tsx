import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { Separator } from '@/components/ui/separator'

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-auto">
      <div className="container mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-bold text-lg">
              <BookOpen className="w-5 h-5" />
              <span>SystemBlog</span>
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed">
              แหล่งรวมบทความและความรู้ด้านการเงิน ธุรกิจ และการลงทุน
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link href="/" className="hover:text-primary-foreground transition-colors">หน้าหลัก</Link></li>
              <li><Link href="/" className="hover:text-primary-foreground transition-colors">บทความทั้งหมด</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-3">
            <h4 className="font-semibold">ติดต่อเรา</h4>
            <p className="text-sm text-primary-foreground/70">
              มีคำถามหรือข้อเสนอแนะ? ติดต่อเราได้เลย
            </p>
          </div>
        </div>

        <Separator className="my-6 bg-primary-foreground/20" />

        <p className="text-center text-xs text-primary-foreground/50">
          &copy; {new Date().getFullYear()} SystemBlog. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
