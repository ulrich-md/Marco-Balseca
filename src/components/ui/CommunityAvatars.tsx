import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

/* =========================================================================
   Pila de avatares de la comunidad. Usa FOTOS REALES de la gente en los
   eventos de Marco (personas de Tehuacán, situaciones normales — nada de
   estudio) y va rotando una imagen cada cierto tiempo. Sin problemas de
   licencias ni consentimiento (son fotos propias de sus jornadas).
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

export function CommunityAvatars({ count = 4, intervalMs = 2600 }: Props) {
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
        // evita repetir una imagen ya visible
        let candidate = next.current % POOL.length
        let guard = 0
        while (copy.includes(candidate) && guard < POOL.length) {
          next.current++
          candidate = next.current % POOL.length
          guard++
        }
        copy[slot] = candidate
        next.current++
        slot = (slot + 1) % copy.length
        return copy
      })
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [reduce, intervalMs])

  return (
    <div className="flex -space-x-3" aria-hidden>
      {slots.map((poolIdx, i) => (
        <span
          key={i}
          className="relative h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-mist"
        >
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
              className="absolute inset-0 h-full w-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            />
          </AnimatePresence>
        </span>
      ))}
      <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-accent text-xs font-bold text-white">
        +
      </span>
    </div>
  )
}
