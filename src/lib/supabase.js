import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

/**
 * Client Supabase — dibuat dari environment variable:
 *   VITE_SUPABASE_URL & VITE_SUPABASE_ANON_KEY (lihat file .env)
 * bernilai null jika konfigurasi belum tersedia.
 */
export const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null