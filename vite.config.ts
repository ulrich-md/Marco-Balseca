import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Acepta las credenciales de Supabase vengan con el nombre que vengan:
// VITE_* (manual), SUPABASE_* o NEXT_PUBLIC_SUPABASE_* (integración de Vercel).
const pick = (...names: string[]) => {
  for (const n of names) {
    const v = process.env[n]
    if (v && v.trim()) return v.trim()
  }
  return ''
}
const SB_URL = pick('VITE_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_URL', 'SUPABASE_URL')
const SB_KEY = pick(
  'VITE_SUPABASE_ANON_KEY',
  'NEXT_PUBLIC_SUPABASE_ANON_KEY',
  'SUPABASE_ANON_KEY',
  'SUPABASE_KEY',
)

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    __SB_URL__: JSON.stringify(SB_URL),
    __SB_KEY__: JSON.stringify(SB_KEY),
  },
})
