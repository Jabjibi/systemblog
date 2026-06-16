import Link from 'next/link'
import { BookOpen } from 'lucide-react'

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <BookOpen className="w-5 h-5 text-primary" />
          <span>SystemBlog</span>
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/" className="text-foreground/70 hover:text-foreground transition-colors">
            หน้าหลัก
          </Link>
          <Link href="/" className="text-foreground/70 hover:text-foreground transition-colors">
            บทความ
          </Link>
        </nav>
      </div>
    </header>
  )
}
