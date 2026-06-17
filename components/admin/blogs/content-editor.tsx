'use client'

import { Bold, ImageIcon, List, Plus, X } from 'lucide-react'
import { useContentEditor } from '@/lib/hooks/use-content-editor'

type Props = {
  value: string
  onChange: (v: string) => void
}

function autoResize(el: HTMLTextAreaElement) {
  el.style.height = 'auto'
  el.style.height = `${el.scrollHeight}px`
}

export function ContentEditor({ value, onChange }: Props) {
  const {
    blocks, focusedId, setFocusedId,
    menuOpen, setMenuOpen,
    textareaRefs,
    updateText, handleKeyDown, deleteBlock,
    uploadStatus, fileRef, onInputChange,
    applyFormat,
  } = useContentEditor(value, onChange)

  return (
    <div className="relative pl-10">
      {/* Formatting toolbar */}
      <div className="flex items-center gap-1 mb-4 pb-3 border-b border-gray-100">
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
      </div>
      {blocks.map((block, index) => (
        <div key={block.id} className="relative group">
          {focusedId === block.id && block.type === 'text' && (
            <div className="absolute -left-10 top-0.5">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setMenuOpen(p => !p)}
                  className="w-7 h-7 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:border-gray-400 hover:shadow-sm transition-all"
                  title="เพิ่มเนื้อหา"
                >
                  <Plus className="w-3.5 h-3.5 text-gray-500" />
                </button>

                {menuOpen && (
                  <div className="absolute left-9 top-0 bg-white rounded-xl shadow-lg border border-gray-100 py-1 min-w-[140px] z-10">
                    <p className="px-3 py-1.5 text-xs text-muted-foreground font-medium">เพิ่มเนื้อหา</p>
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      disabled={uploadStatus === 'uploading'}
                      className="flex items-center gap-2.5 px-3 py-2 hover:bg-gray-50 w-full text-sm text-left text-gray-700 disabled:opacity-50"
                    >
                      <ImageIcon className="w-4 h-4 text-gray-400" />
                      {uploadStatus === 'uploading' ? 'กำลังอัปโหลด...' : 'รูปภาพ'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {block.type === 'text' ? (
            <textarea
              ref={(el) => {
                textareaRefs.current[block.id] = el
                if (el) autoResize(el)
              }}
              value={block.content}
              placeholder={index === 0 ? 'เริ่มเขียนบทความที่นี่...' : ''}
              onChange={(e) => {
                updateText(block.id, e.target.value)
                autoResize(e.target)
              }}
              onKeyDown={(e) => handleKeyDown(block.id, e)}
              onFocus={() => { setFocusedId(block.id); setMenuOpen(false) }}
              onBlur={() => setFocusedId(null)}
              rows={1}
              className="w-full outline-none resize-none bg-transparent text-[15px] leading-7 text-foreground placeholder:text-gray-300 overflow-hidden"
            />
          ) : (
            <div className="relative my-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={block.url}
                alt=""
                className="rounded-lg w-full object-cover max-h-[480px]"
              />
              <button
                type="button"
                onClick={() => deleteBlock(block.id)}
                className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition-colors opacity-0 group-hover:opacity-100"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      ))}

      <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onInputChange} />
    </div>
  )
}
