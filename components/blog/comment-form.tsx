'use client'

import { Send, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCommentForm } from '@/lib/hooks/use-comment-form'

type CommentFormProps = {
  blogId: string
}

export function CommentForm({ blogId }: CommentFormProps) {
  const { form, errors, isSubmitting, isSuccess, setField, submit, reset } =
    useCommentForm(blogId)

  if (isSuccess) {
    return (
      <div className="rounded-lg border bg-muted/50 p-6 flex flex-col items-center gap-3 text-center">
        <CheckCircle className="w-10 h-10 text-green-500" />
        <div>
          <p className="font-semibold">ส่งความคิดเห็นแล้ว!</p>
          <p className="text-sm text-muted-foreground mt-1">
            ความคิดเห็นของคุณจะแสดงเมื่อผ่านการตรวจสอบจากผู้ดูแล
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={reset}>
          แสดงความคิดเห็นอีกครั้ง
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-lg">แสดงความคิดเห็น</h3>
      <p className="text-sm text-muted-foreground">
        ข้อความต้องเป็น<span className="font-medium text-foreground">ภาษาไทยและ/หรือตัวเลข</span>เท่านั้น
      </p>

      <div className="space-y-3">
        {/* Name */}
        <div className="space-y-1.5">
          <label htmlFor="sender_name" className="text-sm font-medium">
            ชื่อผู้ส่ง <span className="text-destructive">*</span>
          </label>
          <Input
            id="sender_name"
            value={form.sender_name}
            onChange={(e) => setField('sender_name', e.target.value)}
            placeholder="กรอกชื่อของคุณ"
            className={errors.sender_name ? 'border-destructive' : ''}
          />
          {errors.sender_name && (
            <p className="text-xs text-destructive">{errors.sender_name}</p>
          )}
        </div>

        {/* Message */}
        <div className="space-y-1.5">
          <label htmlFor="message" className="text-sm font-medium">
            ข้อความ <span className="text-destructive">*</span>
          </label>
          <textarea
            id="message"
            value={form.message}
            onChange={(e) => setField('message', e.target.value)}
            placeholder="เขียนความคิดเห็นของคุณ (ภาษาไทยและ/หรือตัวเลขเท่านั้น)"
            rows={4}
            className={[
              'w-full rounded-md border bg-background px-3 py-2 text-sm',
              'placeholder:text-muted-foreground resize-none',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              errors.message ? 'border-destructive' : 'border-input',
            ].join(' ')}
          />
          {errors.message && (
            <p className="text-xs text-destructive">{errors.message}</p>
          )}
        </div>

        {errors.submit && (
          <p className="text-xs text-destructive">{errors.submit}</p>
        )}

        <Button onClick={submit} disabled={isSubmitting} className="gap-2">
          <Send className="w-4 h-4" />
          {isSubmitting ? 'กำลังส่ง...' : 'ส่งความคิดเห็น'}
        </Button>
      </div>
    </div>
  )
}
