'use client'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAccentColor } from '@/config/theme'
import { Review } from '@/types/data'

export default function Reviews () {
  const [reviews, setReviews] = useState<Review[]>([])
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    content: '',
    rating: 5
  })
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'warning' | 'info'
    message: string
  } | null>(null)
  const { accentColor } = useAccentColor()

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .order('created_at', { ascending: false })

        if (error) throw error

        setReviews(data || [])
      } catch (error: unknown) {
        console.error('Error fetching reviews:', error)
        setNotification({
          type: 'error',
          message: error instanceof Error ? error.message : 'Failed to load reviews'
        })
      }
    }

    fetchReviews()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setNotification(null)

    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert([{ 
          ...formData,
          approved: false
        }])
        .select()

      if (error) throw error

      setReviews([data[0], ...reviews])
      setFormData({
        name: '',
        role: '',
        content: '',
        rating: 5
      })
      setNotification({
        type: 'success',
        message: 'Thank you! Your review has been submitted for approval.'
      })
    } catch (error: unknown) {
      console.error('Error submitting review:', error)
      setNotification({
        type: 'error',
        message: error instanceof Error ? error.message : 'Failed to submit review. Please try again.'
      })
    }
  }

  const handleRatingChange = (rating: number) => {
    setFormData({ ...formData, rating })
  }

  // Calculate statistics
  const totalReviews = reviews.length
  const averageRating = totalReviews > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1)
    : '0.0'
  const approvalRate = '92%' // Placeholder

  return (
    <section id="reviews" className="pb-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">Share Your Experience</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Your feedback helps me improve my services
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-background/80 backdrop-blur-sm border rounded-2xl p-8 shadow-xl"
          >
            <h3 className="text-2xl font-bold mb-6">Leave a Review</h3>
            
            {notification && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn(
                  'mb-6 p-4 rounded-lg',
                  notification.type === 'success' ? 'bg-green-100 text-green-800' : '',
                  notification.type === 'error' ? 'bg-red-100 text-red-800' : ''
                )}
              >
                {notification.message}
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Your Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Your Role</label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Rating</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleRatingChange(star)}
                      className={cn(
                        'p-1 transition-all transform hover:scale-110',
                        star <= formData.rating ? 'text-yellow-400' : 'text-muted-foreground'
                      )}
                    >
                      <Star className={`h-6 w-6 ${star <= formData.rating ? 'fill-current' : ''}`} />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Your Feedback</label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  rows={5}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent bg-background transition-all"
                  required
                />
              </div>
              
              <motion.button
                type="submit"
                className="w-full py-6 text-lg font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{ backgroundColor: accentColor }}
              >
                Submit Review
              </motion.button>
            </form>

            {/* Statistics Panel */}
            {reviews.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-12 p-6 bg-muted/10 rounded-xl"
              >
                <h3 className="text-xl font-bold mb-4">Community Feedback</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-background p-4 rounded-lg border text-center">
                    <p className="text-sm text-muted-foreground">Total Reviews</p>
                    <p className="text-2xl font-bold">{totalReviews}</p>
                  </div>
                  <div className="bg-background p-4 rounded-lg border text-center">
                    <p className="text-sm text-muted-foreground">Average Rating</p>
                    <p className="text-2xl font-bold flex items-center justify-center">
                      {averageRating}
                      <Star className="inline ml-1 w-4 h-4 fill-yellow-400 text-yellow-400" />
                    </p>
                  </div>
                  <div className="bg-background p-4 rounded-lg border text-center">
                    <p className="text-sm text-muted-foreground">Approval Rate</p>
                    <p className="text-2xl font-bold">{approvalRate}</p>
                  </div>
                  <div className="bg-background p-4 rounded-lg border text-center">
                    <p className="text-sm text-muted-foreground">Response Time</p>
                    <p className="text-2xl font-bold">&lt;24h</p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}