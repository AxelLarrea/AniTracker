import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SB_URL!
const supabaseKey = import.meta.env.VITE_SB_ANON_KEY!

export const supabasePublic = createClient(supabaseUrl, supabaseKey)

// TODO: mover supabaseAdminKey y supabaseAdmin a una carpeta /api y crear el cliente de admin ahí
const supabaseAdminKey = process.env.VITE_SB_ADMIN_KEY!

export const supabaseAdmin = createClient(supabaseUrl, supabaseAdminKey)
