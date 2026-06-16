'use client'

import { useLoginForm } from '@/lib/hooks/use-login-form'

export function LoginForm() {
  const { email, setEmail, password, setPassword, status, errorMessage, submit } = useLoginForm()

  return (
    <form
      onSubmit={submit}
      style={{
        background: 'rgba(255, 255, 255, 0.06)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 8px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.1)',
      }}
      className="w-full max-w-sm rounded-2xl px-8 py-10 flex flex-col gap-6"
    >
      <div className="flex flex-col gap-1 text-center">
        <h1 className="text-2xl font-bold text-white tracking-tight">Admin Login</h1>
        <p className="text-sm text-white/50">เข้าสู่ระบบจัดการ</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-white/60 uppercase tracking-wider">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
            required
            className="rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-all"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
            onFocus={(e) => {
              e.currentTarget.style.border = '1px solid rgba(255,255,255,0.3)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
            }}
            onBlur={(e) => {
              e.currentTarget.style.border = '1px solid rgba(255,255,255,0.1)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
            }}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-medium text-white/60 uppercase tracking-wider">
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-all"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
            onFocus={(e) => {
              e.currentTarget.style.border = '1px solid rgba(255,255,255,0.3)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)'
            }}
            onBlur={(e) => {
              e.currentTarget.style.border = '1px solid rgba(255,255,255,0.1)'
              e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
            }}
          />
        </div>
      </div>

      {errorMessage && (
        <p className="text-xs text-red-400 text-center">{errorMessage}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full rounded-xl py-3 text-sm font-semibold text-white transition-all disabled:opacity-60"
        style={{
          background: 'linear-gradient(135deg, #6B5CE7 0%, #4C3FC7 100%)',
          boxShadow: '0 4px 20px rgba(107,92,231,0.4)',
        }}
      >
        {status === 'loading' ? 'กำลังเข้าสู่ระบบ...' : 'เข้าสู่ระบบ'}
      </button>
    </form>
  )
}
