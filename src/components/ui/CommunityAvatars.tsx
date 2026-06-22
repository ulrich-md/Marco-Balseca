import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

/* =========================================================================
   Pila de avatares de la comunidad con FOTOS REALES de la gente en los
   eventos de Marco. Rotan con una transición premium (zoom + desenfoque que
   se desvanece) y un destello de anillo accent al cambiar. Respeta
   prefers-reduced-motion (sin animación ni rotación).
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
  const [pulse, setPulse] = useState(-1)
  const [tick, setTick] = useState(0)
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
      setPulse(slot)
      setTick((t) => t + 1)
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
          style={{ zIndex: pulse === i ? 5 : count - i }}
        >
          <span className="relative block h-full w-full overflow-hidden rounded-full">
            <AnimatePresence>
              <motion.img
                key={POOL[poolIdx]}
                src={POOL[poolIdx]}
                alt=""
                loading="lazy"
                decoding="async"
                onError={(e) => {
                  e.currentTarget.style.opacity = '0'
                }}
                className="absolute inset-0 h-full w-full object-cover will-change-transform"
                initial={reduce ? false : { opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 1.04 }}
                transition={{ duration: 1.1, ease: 'easeInOut' }}
              />
            </AnimatePresence>
          </span>

          {/* Destello de anillo accent en el avatar que acaba de cambiar */}
          {!reduce && pulse === i && (
            <motion.span
              key={tick}
              className="pointer-events-none absolute -inset-0.5 rounded-full ring-2 ring-accent/80"
              initial={{ opacity: 0.6, scale: 0.92 }}
              animate={{ opacity: 0, scale: 1.5 }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
            />
          )}
        </span>
      ))}
      <span className="relative z-0 flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-accent text-xs font-bold text-white">
        +
      </span>
    </div>
  )
}
