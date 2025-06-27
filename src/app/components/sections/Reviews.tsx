'use client'
import { motion } from 'framer-motion'
import { useEffect, useState, useRef, Suspense } from 'react'
import { supabase } from '@/lib/supabase'
import { Star, Upload, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAccentColor } from '@/config/theme'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'
import Image from 'next/image'
import type { Review } from '@/types/data'

const ProfessionalBadge3D = () => {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005
    }
  })

  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Stars radius={50} depth={30} count={2000} factor={3} fade speed={1} />
      
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <torusGeometry args={[1, 0.4, 16, 32]} /> {/* Reduced geometry complexity */}
        <meshStandardMaterial 
          color="#6366f1" 
          metalness={0.7} 
          roughness={0.2} 
          emissive="#6366f1"
          emissiveIntensity={0.3}
        />
      </mesh>
    </group>
  )
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    content: '',
    rating: 5,
    avatar: null as File | null
  })
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [notification, setNotification] = useState<{
    type: 'success' | 'error' | 'warning' | 'info'
    message: string
  } | null>(null)
  const { accentColor } = useAccentColor()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Memoized fetch to prevent unnecessary re-renders
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data, error } = await supabase
          .from('reviews')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(4)

        if (error) throw error
        if (data) setReviews(data)
      } catch (error) {
        console.error('Error fetching reviews:', error)
        setNotification({
          type: 'error',
          message: 'Failed to load reviews'
        })
      }
    }

    fetchReviews()
  }, [])

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, avatar: file })
      const previewUrl = URL.createObjectURL(file)
      setAvatarPreview(previewUrl)
      
      // Clean up object URL to prevent memory leaks
      return () => URL.revokeObjectURL(previewUrl)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setNotification(null)

    try {
      let avatarUrl = null
      
      if (formData.avatar) {
        const fileExt = formData.avatar.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const { error: uploadError } = await supabase.storage
          .from('avatars')
          .upload(fileName, formData.avatar)

        if (uploadError) throw uploadError
        avatarUrl = supabase.storage.from('avatars').getPublicUrl(fileName).data.publicUrl
      }

      const { data, error } = await supabase
        .from('reviews')
        .insert([{ 
          ...formData,
          avatar: avatarUrl,
          approved: false
        }])
        .select()

      if (error) throw error

      if (data) {
        setReviews([data[0], ...reviews])
        setFormData({
          name: '',
          role: '',
          content: '',
          rating: 5,
          avatar: null
        })
        if (avatarPreview) {
          URL.revokeObjectURL(avatarPreview)
          setAvatarPreview(null)
        }
        
        setNotification({
          type: 'success',
          message: 'Thank you! Your review has been submitted.'
        })
      }
    } catch (error) {
      console.error('Error submitting review:', error)
      setNotification({
        type: 'error',
        message: 'Failed to submit review. Please try again.'
      })
    }
  }

  const handleRatingChange = (rating: number) => {
    setFormData({ ...formData, rating })
  }

  return (
    <section id="reviews" className="py-32 bg-gradient-to-b from-background to-muted/10">
      <div className="container">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold mb-4">Client Voices</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Real feedback from professionals I&apos;ve worked with
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Left Column - Reviews */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-background/80 backdrop-blur-sm border rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all"
                >
                  <div className="flex items-start gap-4">
                    {review.avatar ? (
                      <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-primary/20 relative">
                        <Image 
                          src={review.avatar} 
                          alt={review.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center border-2 border-primary/20">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">{review.name}</h3>
                          <p className="text-sm text-muted-foreground">{review.role}</p>
                        </div>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="mt-3 text-muted-foreground italic">&ldquo;{review.content}&rdquo;</p>
                      <p className="text-xs text-muted-foreground mt-3">
                        {new Date(review.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12 bg-background/50 rounded-xl border border-dashed">
                <p className="text-muted-foreground">No reviews yet. Be the first to share!</p>
              </div>
            )}

            {/* Review Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="bg-background/80 backdrop-blur-sm border rounded-2xl p-6 shadow-lg"
            >
              <h3 className="text-xl font-bold mb-4">Add Your Review</h3>
              
              {notification && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={cn(
                    'mb-4 p-3 rounded-lg text-sm',
                    notification.type === 'success' ? 'bg-green-100 text-green-800' : '',
                    notification.type === 'error' ? 'bg-red-100 text-red-800' : ''
                  )}
                >
                  {notification.message}
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex items-center gap-4">
                  <div 
                    onClick={() => fileInputRef.current?.click()}
                    className="w-16 h-16 rounded-full bg-muted/20 border-2 border-dashed border-primary/30 flex items-center justify-center cursor-pointer hover:bg-muted/30 transition-colors"
                  >
                    {avatarPreview ? (
                      <div className="w-full h-full rounded-full relative overflow-hidden">
                        <Image 
                          src={avatarPreview} 
                          alt="Preview" 
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <Upload className="w-5 h-5 text-primary" />
                    )}
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleAvatarChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="grid md:grid-cols-2 gap-3">
                      <div>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="Your name"
                          className="w-full px-3 py-2 text-sm border rounded-lg bg-background"
                          required
                        />
                      </div>
                      <div>
                        <input
                          type="text"
                          value={formData.role}
                          onChange={(e) => setFormData({...formData, role: e.target.value})}
                          placeholder="Your role"
                          className="w-full px-3 py-2 text-sm border rounded-lg bg-background"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-center gap-1 mb-3">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingChange(star)}
                        className={cn(
                          'p-1 transition-all',
                          star <= formData.rating ? 'text-yellow-400' : 'text-muted-foreground'
                        )}
                      >
                        <Star className={`w-6 h-6 ${star <= formData.rating ? 'fill-current' : ''}`} />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <textarea
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    rows={3}
                    placeholder="Share your experience..."
                    className="w-full px-3 py-2 text-sm border rounded-lg bg-background"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-lg font-medium transition-all"
                  style={{ backgroundColor: accentColor, color: 'white' }}
                >
                  Submit Review
                </button>
              </form>
            </motion.div>
          </motion.div>

          {/* Right Column - Professional Badge */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="hidden lg:flex flex-col items-center justify-center sticky top-20 h-fit"
          >
            <div className="bg-background/80 backdrop-blur-sm border rounded-2xl p-8 shadow-xl w-full h-[500px]">
              <h3 className="text-2xl font-bold mb-2 text-center">Professional Verification</h3>
              <p className="text-muted-foreground text-center mb-6">
                Verified skills and endorsements
              </p>
              
              <div className="h-[300px] relative">
                <Canvas camera={{ position: [0, 0, 5], fov: 50 }} className="rounded-xl">
                  <Suspense fallback={null}>
                    <ProfessionalBadge3D />
                    <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
                  </Suspense>
                </Canvas>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted/10 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Verified Identity</h4>
                    <p className="text-sm text-muted-foreground">Government ID confirmed</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 bg-muted/10 rounded-lg">
                  <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Background Check</h4>
                    <p className="text-sm text-muted-foreground">Professional history verified</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}