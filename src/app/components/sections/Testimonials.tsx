'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/Avatar'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Testimonial } from '@/types/data'
import { cn } from '@/lib/utils'

export default function Testimonials () {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false })
        .limit(6)
      
      if (error) {
        console.error('Error fetching testimonials:', error)
        return
      }
      setTestimonials(data || [])
    }

    fetchTestimonials()
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
    if (testimonials.length <= 1) return
    
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 8000)
    
    return () => clearInterval(interval)
  }, [testimonials.length])

  return (
    <section id="testimonials" className="py-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">Client Testimonials</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            What people I&apos;ve worked with say about me
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {testimonials.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground">No testimonials available yet</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className="bg-background/80 backdrop-blur-sm border rounded-2xl p-10 shadow-xl"
              >
                <Quote className="w-8 h-8 text-primary/30 mb-4" />
                
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-shrink-0">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={testimonials[currentTestimonial].avatar} alt='Avatar' />
                      <AvatarFallback>{testimonials[currentTestimonial].name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                  
                  <div>
                    <p className="text-lg italic mb-6">&ldquo;{testimonials[currentTestimonial].content}&rdquo;</p>
                    
                    <div>
                      <h3 className="font-bold text-lg">{testimonials[currentTestimonial].name}</h3>
                      <p className="text-muted-foreground mb-2">{testimonials[currentTestimonial].role}</p>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${i < testimonials[currentTestimonial].rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
          
          {/* Navigation */}
          {testimonials.length > 1 && (
            <div className="flex justify-center mt-8 gap-4">
              <button
                onClick={() => setCurrentTestimonial((currentTestimonial - 1 + testimonials.length) % testimonials.length)}
                className="p-2 rounded-full bg-background border shadow-sm hover:bg-muted transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={cn(
                      'w-3 h-3 rounded-full transition-all',
                      i === currentTestimonial ? 'bg-primary w-6' : 'bg-muted-foreground/30'
                    )}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
              
              <button
                onClick={() => setCurrentTestimonial((currentTestimonial + 1) % testimonials.length)}
                className="p-2 rounded-full bg-background border shadow-sm hover:bg-muted transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}