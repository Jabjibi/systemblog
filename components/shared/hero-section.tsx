import { ChevronRight } from 'lucide-react'

type HeroSectionProps = {
  breadcrumb?: { label: string; current: string }
  title: string
  description?: string
}

function WaveDecoration() {
  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1440 320"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* เส้นโค้งล่าง — S-curve ยาวคลื่นใหญ่ */}
      <path
        d="M -100 260
           C 150 180, 100 80, 350 140
           C 600 200, 550 60, 780 100
           C 1000 140, 950 280, 1200 220
           C 1380 175, 1440 200, 1540 190
           L 1540 400 L -100 400 Z"
        fill="var(--color-hero-wave)"
        opacity="0.55"
      />
      {/* เส้นโค้งบน — offset คลื่น ทำให้มีความลึก */}
      <path
        d="M -100 310
           C 200 240, 150 120, 400 180
           C 650 240, 600 100, 840 140
           C 1060 180, 1010 300, 1260 250
           C 1400 220, 1440 240, 1540 230
           L 1540 400 L -100 400 Z"
        fill="var(--color-hero-wave)"
        opacity="0.35"
      />
    </svg>
  )
}

export function HeroSection({ breadcrumb, title, description }: HeroSectionProps) {
  return (
    <section className="relative w-full bg-hero-bg overflow-hidden py-20 px-4">
      <WaveDecoration />

      <div className="relative z-10 container mx-auto max-w-6xl flex flex-col items-center text-center gap-5">
        {/* Breadcrumb Pill */}
        {breadcrumb && (
          <div className="inline-flex items-center gap-2 bg-hero-pill-bg text-hero-pill-text text-sm font-medium px-5 py-2 rounded-full">
            <span>{breadcrumb.label}</span>
            <ChevronRight className="w-4 h-4" />
            <span>{breadcrumb.current}</span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground max-w-3xl leading-tight">
          {title}
        </h1>

        {/* Description */}
        {description && (
          <p className="text-muted-foreground max-w-xl leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </section>
  )
}
