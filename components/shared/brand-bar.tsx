import { TrendingUp, BarChart3, ShieldCheck, Building2, Globe } from 'lucide-react'

const BRANDS = [
  { icon: TrendingUp, label: 'การเงิน' },
  { icon: BarChart3, label: 'การลงทุน' },
  { icon: ShieldCheck, label: 'ประกันภัย' },
  { icon: Building2, label: 'ธุรกิจ' },
  { icon: Globe, label: 'เศรษฐกิจ' },
]

export function BrandBar() {
  return (
    <div className="w-full bg-brand-bar-bg rounded-2xl px-6 py-4">
      <div className="flex items-center justify-around gap-4 flex-wrap">
        {BRANDS.map(({ icon: Icon, label }) => (
          <div
            key={label}
            className="flex items-center gap-2.5 text-brand-bar-text"
          >
            <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center shrink-0">
              <Icon className="w-4 h-4" />
            </div>
            <span className="text-sm font-semibold whitespace-nowrap">{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
