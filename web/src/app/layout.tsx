import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { NuqsAdapter } from 'nuqs/adapters/next'
import { ReactQueryProvider } from '@/lib/react-query'

const interFont = Inter({
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: {
    template: '%s | Product Roadmap',
    default: 'Product Roadmap'
  },
  description: 'Follow the development progress of our entire platform.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${interFont.className} antialiased`}>
      <body className="min-h-screen bg-navy-950 text-navy-50">
        <ReactQueryProvider>
          <NuqsAdapter>{children}</NuqsAdapter>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
