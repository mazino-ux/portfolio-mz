'use client'
import { Navigation } from './components/ui/Navigation'
import {ProgressBar }from './components/ui/ProgressBar'
import {Experience} from './components/sections/Experience'
import Projects from './components/sections/Projects'
import {Contact} from './components/sections/Contact'
import About from './components/sections/About'
import { Hero } from './components/sections/Hero'
import {Cursor} from './components/ui/Cursor'
import '../styles/globals.css'

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
        <Contact />
      </main>
    </>
  )
}