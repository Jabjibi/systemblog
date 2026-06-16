type SectionHeaderProps = {
  label: string
  title: string
  description?: string
}

export function SectionHeader({ label, title, description }: SectionHeaderProps) {
  return (
    <div className="text-center space-y-3">
      <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full">
        {label}
      </div>
      <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      {description && (
        <p className="text-muted-foreground max-w-xl mx-auto">{description}</p>
      )}
    </div>
  )
}
