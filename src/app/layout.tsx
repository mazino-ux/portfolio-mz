import '../styles/globals.css'
import '../styles/animations.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/config/theme'
import { ThemeBackground } from './components/3d/ThemeBackground'
import { SkeletonLoader } from './components/ui/SkeletonLoader'
import { GoogleAnalytics } from './components/analytics/GoogleAnalytics'
import PerformanceGuard from './components/PerformanceGuard'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata: Metadata = {
  title: 'Trinity Ogwezi | Senior Full-Stack Engineer',
  description: 'Elite Full-Stack Engineer with 3+ years of experience architecting high-traffic SaaS platforms and enterprise-grade systems.',
  metadataBase: new URL('https://mazino-portfolio-psalm1vs3.vercel.app'),
  openGraph: {
    images: '/og-image.jpg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable}`}>
      <body className="bg-background text-foreground">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <GoogleAnalytics /> 
          <PerformanceGuard>
            <ThemeBackground />
          </PerformanceGuard>
          <SkeletonLoader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}