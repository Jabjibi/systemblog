import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SystemBlog',
  description: 'แหล่งรวมบทความและความรู้ด้านการเงิน ธุรกิจ และการลงทุน',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
