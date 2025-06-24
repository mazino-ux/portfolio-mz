import { createClient } from '@supabase/supabase-js'
import { Review, ContactForm } from '@/types/data' 

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: false
  }
})

export type { Review, ContactForm }

// Add these RLS policies if you haven't already
export const setupRLSPolicies = async () => {
  await supabase.rpc('create_policies')
}