'use client'

import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Experience } from './components/sections/Experience'
import { Cursor } from './components/ui/Cursor'
import { Navigation } from './components/ui/Navigation'
import { ProgressBar } from './components/ui/ProgressBar'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Skills } from './components/sections/Skills'
import Projects from './components/sections/Projects'

// const LazyTestimonials = dynamic(
//   () => import('./components/sections/Testimonials').then((mod) => mod.default),
//   { ssr: false }
// )

const LazyReviews = dynamic(
  () => import('./components/sections/Reviews').then((mod) => mod.default),
  { ssr: false }
)

const LazyContact = dynamic(
  () => import('./components/sections/Contact').then((mod) => mod.default),
  { ssr: false }
)

export default function Home() {
  return (
    <>
      <Cursor />
      <Navigation />
      <ProgressBar />
      
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        
        <Suspense fallback={null}>
          <div className="container py-20">
            {/* <LazyTestimonials /> */}
            <LazyReviews />
          </div>
          <LazyContact />
        </Suspense>
      </main>
    </>
  )
}