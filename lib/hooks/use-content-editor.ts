'use client'

import { useRef, useState, useCallback, useEffect } from 'react'
import { useImageUpload } from '@/lib/hooks/use-image-upload'

export type TextBlock = { id: string; type: 'text'; content: string }
export type ImageBlock = { id: string; type: 'image'; url: string }
export type Block = TextBlock | ImageBlock

function mkId() { return Math.random().toString(36).slice(2) + Date.now() }

function blocksToMarkdown(blocks: Block[]): string {
  return blocks.map(b => b.type === 'image' ? `![](${b.url})` : b.content).join('\n')
}

function markdownToBlocks(md: string): Block[] {
  if (!md) return [{ id: mkId(), type: 'text', content: '' }]
  const lines = md.split('\n')
  return lines.map(line => {
    const match = line.match(/^!\[.*?\]\((.*?)\)$/)
    if (match) return { id: mkId(), type: 'image', url: match[1] }
    return { id: mkId(), type: 'text', content: line }
  })
}

export function useContentEditor(value: string, onChange: (v: string) => void) {
  const [blocks, setBlocks] = useState<Block[]>(() => markdownToBlocks(value))
  const [focusedId, setFocusedId] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const textareaRefs = useRef<Record<string, HTMLTextAreaElement | null>>({})
  const lastEmittedRef = useRef(value)

  // Sync external value changes (e.g. loading edit form) without triggering our own onChange
  useEffect(() => {
    if (value !== lastEmittedRef.current) {
      setBlocks(markdownToBlocks(value))
      lastEmittedRef.current = value
    }
  }, [value])

  // Emit markdown to parent whenever blocks change — avoids calling onChange inside setState updater
  useEffect(() => {
    const md = blocksToMarkdown(blocks)
    if (md !== lastEmittedRef.current) {
      lastEmittedRef.current = md
      onChange(md)
    }
  }, [blocks, onChange])

  const updateText = useCallback((id: string, content: string) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...(b as TextBlock), content } : b))
  }, [])

  const handleKeyDown = useCallback((id: string, e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const newBlock: TextBlock = { id: mkId(), type: 'text', content: '' }
      setBlocks(prev => {
        const idx = prev.findIndex(b => b.id === id)
        return [...prev.slice(0, idx + 1), newBlock, ...prev.slice(idx + 1)]
      })
      setTimeout(() => textareaRefs.current[newBlock.id]?.focus(), 0)
    } else if (e.key === 'Backspace') {
      setBlocks(prev => {
        const block = prev.find(b => b.id === id) as TextBlock | undefined
        if (!block || block.content !== '' || prev.length <= 1) return prev
        e.preventDefault()
        const idx = prev.findIndex(b => b.id === id)
        const next = prev.filter(b => b.id !== id)
        const target = prev[idx - 1] ?? prev[idx + 1]
        if (target?.type === 'text') {
          setTimeout(() => textareaRefs.current[target.id]?.focus(), 0)
        }
        return next
      })
    }
  }, [])

  const deleteBlock = useCallback((id: string) => {
    setBlocks(prev => {
      if (prev.length <= 1) return prev
      const idx = prev.findIndex(b => b.id === id)
      const next = prev.filter(b => b.id !== id)
      const target = prev[idx - 1] ?? prev[idx + 1]
      if (target?.type === 'text') {
        setTimeout(() => textareaRefs.current[target.id]?.focus(), 0)
      }
      return next
    })
  }, [])

  const { status: uploadStatus, inputRef: fileRef, onInputChange } = useImageUpload((url) => {
    const imageBlock: ImageBlock = { id: mkId(), type: 'image', url }
    const afterBlock: TextBlock = { id: mkId(), type: 'text', content: '' }
    setBlocks(prev => {
      const idx = focusedId ? prev.findIndex(b => b.id === focusedId) : prev.length - 1
      const insertAfter = idx >= 0 ? idx : prev.length - 1
      return [
        ...prev.slice(0, insertAfter + 1),
        imageBlock,
        afterBlock,
        ...prev.slice(insertAfter + 1),
      ]
    })
    setMenuOpen(false)
    setFocusedId(afterBlock.id)
    setTimeout(() => textareaRefs.current[afterBlock.id]?.focus(), 0)
  })

  return {
    blocks,
    focusedId, setFocusedId,
    menuOpen, setMenuOpen,
    textareaRefs,
    updateText,
    handleKeyDown,
    deleteBlock,
    uploadStatus, fileRef, onInputChange,
  }
}
