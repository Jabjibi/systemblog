'use client'

import { Plus, X } from 'lucide-react'
import { useImageUpload } from '@/lib/hooks/use-image-upload'

type Props = {
  images: string[]
  onChange: (urls: string[]) => void
}

export function AdditionalImages({ images, onChange }: Props) {
  const { status, inputRef, onInputChange } = useImageUpload((url) => onChange([...images, url]))

  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
        รูปเพิ่มเติม <span className="normal-case font-normal">({images.length}/6)</span>
      </p>
      <div className="grid grid-cols-3 gap-2">
        {images.map((url, i) => (
          <div key={i} className="relative aspect-video rounded-lg overflow-hidden border border-gray-100 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={url} alt="" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={() => onChange(images.filter((_, j) => j !== i))}
              className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-3 h-3 text-white" />
            </button>
          </div>
        ))}
        {images.length < 6 && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={status === 'uploading'}
            className="aspect-video rounded-lg border-2 border-dashed border-gray-200 flex items-center justify-center hover:border-purple-300 hover:bg-purple-50/30 transition-colors disabled:opacity-50"
          >
            {status === 'uploading' ? (
              <span className="text-xs text-muted-foreground">...</span>
            ) : (
              <Plus className="w-4 h-4 text-gray-400" />
            )}
          </button>
        )}
      </div>
      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={onInputChange} />
    </div>
  )
}
