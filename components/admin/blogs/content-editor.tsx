'use client'

import { ImageIcon, Plus } from 'lucide-react'
import { useContentEditor } from '@/lib/hooks/use-content-editor'

type Props = {
  value: string
  onChange: (v: string) => void
}

export function ContentEditor({ value, onChange }: Props) {
  const { textareaRef, focused, setFocused, menuOpen, setMenuOpen, uploadStatus, fileRef, onInputChange } = useContentEditor(value, onChange)

  return (
    <div className="relative pl-10">
      <div className={`absolute left-0 top-1 transition-opacity ${focused || menuOpen ? 'opacity-100' : 'opacity-0'}`}>
        <div className="relative">
          <button
            type="button"
            onClick={() => setMenuOpen((p) => !p)}
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

          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onInputChange} />
        </div>
      </div>

      <textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onClick={() => setMenuOpen(false)}
        placeholder="เริ่มเขียนบทความที่นี่... (รองรับ Markdown)"
        className="w-full min-h-[480px] outline-none resize-none bg-transparent text-[15px] leading-7 text-foreground placeholder:text-gray-300 font-mono"
      />
    </div>
  )
}
