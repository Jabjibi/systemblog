'use client'

import { Bold, ImageIcon, List, Plus, X } from 'lucide-react'
import { useContentEditor } from '@/lib/hooks/use-content-editor'

type Props = {
  value: string
  onChange: (v: string) => void
  maxImagesReached?: boolean
}

function autoResize(el: HTMLTextAreaElement) {
  let scrollEl: HTMLElement | null = el.parentElement
  while (scrollEl && getComputedStyle(scrollEl).overflowY !== 'auto' && getComputedStyle(scrollEl).overflowY !== 'scroll') {
    scrollEl = scrollEl.parentElement
  }
  const savedTop = scrollEl?.scrollTop ?? 0
  el.style.height = 'auto'
  el.style.height = `${el.scrollHeight}px`
  if (scrollEl) scrollEl.scrollTop = savedTop
}

export function ContentEditor({ value, onChange, maxImagesReached = false }: Props) {
  const {
    segments, setFocusedIdx, cursorState, updateCursor, clearCursor,
    textareaRefs, updateTextSegment, deleteImageSegment,
    applyFormat, uploadStatus, fileRef, onInputChange, openImagePicker,
  } = useContentEditor(value, onChange)

  return (
    <div className="flex flex-col gap-2">
      {/* Toolbar */}
      <div className="flex items-center gap-1 pb-3 border-b border-gray-100">
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); applyFormat('bold') }}
          className="w-7 h-7 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
          title="ตัวหนา (Cmd+B)"
        >
          <Bold className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); applyFormat('bullet') }}
          className="w-7 h-7 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors"
          title="Bullet list"
        >
          <List className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onMouseDown={(e) => { e.preventDefault(); openImagePicker() }}
          disabled={uploadStatus === 'uploading' || maxImagesReached}
          className="w-7 h-7 rounded flex items-center justify-center text-gray-500 hover:bg-gray-100 hover:text-gray-800 transition-colors disabled:opacity-50"
          title={maxImagesReached ? 'ถึงขีดจำกัดรูปภาพแล้ว (7 รูป)' : 'แทรกรูปภาพ'}
        >
          <ImageIcon className="w-3.5 h-3.5" />
        </button>
        {uploadStatus === 'uploading' && (
          <span className="text-xs text-gray-400 ml-1">กำลังอัปโหลด...</span>
        )}
      </div>

      {/* Segments */}
      <div className="pl-10">
        {segments.map((seg, i) =>
          seg.type === 'image' ? (
            <div key={i} className="relative group my-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={seg.url} alt="" className="rounded-lg w-full object-cover max-h-[480px]" />
              <button
                type="button"
                onClick={() => deleteImageSegment(i)}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div key={i} className="relative">
              {/* Floating + button on empty line */}
              {cursorState?.segmentIdx === i && cursorState.isEmptyLine && !maxImagesReached && (
                <button
                  type="button"
                  onMouseDown={(e) => { e.preventDefault(); openImagePicker() }}
                  style={{ top: cursorState.cursorY + 2 }}
                  className="absolute -left-10 w-6 h-6 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:border-purple-400 hover:shadow-sm transition-all z-10"
                  title="แทรกรูปภาพ"
                >
                  <Plus className="w-3 h-3 text-gray-500" />
                </button>
              )}
              <textarea
                ref={(el) => {
                  textareaRefs.current[i] = el
                  if (el) autoResize(el)
                }}
                value={seg.value}
                placeholder={i === 0 ? 'เริ่มเขียนบทความที่นี่... (รองรับ Markdown: **ตัวหนา**, - bullet)' : ''}
                onChange={(e) => { updateTextSegment(i, e.target.value); autoResize(e.target) }}
                onFocus={(e) => { setFocusedIdx(i); updateCursor(i, e.target, seg.value) }}
                onKeyUp={(e) => updateCursor(i, e.currentTarget, seg.value)}
                onClick={(e) => updateCursor(i, e.currentTarget, seg.value)}
                onKeyDown={(e) => {
                  if ((e.metaKey || e.ctrlKey) && e.key === 'b') {
                    e.preventDefault()
                    applyFormat('bold')
                  }
                }}
                onBlur={clearCursor}
                rows={1}
                className="w-full outline-none resize-none bg-transparent text-[15px] leading-7 text-foreground placeholder:text-gray-300 overflow-hidden"
              />
            </div>
          )
        )}
      </div>

      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onInputChange} />
    </div>
  )
}
