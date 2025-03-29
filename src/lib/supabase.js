import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jnzuuntoklzqzomauvbv.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpuenV1bnRva2x6cXpvbWF1dmJ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMyODMzODMsImV4cCI6MjA1ODg1OTM4M30.cVPNJMEOA0IHtLIX_YhtsXR7SN7aldpn_c9TGQ6R9C0'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
