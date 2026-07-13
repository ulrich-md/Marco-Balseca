import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Acepta las credenciales de Supabase vengan con el nombre que vengan:
// VITE_* (manual), SUPABASE_* o NEXT_PUBLIC_SUPABASE_* (integración de Vercel).
// Usamos globalThis.process para no depender de @types/node en el type-check.
const penv: Record<string, string | undefined> =
  (globalThis as { process?: { env?: Record<string, string | undefined> } }).process?.env ?? {}
const pick = (...names: string[]) => {
  for (const n of names) {
    const v = penv[n]
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
  build: {
    // Separa los vendors pesados en chunks cacheables: el navegador los
    // descarga en paralelo y los reutiliza entre páginas/visitas.
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          motion: ['framer-motion'],
          scroll: ['gsap', 'lenis'],
        },
      },
    },
  },
})
