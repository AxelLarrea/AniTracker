import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SB_URL!
const supabaseKey = import.meta.env.VITE_SB_ANON_KEY!

export const supabasePublic = createClient(supabaseUrl, supabaseKey)
