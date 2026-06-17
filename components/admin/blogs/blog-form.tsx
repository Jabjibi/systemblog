'use client'

import { useBlogForm } from '@/lib/hooks/use-blog-form'
import { ImageUpload } from '@/components/admin/blogs/image-upload'

export function BlogForm() {
  const { form, setField, status, submit, isEdit } = useBlogForm()

  if (status === 'loading') return <p className="text-sm text-muted-foreground">กำลังโหลดข้อมูล...</p>

  return (
    <form onSubmit={submit} className="flex flex-col gap-5 max-w-3xl">
      <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">ชื่อบทความ</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setField('title', e.target.value)}
            placeholder="ชื่อบทความ"
            required
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-purple-400 transition-colors"
          />
        </div>

        <ImageUpload
          value={form.cover_image_url}
          onChange={(url) => setField('cover_image_url', url)}
        />

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">เนื้อหาย่อ (Excerpt)</label>
          <textarea
            value={form.excerpt}
            onChange={(e) => setField('excerpt', e.target.value)}
            placeholder="สรุปเนื้อหาสั้นๆ"
            rows={3}
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-purple-400 transition-colors resize-none"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-foreground">เนื้อหา (Content)</label>
          <textarea
            value={form.content}
            onChange={(e) => setField('content', e.target.value)}
            placeholder="เนื้อหาบทความ (รองรับ Markdown)"
            rows={14}
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-purple-400 transition-colors resize-none font-mono"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setField('is_published', !form.is_published)}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              form.is_published ? 'bg-card-arrow-bg' : 'bg-gray-200'
            }`}
          >
            <span className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
              form.is_published ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
          <span className="text-sm font-medium text-foreground">
            {form.is_published ? 'เผยแพร่' : 'Draft'}
          </span>
        </div>
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-500">เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง</p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={status === 'saving'}
          className="px-6 py-2.5 rounded-xl bg-card-arrow-bg text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
        >
          {status === 'saving' ? 'กำลังบันทึก...' : isEdit ? 'บันทึกการแก้ไข' : 'สร้างบทความ'}
        </button>
        <a
          href="/admin/blogs"
          className="px-6 py-2.5 rounded-xl bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200 transition-colors"
        >
          ยกเลิก
        </a>
      </div>
    </form>
  )
}
