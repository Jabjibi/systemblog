import { MOCK_COMMENTS, MOCK_BLOGS } from '@/lib/mock/blogs'

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

export function RecentCommentsTable() {
  const comments = MOCK_COMMENTS.slice(0, 5)
  const blogMap = Object.fromEntries(MOCK_BLOGS.map((b) => [b.id, b.title]))

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-foreground">คอมเมนต์ล่าสุด</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left text-muted-foreground">
              <th className="px-6 py-3 font-medium">ผู้ส่ง</th>
              <th className="px-6 py-3 font-medium">ข้อความ</th>
              <th className="px-6 py-3 font-medium">บทความ</th>
              <th className="px-6 py-3 font-medium">สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment) => (
              <tr key={comment.id} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
                <td className="px-6 py-4 font-medium text-foreground whitespace-nowrap">{comment.sender_name}</td>
                <td className="px-6 py-4 text-muted-foreground max-w-xs">
                  <span className="line-clamp-1">{comment.message}</span>
                </td>
                <td className="px-6 py-4 text-muted-foreground max-w-[200px]">
                  <span className="line-clamp-1">{blogMap[comment.blog_id] ?? '-'}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${STATUS_STYLES[comment.status]}`}>
                    {STATUS_LABELS[comment.status]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
