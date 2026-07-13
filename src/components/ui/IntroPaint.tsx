import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

/* =========================================================================
   Intro "Trazo": pincelada roja que pinta y revela MARCO BALSECA al cargar.
   - Solo la PRIMERA visita por sesión (sessionStorage) — no se repite en cada
     navegación, que es lo que separa "elegante" de "molesto".
   - Saltable: clic / scroll / tecla / touch la cierra al instante.
   - Respeta prefers-reduced-motion (fade corto en vez de animación).
   - Ligera: SVG + framer-motion (ya en el stack). Sin WebGL.
   ========================================================================= */

const EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1]
const ACCENT = '#e1251b'

// Pincelada-subrayado (trazo horizontal con vida). El filtro de turbulencia
// le da el borde rugoso de brocha seca.
const BRUSH_D = 'M 30 52 C 130 30, 210 70, 320 48 S 500 28, 575 50'

export function IntroPaint() {
  const reduce = useReducedMotion() ?? false
  const [show, setShow] = useState(() => {
    if (typeof window === 'undefined') return false
    if (window.location.pathname.startsWith('/admin')) return false // no en el panel
    return true // se muestra en cada carga/refresh (no en navegación interna SPA)
  })
  const [leaving, setLeaving] = useState(false)
  const [ready, setReady] = useState(false)

  // Bloquea el scroll mientras dura la intro.
  useEffect(() => {
    if (!show) return
    const html = document.documentElement
    const prev = html.style.overflow
    html.style.overflow = 'hidden'
    return () => {
      html.style.overflow = prev
    }
  }, [show])

  // Espera (con tope) a que Anton esté lista, para que el wordmark salga nítido
  // y sin "salto" de fuente. La intro tapa la página justo mientras carga.
  useEffect(() => {
    if (!show) return
    let done = false
    const go = () => {
      if (!done) {
        done = true
        setReady(true)
      }
    }
    try {
      const fonts = (document as Document & { fonts?: { load: (f: string) => Promise<unknown> } }).fonts
      fonts?.load('1em "Anton"').then(go, go)
    } catch {
      go()
    }
    const t = window.setTimeout(go, 500) // tope: nunca esperar de más
    return () => window.clearTimeout(t)
  }, [show])

  // Saltar con cualquier interacción (activo desde el inicio).
  useEffect(() => {
    if (!show) return
    const dismiss = () => setLeaving(true)
    window.addEventListener('keydown', dismiss)
    window.addEventListener('wheel', dismiss, { passive: true })
    window.addEventListener('touchstart', dismiss, { passive: true })
    return () => {
      window.removeEventListener('keydown', dismiss)
      window.removeEventListener('wheel', dismiss)
      window.removeEventListener('touchstart', dismiss)
    }
  }, [show])

  // Cierre automático: arranca cuando el contenido ya está listo para animar.
  useEffect(() => {
    if (!show || !ready) return
    const t = window.setTimeout(() => setLeaving(true), reduce ? 600 : 1700)
    return () => window.clearTimeout(t)
  }, [show, ready, reduce])

  if (!show) return null

  return (
    <AnimatePresence onExitComplete={() => setShow(false)}>
      {!leaving && (
        <motion.div
          key="intro"
          aria-hidden
          onClick={() => setLeaving(true)}
          className="fixed inset-0 z-[120] flex cursor-pointer flex-col items-center justify-center overflow-hidden bg-bone px-6"
          initial={{ opacity: reduce ? 0 : 1 }}
          animate={{ opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { y: '-100%' }}
          transition={{ duration: reduce ? 0.4 : 0.62, ease: EXPO }}
        >
          {ready && (
            <>
              {/* eyebrow */}
              <motion.p
                className="eyebrow mb-5 text-mute"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: reduce ? 0.1 : 1.0, duration: 0.4 }}
              >
                Tehuacán · Puebla
              </motion.p>

              {/* wordmark con revelado tipo "pintado" (clip wipe — compositor) */}
              <motion.h1
                className="font-display text-center leading-[0.8] text-ink"
                style={{ willChange: 'clip-path, opacity' }}
                initial={{
                  clipPath: reduce ? 'inset(0 0 0 0)' : 'inset(0 100% 0 0)',
                  opacity: reduce ? 0 : 1,
                }}
                animate={{ clipPath: 'inset(0 0 0 0)', opacity: 1 }}
                transition={reduce ? { duration: 0.35 } : { delay: 0.15, duration: 0.66, ease: EXPO }}
              >
                <span className="block text-[15vw] sm:text-[13vw] lg:text-[8.5rem]">MARCO</span>
                <span className="block text-[15vw] sm:text-[13vw] lg:text-[8.5rem]">BALSECA</span>
              </motion.h1>

              {/* pincelada roja que se pinta debajo (SIN filtro SVG: animar
                  pathLength es barato; el filtro de turbulencia se recalcula por
                  frame y causaba el "entrecortado"). */}
              <svg viewBox="0 0 600 90" className="mt-3 h-auto w-[70vw] max-w-[600px]" fill="none" aria-hidden>
                <motion.path
                  d={BRUSH_D}
                  stroke={ACCENT}
                  strokeWidth={26}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: reduce ? 1 : 0 }}
                  animate={{ pathLength: 1 }}
                  transition={reduce ? { duration: 0 } : { delay: 0.45, duration: 0.7, ease: EXPO }}
                />
              </svg>

              {/* hint de saltar */}
              {!reduce && (
                <motion.span
                  className="absolute bottom-7 text-[11px] uppercase tracking-[0.25em] text-mute/60"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3, duration: 0.4 }}
                >
                  toca para entrar
                </motion.span>
              )}
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
