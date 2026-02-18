import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Business Metrics Calculator',
  description: 'Real-time business metrics calculator for consumer product startups',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
