import Link from 'next/link'
import { BookOpen } from 'lucide-react'
import { LoginForm } from '@/components/admin/login-form'
import { DesertDunes } from '@/components/admin/desert-dunes'

export default function AdminLoginPage() {
  return (
    <div
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #0D0B1A 0%, #1E1040 40%, #2C1B5E 100%)' }}
    >
      <DesertDunes />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-8 py-6">
        <div className="flex items-center gap-2 font-bold text-white text-lg">
          <BookOpen className="w-5 h-5" />
          <span>SystemBlog</span>
        </div>
        <Link
          href="/"
          className="text-sm text-white/50 hover:text-white/80 transition-colors"
        >
          ← กลับหน้าเว็บ
        </Link>
      </div>

      {/* Centered card */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4 pb-20">
        <LoginForm />
      </div>
    </div>
  )
}
