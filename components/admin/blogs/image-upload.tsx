'use client'

import Image from 'next/image'
import { Upload, X, ImageIcon } from 'lucide-react'
import { useImageUpload } from '@/lib/hooks/use-image-upload'

type Props = {
  value: string
  onChange: (url: string) => void
  label?: string
}

export function ImageUpload({ value, onChange, label = 'รูปปก' }: Props) {
  const { preview, status, inputRef, onInputChange, onDrop } = useImageUpload(onChange)

  const displaySrc = preview ?? (value || null)

  function onDragOver(e: React.DragEvent) {
    e.preventDefault()
  }

  function clear() {
    onChange('')
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-foreground">{label}</label>

      {displaySrc ? (
        <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-gray-200 group">
          <Image src={displaySrc} alt="cover preview" fill className="object-cover" />
          {status === 'uploading' && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <p className="text-white text-sm font-medium">กำลังอัปโหลด...</p>
            </div>
          )}
          {status !== 'uploading' && (
            <button
              type="button"
              onClick={clear}
              className="absolute top-2 right-2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          )}
        </div>
      ) : (
        <div
          onDrop={onDrop}
          onDragOver={onDragOver}
          onClick={() => inputRef.current?.click()}
          className="w-full aspect-video rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-purple-300 hover:bg-purple-50/30 transition-colors"
        >
          {status === 'uploading' ? (
            <p className="text-sm text-muted-foreground">กำลังอัปโหลด...</p>
          ) : (
            <>
              <div className="w-12 h-12 rounded-xl bg-gray-50 flex items-center justify-center">
                {status === 'error' ? (
                  <ImageIcon className="w-6 h-6 text-red-400" />
                ) : (
                  <Upload className="w-6 h-6 text-gray-400" />
                )}
              </div>
              <div className="text-center">
                {status === 'error' ? (
                  <p className="text-sm text-red-500">อัปโหลดไม่สำเร็จ กรุณาลองใหม่</p>
                ) : (
                  <>
                    <p className="text-sm font-medium text-foreground">คลิกหรือลากไฟล์มาวาง</p>
                    <p className="text-xs text-muted-foreground mt-0.5">PNG, JPG, WEBP (สูงสุด 10 MB)</p>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={onInputChange}
      />
    </div>
  )
}
