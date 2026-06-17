import { MOCK_BLOGS } from '@/lib/mock/blogs'

export function RecentBlogsTable() {
  const recent = MOCK_BLOGS.slice(0, 5)

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100">
        <h2 className="font-semibold text-foreground">บทความล่าสุด</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 text-left text-muted-foreground">
              <th className="px-6 py-3 font-medium">ชื่อบทความ</th>
              <th className="px-6 py-3 font-medium">สถานะ</th>
              <th className="px-6 py-3 font-medium">วิว</th>
              <th className="px-6 py-3 font-medium">วันที่</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((blog) => (
              <tr key={blog.id} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">
                <td className="px-6 py-4 font-medium text-foreground max-w-xs">
                  <span className="line-clamp-1">{blog.title}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    blog.is_published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {blog.is_published ? 'เผยแพร่' : 'Draft'}
                  </span>
                </td>
                <td className="px-6 py-4 text-muted-foreground">{blog.view_count.toLocaleString()}</td>
                <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                  {new Date(blog.published_at).toLocaleDateString('th-TH', {
                    day: 'numeric',
                    month: 'short',
                    year: '2-digit',
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
