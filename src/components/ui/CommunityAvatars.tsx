import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

/* =========================================================================
   Pila de avatares de la comunidad con FOTOS REALES de la gente en los
   eventos de Marco. Cambian con un GIRO 3D horizontal (tipo moneda) sobre el
   eje vertical: el avatar voltea y revela la nueva foto. Seamless y lento.
   Respeta prefers-reduced-motion.
   ========================================================================= */

const POOL = [
  '/assets/comunidad/comunidad-mercado.webp',
  '/assets/comunidad/comunidad-familia.webp',
  '/assets/comunidad/comunidad-cancha.webp',
  '/assets/comunidad/comunidad-visita.webp',
  '/assets/acciones/accion-deporte-voleibol.webp',
  '/assets/acciones/accion-educacion.webp',
  '/assets/acciones/accion-obra-cancha.webp',
  '/assets/acciones/accion-deporte-copa.webp',
]

type Props = { count?: number; intervalMs?: number }

export function CommunityAvatars({ count = 4, intervalMs = 3400 }: Props) {
  const reduce = useReducedMotion()
  const [slots, setSlots] = useState<number[]>(() =>
    Array.from({ length: count }, (_, i) => i % POOL.length),
  )
  const next = useRef(count)

  useEffect(() => {
    if (reduce) return
    let slot = 0
    const id = window.setInterval(() => {
      setSlots((prev) => {
        const copy = [...prev]
        let cand = next.current % POOL.length
        let guard = 0
        while (copy.includes(cand) && guard < POOL.length) {
          next.current++
          cand = next.current % POOL.length
          guard++
        }
        copy[slot] = cand
        next.current++
        return copy
      })
      slot = (slot + 1) % count
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [reduce, intervalMs, count])

  return (
    <div className="flex -space-x-3" aria-hidden>
      {slots.map((poolIdx, i) => (
        <span
          key={i}
          className="relative h-10 w-10 rounded-full border-2 border-white bg-mist"
          style={{ zIndex: count - i }}
        >
          <span className="relative block h-full w-full overflow-hidden rounded-full [perspective:520px]">
            <AnimatePresence mode="wait">
              <motion.img
                key={POOL[poolIdx]}
                src={POOL[poolIdx]}
                alt=""
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.currentTarget.style.opacity = '0'
                }}
                className="absolute inset-0 h-full w-full object-cover [backface-visibility:hidden] will-change-transform"
                initial={reduce ? false : { rotateY: 90, opacity: 0.25 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={reduce ? undefined : { rotateY: -90, opacity: 0.25 }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
              />
            </AnimatePresence>
          </span>
        </span>
      ))}
      <span className="relative z-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-accent text-xs font-bold text-white">
        +
      </span>
    </div>
  )
}
