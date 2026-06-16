'use client'

import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

type BlogSearchProps = {
  value: string
  onChange: (value: string) => void
  onSubmit: (value: string) => void
}

export function BlogSearch({ value, onChange, onSubmit }: BlogSearchProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit(value)
      }}
      className="flex gap-2 max-w-md w-full"
    >
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="ค้นหาบทความ..."
          className="pl-9"
        />
      </div>
      <Button type="submit">ค้นหา</Button>
    </form>
  )
}
