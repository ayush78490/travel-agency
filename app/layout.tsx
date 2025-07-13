import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'gosamyati-travel',
  description: 'A travel agency for booking trips to multiple destinations',
  generator: 'gosamyati-travel',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
