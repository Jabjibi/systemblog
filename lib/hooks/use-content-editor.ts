'use client'

import { useRef, useState } from 'react'
import { useImageUpload } from '@/lib/hooks/use-image-upload'

export function useContentEditor(value: string, onChange: (v: string) => void) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [focused, setFocused] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const { status: uploadStatus, inputRef: fileRef, onInputChange } = useImageUpload((url) => {
    const ta = textareaRef.current
    if (!ta) return
    const pos = ta.selectionStart ?? value.length
    const snippet = `\n![](${url})\n`
    onChange(value.slice(0, pos) + snippet + value.slice(pos))
    setMenuOpen(false)
    setTimeout(() => {
      ta.focus()
      ta.selectionStart = ta.selectionEnd = pos + snippet.length
    }, 0)
  })

  return { textareaRef, focused, setFocused, menuOpen, setMenuOpen, uploadStatus, fileRef, onInputChange }
}
