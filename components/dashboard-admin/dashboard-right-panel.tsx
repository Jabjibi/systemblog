import { MOCK_BLOGS, MOCK_COMMENTS } from '@/lib/mock/blogs'

function ViewChart() {
  const data = MOCK_BLOGS.slice(0, 5).map((b) => ({
    label: b.title.slice(0, 6),
    value: b.view_count,
  }))
  const max = Math.max(...data.map((d) => d.value))

  return (
    <div className="flex items-end gap-2 h-20">
      {data.map((d, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full rounded-t-md"
            style={{
              height: `${Math.round((d.value / max) * 72)}px`,
              background: i % 2 === 0 ? '#6B5CE7' : '#C4BDF5',
            }}
          />
        </div>
      ))}
    </div>
  )
}

export function DashboardRightPanel() {
  const totalViews = MOCK_BLOGS.reduce((sum, b) => sum + b.view_count, 0)
  const pendingComments = MOCK_COMMENTS.filter((c) => c.status === 'pending')

  return (
    <aside className="w-68 shrink-0 flex flex-col gap-4" style={{ width: '268px' }}>
      {/* View stats */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">ยอดวิวรวม</p>
        <p className="text-3xl font-bold text-foreground mb-5">{totalViews.toLocaleString()}</p>
        <ViewChart />
        <div className="flex gap-2 mt-2">
          {MOCK_BLOGS.slice(0, 5).map((b, i) => (
            <p key={i} className="text-xs text-muted-foreground flex-1 text-center">
              {(b.view_count / 1000).toFixed(1)}k
            </p>
          ))}
        </div>
      </div>

      {/* Pending comments */}
      <div className="bg-white rounded-2xl p-5 border border-gray-100">
        <p className="font-semibold text-foreground text-sm mb-3">
          รอ Approve
          <span className="ml-2 inline-flex items-center justify-center w-5 h-5 rounded-full bg-purple-100 text-purple-700 text-xs font-bold">
            {pendingComments.length}
          </span>
        </p>

        {pendingComments.length === 0 ? (
          <p className="text-xs text-muted-foreground">ไม่มีคอมเมนต์ที่รอ Approve</p>
        ) : (
          <div className="flex flex-col gap-3">
            {pendingComments.map((c) => (
              <div key={c.id} className="flex flex-col gap-0.5">
                <p className="text-sm font-medium text-foreground">{c.sender_name}</p>
                <p className="text-xs text-muted-foreground line-clamp-1">{c.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  )
}
