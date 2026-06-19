import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SystemBlog',
  description: 'แหล่งรวมบทความและความรู้ด้านเทคโนโลยี AI, Cloud และ DevOps',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
