import { FileSearch } from 'lucide-react'

type EmptyStateProps = {
  title: string
  description: string
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4 text-center">
      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
        <FileSearch className="w-8 h-8 text-muted-foreground" />
      </div>
      <div>
        <p className="font-semibold text-lg">{title}</p>
        <p className="text-muted-foreground text-sm mt-1">{description}</p>
      </div>
    </div>
  )
}
