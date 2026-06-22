import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

/* =========================================================================
   Pila de avatares de la comunidad con FOTOS REALES de la gente en los
   eventos de Marco. Funciona como una CINTA HORIZONTAL: cada cierto tiempo
   una foto nueva entra por detrás (a la derecha), empuja toda la fila hacia
   adelante y la de adelante (izquierda) sale y desaparece. Seamless.
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

const SIZE = 40 // px (h-10 w-10)
const STEP = 26 // avance horizontal por avatar (se solapan)

type Item = { id: number; poolIdx: number }
type Props = { count?: number; intervalMs?: number }

export function CommunityAvatars({ count = 4, intervalMs = 2600 }: Props) {
  const reduce = useReducedMotion()
  const nextPool = useRef(count)
  const nextId = useRef(count)
  const [items, setItems] = useState<Item[]>(() =>
    Array.from({ length: count }, (_, i) => ({ id: i, poolIdx: i % POOL.length })),
  )

  useEffect(() => {
    if (reduce) return
    const id = window.setInterval(() => {
      setItems((prev) => {
        // Elige una foto que NO esté visible ahora mismo.
        const visible = prev.map((it) => it.poolIdx)
        let cand = nextPool.current % POOL.length
        let guard = 0
        while (visible.includes(cand) && guard < POOL.length) {
          nextPool.current++
          cand = nextPool.current % POOL.length
          guard++
        }
        nextPool.current++
        const entra: Item = { id: nextId.current++, poolIdx: cand }
        // Suelta la de adelante (sale) y mete la nueva al final (atrás).
        return [...prev.slice(1), entra]
      })
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [reduce, intervalMs])

  // Ancho total: fila de avatares + la insignia "+" solapada al final.
  const total = count * STEP + SIZE

  return (
    <div className="relative" style={{ width: total, height: SIZE }} aria-hidden>
      {/* Insignia "+" al fondo de la fila (detrás de todo) */}
      <span
        className="absolute top-0 flex items-center justify-center rounded-full border-2 border-white bg-accent text-xs font-bold text-white"
        style={{ left: count * STEP, width: SIZE, height: SIZE, zIndex: 0 }}
      >
        +
      </span>

      <AnimatePresence initial={false}>
        {items.map((it, i) => (
          <motion.span
            key={it.id}
            className="absolute top-0 left-0 overflow-hidden rounded-full border-2 border-white bg-mist will-change-transform"
            style={{ width: SIZE, height: SIZE, zIndex: count - i }}
            initial={reduce ? false : { x: count * STEP + STEP, scale: 0.55, opacity: 0 }}
            animate={{ x: i * STEP, scale: 1, opacity: 1 }}
            exit={reduce ? undefined : { x: -STEP * 1.6, scale: 0.55, opacity: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={POOL[it.poolIdx]}
              alt=""
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.currentTarget.style.opacity = '0'
              }}
              className="h-full w-full object-cover"
            />
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  )
}
