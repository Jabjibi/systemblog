import Link from 'next/link'

function Star({ cx, cy, r, opacity }: { cx: number; cy: number; r: number; opacity: number }) {
  const t = r * 0.96
  const w = r * 0.08
  return (
    <path
      d={`
        M ${cx} ${cy - t}
        C ${cx + w} ${cy - w}, ${cx + w} ${cy - w}, ${cx + t} ${cy}
        C ${cx + w} ${cy + w}, ${cx + w} ${cy + w}, ${cx} ${cy + t}
        C ${cx - w} ${cy + w}, ${cx - w} ${cy + w}, ${cx - t} ${cy}
        C ${cx - w} ${cy - w}, ${cx - w} ${cy - w}, ${cx} ${cy - t}
        Z
      `}
      fill="white"
      opacity={opacity}
    />
  )
}

function StarDecoration() {
  return (
    <svg viewBox="0 0 400 160" className="absolute inset-0 w-full h-full pointer-events-none" fill="none">
      <Star cx={320} cy={50}  r={52} opacity={0.22} />
      <Star cx={370} cy={120} r={28} opacity={0.15} />
      <Star cx={260} cy={130} r={18} opacity={0.18} />
      <Star cx={350} cy={20}  r={12} opacity={0.20} />
      <Star cx={230} cy={30}  r={8}  opacity={0.25} />
    </svg>
  )
}

export function DashboardBanner() {
  return (
    <div
      className="relative rounded-2xl px-8 py-8 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #6B5CE7 0%, #4C3FC7 60%, #3D2B6B 100%)' }}
    >
      <StarDecoration />

      <p className="text-white/60 text-xs font-medium uppercase tracking-widest mb-2">ADMIN PANEL</p>
      <h2 className="text-white text-2xl font-bold leading-snug max-w-xs mb-5">
        จัดการบทความและ<br />คอมเมนต์ได้จากที่นี่
      </h2>
      <Link
        href="/admin/blogs/new"
        className="inline-flex items-center gap-2 bg-black/30 hover:bg-black/40 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-colors"
      >
        + เพิ่มบทความใหม่
      </Link>
    </div>
  )
}
