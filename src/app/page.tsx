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

// Simple loading component
const Loading = () => <div className="absolute inset-0 bg-background/80" />

// Dynamically import heavy components with proper typing
const ThreeScene = dynamic(
  () => import('./components/3d/ThreeScene').then((mod) => mod.default),
  { 
    ssr: false,
    loading: () => <Loading />
  }
)

const LazyTestimonials = dynamic(
  () => import('./components/sections/Testimonials').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <Loading />
  }
)

const LazyReviews = dynamic(
  () => import('./components/sections/Reviews').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <Loading />
  }
)

const LazyContact = dynamic(
  () => import('./components/sections/Contact').then((mod) => mod.default),
  {
    ssr: false,
    loading: () => <Loading />
  }
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
        
        {/* Suspense boundary for async components */}
        <Suspense fallback={null}>
          {/* 3D Background Section */}
          <div className="relative h-[50vh] min-h-[400px]">
            <ThreeScene />
          </div>
          
          {/* Testimonials and Reviews */}
          <div className="container py-20">
            <LazyTestimonials />
            <LazyReviews />
          </div>
          
          <LazyContact />
        </Suspense>
      </main>
    </>
  )
}