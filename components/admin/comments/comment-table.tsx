'use client'

import { useCommentList } from '@/lib/hooks/use-comment-list'

const STATUS_STYLES = {
  pending: 'bg-yellow-100 text-yellow-700',
  approved: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-600',
}

const STATUS_LABELS = {
  pending: 'รอ Approve',
  approved: 'อนุมัติแล้ว',
  rejected: 'ปฏิเสธ',
}

export function CommentTable() {
  const { comments, status, updateStatus } = useCommentList()

  if (status === 'loading') return <p className="text-sm text-muted-foreground">กำลังโหลด...</p>
  if (status === 'error') return <p className="text-sm text-red-500">โหลดข้อมูลไม่สำเร็จ</p>

  if (comments.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 py-16 flex items-center justify-center">
        <p className="text-sm text-muted-foreground">ยังไม่มีคอมเมนต์</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left text-muted-foreground">
              <th className="px-6 py-3 font-medium">ผู้ส่ง</th>
              <th className="px-6 py-3 font-medium">ข้อความ</th>
              <th className="px-6 py-3 font-medium">บทความ</th>
              <th className="px-6 py-3 font-medium">วันที่</th>
              <th className="px-6 py-3 font-medium">สถานะ</th>
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment) => (
              <tr key={comment.id} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
                <td className="px-6 py-4 font-medium text-foreground whitespace-nowrap">
                  {comment.sender_name}
                </td>
                <td className="px-6 py-4 text-muted-foreground max-w-xs">
                  <span className="line-clamp-2">{comment.message}</span>
                </td>
                <td className="px-6 py-4 text-muted-foreground max-w-[160px]">
                  <span className="line-clamp-1 text-xs">{comment.blogs?.title ?? '—'}</span>
                </td>
                <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                  {new Date(comment.created_at).toLocaleDateString('th-TH', {
                    day: 'numeric',
                    month: 'short',
                    year: '2-digit',
                  })}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[comment.status]}`}>
                    {STATUS_LABELS[comment.status]}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    {comment.status !== 'approved' && (
                      <button
                        onClick={() => updateStatus(comment.id, 'approved')}
                        className="text-xs font-medium px-3 py-1 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors"
                      >
                        Approve
                      </button>
                    )}
                    {comment.status !== 'rejected' && (
                      <button
                        onClick={() => updateStatus(comment.id, 'rejected')}
                        className="text-xs font-medium px-3 py-1 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                      >
                        Reject
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
