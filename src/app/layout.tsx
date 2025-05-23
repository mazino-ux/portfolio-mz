import '../styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/config/theme'

const inter = Inter({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: 'Trinity Ogwezi | Senior Full-Stack Engineer',
  description: 'Elite Full-Stack Engineer with 3+ years of experience architecting high-traffic SaaS platforms and enterprise-grade systems.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground`} suppressHydrationWarning>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}