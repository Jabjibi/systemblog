'use client'

import { useBlogForm } from '@/lib/hooks/use-blog-form'
import { ImageUpload } from '@/components/admin/blogs/image-upload'
import { ContentEditor } from '@/components/admin/blogs/content-editor'
import { AdditionalImages } from '@/components/admin/blogs/additional-images'

export function BlogForm() {
  const { form, setField, status, submit, isEdit } = useBlogForm()

  if (status === 'loading') {
    return <p className="text-sm text-muted-foreground">กำลังโหลดข้อมูล...</p>
  }

  const contentImageCount = (form.content.match(/^!\[.*?\]\(.*?\)$/gm) ?? []).length
  const maxAdditional = Math.max(0, 7 - (form.cover_image_url ? 1 : 0) - contentImageCount)

  return (
    <form onSubmit={submit} className="flex gap-6 flex-1 min-h-0">

      {/* Left: writing area */}
      <div className="flex-1 min-w-0 bg-white rounded-2xl border border-gray-100 p-8 flex flex-col gap-6 overflow-y-auto">
        <textarea
          value={form.title}
          onChange={(e) => setField('title', e.target.value)}
          placeholder="ชื่อบทความ"
          required
          rows={2}
          className="w-full text-3xl font-bold outline-none resize-none bg-transparent placeholder:text-gray-200 leading-tight"
        />
        <hr className="border-gray-100" />
        <ContentEditor
          value={form.content}
          onChange={(v) => setField('content', v)}
        />
      </div>

      {/* Right: metadata panel */}
      <div className="w-72 shrink-0 sticky top-0 self-start flex flex-col gap-4">
        <div className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-col gap-5">

          <ImageUpload
            value={form.cover_image_url}
            onChange={(url) => setField('cover_image_url', url)}
          />

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Slug</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => setField('slug', e.target.value.toLowerCase())}
              placeholder="my-blog-post"
              required
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm font-mono outline-none focus:border-purple-400 transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Excerpt</label>
            <textarea
              value={form.excerpt}
              onChange={(e) => setField('excerpt', e.target.value)}
              placeholder="สรุปเนื้อหาสั้นๆ"
              rows={3}
              className="px-3 py-2 rounded-lg border border-gray-200 text-sm outline-none focus:border-purple-400 transition-colors resize-none"
            />
          </div>

          <AdditionalImages
            images={form.additional_images}
            max={maxAdditional}
            onChange={(urls) => setField('additional_images', urls)}
          />

          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">
              {form.is_published ? 'เผยแพร่' : 'Draft'}
            </span>
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
          </div>
        </div>

        {status === 'error' && (
          <p className="text-sm text-red-500 px-1">เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง</p>
        )}

        <div className="flex flex-col gap-2">
          <button
            type="submit"
            disabled={status === 'saving'}
            className="w-full py-2.5 rounded-xl bg-card-arrow-bg text-white text-sm font-semibold hover:opacity-90 transition-opacity disabled:opacity-60"
          >
            {status === 'saving' ? 'กำลังบันทึก...' : isEdit ? 'บันทึกการแก้ไข' : 'สร้างบทความ'}
          </button>
          <a
            href="/admin/blogs"
            className="w-full py-2.5 rounded-xl bg-gray-100 text-gray-700 text-sm font-semibold hover:bg-gray-200 transition-colors text-center"
          >
            ยกเลิก
          </a>
        </div>
      </div>
    </form>
  )
}
