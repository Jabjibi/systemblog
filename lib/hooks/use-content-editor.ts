'use client'

import { useRef, useState, useCallback } from 'react'
import { useImageUpload } from '@/lib/hooks/use-image-upload'

export type TextSegment = { type: 'text'; value: string }
export type ImageSegment = { type: 'image'; url: string }
export type Segment = TextSegment | ImageSegment

export type CursorState = {
  segmentIdx: number
  cursorY: number
  isEmptyLine: boolean
} | null

function getCursorY(ta: HTMLTextAreaElement, cursorPos: number): number {
  const style = window.getComputedStyle(ta)
  const mirror = document.createElement('div')

  mirror.style.cssText = `
    position: absolute;
    visibility: hidden;
    overflow: hidden;
    white-space: pre-wrap;
    word-wrap: break-word;
    width: ${ta.clientWidth}px;
    font: ${style.font};
    font-size: ${style.fontSize};
    font-family: ${style.fontFamily};
    font-weight: ${style.fontWeight};
    line-height: ${style.lineHeight};
    letter-spacing: ${style.letterSpacing};
    padding: ${style.padding};
    border: ${style.border};
    box-sizing: ${style.boxSizing};
  `

  const textBefore = ta.value.slice(0, cursorPos)
  mirror.textContent = textBefore

  const caret = document.createElement('span')
  caret.textContent = '​'
  mirror.appendChild(caret)

  document.body.appendChild(mirror)
  const y = caret.offsetTop
  document.body.removeChild(mirror)

  return y
}

export function parseSegments(content: string): Segment[] {
  const lines = (content ?? '').split('\n')
  const result: Segment[] = []
  let textLines: string[] = []

  for (const line of lines) {
    const m = line.match(/^!\[.*?\]\((.*?)\)$/)
    if (m) {
      result.push({ type: 'text', value: textLines.join('\n') })
      textLines = []
      result.push({ type: 'image', url: m[1] })
    } else {
      textLines.push(line)
    }
  }
  result.push({ type: 'text', value: textLines.join('\n') })
  return result
}

export function segmentsToMarkdown(segments: Segment[]): string {
  return segments
    .map(s => s.type === 'image' ? `![](${s.url})` : s.value)
    .filter((p, i, arr) => !(p === '' && (i === 0 || i === arr.length - 1)))
    .join('\n')
}

export function useContentEditor(value: string, onChange: (v: string) => void) {
  const [focusedIdx, setFocusedIdx] = useState<number | null>(null)
  const [cursorState, setCursorState] = useState<CursorState>(null)
  const textareaRefs = useRef<Record<number, HTMLTextAreaElement | null>>({})

  const segments = parseSegments(value)

  const updateCursor = useCallback((segmentIdx: number, ta: HTMLTextAreaElement, val: string) => {
    const pos = ta.selectionStart
    const before = val.slice(0, pos)
    const lineStart = before.lastIndexOf('\n') + 1
    const lineEnd = val.indexOf('\n', pos)
    const lineContent = val.slice(lineStart, lineEnd === -1 ? undefined : lineEnd)
    const cursorY = getCursorY(ta, pos)
    setCursorState({ segmentIdx, cursorY, isEmptyLine: lineContent.trim() === '' })
  }, [])

  function updateTextSegment(segIdx: number, newValue: string) {
    const updated = segments.map((s, i) => i === segIdx ? { ...s as TextSegment, value: newValue } : s)
    onChange(segmentsToMarkdown(updated))
  }

  function deleteImageSegment(segIdx: number) {
    onChange(segmentsToMarkdown(segments.filter((_, i) => i !== segIdx)))
  }

  function applyFormat(type: 'bold' | 'bullet') {
    const idx = focusedIdx
    if (idx === null) return
    const ta = textareaRefs.current[idx]
    if (!ta) return
    const seg = segments[idx]
    if (seg?.type !== 'text') return
    const val = seg.value
    const start = ta.selectionStart
    const end = ta.selectionEnd

    if (type === 'bold') {
      const selected = val.slice(start, end)
      updateTextSegment(idx, val.slice(0, start) + `**${selected}**` + val.slice(end))
      setTimeout(() => { ta.focus(); ta.selectionStart = start + 2; ta.selectionEnd = end + 2 }, 0)
    } else {
      const lineStart = val.lastIndexOf('\n', start - 1) + 1
      const hasBullet = val.slice(lineStart).startsWith('- ')
      updateTextSegment(idx, hasBullet
        ? val.slice(0, lineStart) + val.slice(lineStart + 2)
        : val.slice(0, lineStart) + '- ' + val.slice(lineStart)
      )
      setTimeout(() => ta.focus(), 0)
    }
  }

  const { status: uploadStatus, inputRef: fileRef, onInputChange } = useImageUpload((url) => {
    const insertAfterIdx = focusedIdx !== null ? focusedIdx : segments.length - 1
    const newSegments = [
      ...segments.slice(0, insertAfterIdx + 1),
      { type: 'image' as const, url },
      { type: 'text' as const, value: '' },
      ...segments.slice(insertAfterIdx + 1),
    ]
    onChange(segmentsToMarkdown(newSegments))
  })

  const clearCursor = useCallback(() => setCursorState(null), [])

  return {
    segments,
    setFocusedIdx,
    cursorState,
    updateCursor,
    clearCursor,
    textareaRefs,
    updateTextSegment,
    deleteImageSegment,
    applyFormat,
    uploadStatus,
    fileRef, onInputChange,
    openImagePicker: () => fileRef.current?.click(),
  }
}
