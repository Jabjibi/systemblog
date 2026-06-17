'use client'

import { useSlugEditor } from '@/lib/hooks/use-slug-editor'

type SlugEditorProps = {
  blogId: string
}

export function SlugEditor({ blogId }: SlugEditorProps) {
  const { slug, setSlug, isValid, save, status, error } = useSlugEditor(blogId)

  if (status === 'loading') return null

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 max-w-3xl">
      <h3 className="font-semibold text-foreground mb-1">แก้ไข URL Slug</h3>
      <p className="text-xs text-muted-foreground mb-4">
        ตัวพิมพ์เล็ก (a-z), ตัวเลข (0-9) และ hyphen เท่านั้น — ห้ามขึ้นต้นหรือลงท้ายด้วย hyphen
      </p>

      <div className="flex gap-3">
        <div className="flex-1 flex flex-col gap-1.5">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 focus-within:border-purple-400 transition-colors">
            <span className="text-xs text-muted-foreground shrink-0">/blog/</span>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="flex-1 text-sm outline-none font-mono"
              placeholder="my-blog-slug"
            />
          </div>
          {!isValid && slug.length > 0 && (
            <p className="text-xs text-red-500">Slug ต้องใช้ตัวพิมพ์เล็ก, ตัวเลข และ hyphen เท่านั้น</p>
          )}
          {error && <p className="text-xs text-red-500">{error}</p>}
          {status === 'success' && <p className="text-xs text-green-600">บันทึก Slug สำเร็จ</p>}
        </div>
        <button
          onClick={save}
          disabled={!isValid || status === 'saving'}
          className="px-5 py-2.5 rounded-xl bg-card-arrow-bg text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 shrink-0 self-start"
        >
          {status === 'saving' ? 'กำลังบันทึก...' : 'บันทึก Slug'}
        </button>
      </div>
    </div>
  )
}
