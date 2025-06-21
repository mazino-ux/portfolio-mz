'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { Button } from '../ui/Button'
import { Star, X, Check } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '../ui/Avatar'

type Review = {
  id: string
  name: string
  role: string
  content: string
  rating: number
  avatar?: string
  created_at: string
}

export const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([])
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    content: '',
    rating: 5
  })
  const [status, setStatus] = useState<{
    type: 'idle' | 'success' | 'error'
    message: string
  }>({ type: 'idle', message: '' })

  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from('reviews')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching reviews:', error)
        setStatus({
          type: 'error',
          message: 'Failed to load reviews'
        })
        return
      }
      setReviews(data || [])
    }

    fetchReviews()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus({ type: 'idle', message: '' })

    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert([{ ...formData }])
        .select()

      if (error) throw error

      setReviews([data[0], ...reviews])
      setFormData({
        name: '',
        role: '',
        content: '',
        rating: 5
      })
      setStatus({
        type: 'success',
        message: 'Review submitted successfully!'
      })
    } catch (error) {
      console.error('Error submitting review:', error)
      setStatus({
        type: 'error',
        message: 'Failed to submit review. Please try again.'
      })
    }
  }

  const handleRatingChange = (rating: number) => {
    setFormData({ ...formData, rating })
  }

  return (
    <section id="reviews" className="py-20 bg-gradient-to-b from-background to-background/50">
      <div className="container">
        <AnimatePresence>
          {status.type !== 'idle' && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center gap-2 ${
                status.type === 'success' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-red-500 text-white'
              }`}
            >
              {status.type === 'success' ? (
                <Check className="h-5 w-5" />
              ) : (
                <X className="h-5 w-5" />
              )}
              <span>{status.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">Client Reviews</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Share your experience working with me
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-background border rounded-xl p-8 shadow-sm"
          >
            <h3 className="text-2xl font-bold mb-6">Leave a Review</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Role/Position</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingChange(star)}
                      className={`p-1 transition-colors ${star <= formData.rating ? 'text-yellow-400' : 'text-muted-foreground'}`}
                    >
                      <Star className={`h-5 w-5 ${star <= formData.rating ? 'fill-current' : ''}`} />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Your Review</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  required
                />
              </div>
              
              <Button type="submit" className="w-full">
                Submit Review
              </Button>
            </form>
          </motion.div>

          <div className="space-y-6">
            {reviews.map((review, index) => (
              <ReviewCard key={review.id} review={review} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const ReviewCard = ({ review, index }: { review: Review; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
    viewport={{ once: true }}
    className="bg-background border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
  >
    <div className="flex items-center gap-4 mb-4">
      <Avatar>
        <AvatarImage src={review.avatar} alt="Avatar" />
        <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div>
        <h4 className="font-semibold">{review.name}</h4>
        <p className="text-sm text-muted-foreground">{review.role}</p>
      </div>
      <div className="flex gap-1 ml-auto">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
          />
        ))}
      </div>
    </div>
    <p className="text-muted-foreground italic">&ldquo;{review.content}&rdquo;</p>
    <p className="text-xs text-muted-foreground mt-3">
      {new Date(review.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })}
    </p>
  </motion.div>
)