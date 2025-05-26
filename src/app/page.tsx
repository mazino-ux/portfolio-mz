'use client'

import { Hero } from './components/sections/Hero'
import { About } from './components/sections/About'
import { Experience } from './components/sections/Experience'
import Projects  from './components/sections/Projects'
import { Skills } from './components/sections/Skills'
import { Testimonials } from './components/sections/Testimonials'
import { Contact } from './components/sections/Contact'
import { Cursor } from './components/ui/Cursor'
import { Navigation } from './components/ui/Navigation'
import { ProgressBar } from './components/ui/ProgressBar'
import { Reviews } from './components/sections/Reviews'

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
        <Projects />
        <Skills />
        <Testimonials />
        <Reviews />
        <Contact />
      </main>
    </>
  )
}