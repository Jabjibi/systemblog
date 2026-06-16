import { MessageSquare } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { type Comment } from '@/lib/mock/blogs'
import { CommentItem } from './comment-item'

type CommentListProps = {
  comments: Comment[]
}

export function CommentList({ comments }: CommentListProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <MessageSquare className="w-5 h-5" />
        <h3 className="font-semibold text-lg">
          ความคิดเห็น
          {comments.length > 0 && (
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              ({comments.length} ความคิดเห็น)
            </span>
          )}
        </h3>
      </div>

      {comments.length === 0 ? (
        <p className="text-muted-foreground text-sm py-6 text-center">
          ยังไม่มีความคิดเห็น เป็นคนแรกที่แสดงความคิดเห็น!
        </p>
      ) : (
        <div className="space-y-4">
          {comments.map((comment, idx) => (
            <div key={comment.id}>
              <CommentItem
                sender_name={comment.sender_name}
                message={comment.message}
                created_at={comment.created_at}
              />
              {idx < comments.length - 1 && <Separator className="mt-4" />}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
