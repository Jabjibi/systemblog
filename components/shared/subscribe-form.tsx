'use client'

import { useSubscribeForm } from '@/lib/hooks/use-subscribe-form'

export function SubscribeForm() {
  const { email, setEmail, status, submit } = useSubscribeForm()

  if (status === 'success') {
    return (
      <p className="text-sm text-white/80">ขอบคุณ! คุณได้สมัครรับข่าวสารแล้ว 🎉</p>
    )
  }

  return (
    <div className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="flex-1 min-w-0 rounded-lg bg-white/10 border border-white/10 px-3 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:ring-1 focus:ring-white/30"
      />
      <button
        onClick={submit}
        disabled={status === 'loading'}
        className="shrink-0 rounded-lg bg-white text-gray-900 text-sm font-semibold px-4 py-2 hover:bg-white/90 transition-colors disabled:opacity-60"
      >
        {status === 'loading' ? '...' : 'Subscribe'}
      </button>
    </div>
  )
}
