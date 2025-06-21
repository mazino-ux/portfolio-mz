'use client'
import { motion } from 'framer-motion'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/Avatar'
import { Star } from 'lucide-react'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'

type Testimonial = {
  id: string
  name: string
  role: string
  content: string
  rating: number
  avatar?: string
  created_at: string
}

export const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])

  useEffect(() => {
    const fetchTestimonials = async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .eq('approved', true)
        .order('created_at', { ascending: false })
        .limit(4)
      
      if (error) {
        console.error('Error fetching testimonials:', error)
        return
      }
      setTestimonials(data || [])
    }

    fetchTestimonials()
  }, [])

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-background to-background/50">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Client Testimonials</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            What people I&apos;ve worked with say about me
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

const TestimonialCard = ({ testimonial, index }: { testimonial: Testimonial; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="bg-background border rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="flex items-center gap-4 mb-6">
      <Avatar>
        <AvatarImage src={testimonial.avatar} alt={`${testimonial.name}'s avatar`} />
        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <h3 className="font-semibold">{testimonial.name}</h3>
        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
      </div>
      <div className="flex gap-1 ml-auto">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
          />
        ))}
      </div>
    </div>
    <p className="text-muted-foreground italic">&ldquo;{testimonial.content}&rdquo;</p>
    <p className="text-xs text-muted-foreground mt-3">
      {new Date(testimonial.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })}
    </p>
  </motion.div>
)