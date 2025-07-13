import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from '@vercel/analytics/react' // Import Analytics from Vercel

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
      <body>
        {children}
        <Analytics /> {/* Add the Analytics component */}
      </body>
    </html>
  )
}