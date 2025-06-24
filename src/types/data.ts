export type Review = {
    id: string
    created_at: string
    name: string
    role: string
    content: string
    rating: number
    avatar?: string | null
    approved: boolean
  }
  
  export type ContactForm = {
    id: string
    created_at: string
    name: string
    email: string
    message: string
    read: boolean
  }

  export type Testimonial = {
    id: string
    name: string
    role: string
    content: string
    rating: number
    avatar?: string
    created_at: string
  }