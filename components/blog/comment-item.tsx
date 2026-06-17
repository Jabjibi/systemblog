import { Avatar, AvatarFallback } from '@/components/ui/avatar'

type CommentItemProps = { sender_name: string; message: string; created_at: string }

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function CommentItem({ sender_name, message, created_at }: CommentItemProps) {
  const initials = sender_name.slice(0, 2)

  return (
    <div className="flex gap-3">
      <Avatar className="w-9 h-9 shrink-0">
        <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <div className="flex items-baseline gap-2">
          <span className="font-semibold text-sm">{sender_name}</span>
          <time className="text-xs text-muted-foreground">{formatDate(created_at)}</time>
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed">{message}</p>
      </div>
    </div>
  )
}
