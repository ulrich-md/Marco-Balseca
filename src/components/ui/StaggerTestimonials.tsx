import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'
import type { Testimonio } from '../../data/testimonios'

/* =========================================================================
   Carrusel escalonado de testimonios (adaptación del asset "stagger
   testimonials" a la identidad del sitio, sin shadcn/Next):
   - Tokens propios (guinda/crema), sin lucide (chevrones inline).
   - Datos REALES de useTestimonios() (editables en /admin). Foto si existe;
     si no, mosaico de iniciales — nada de caras stock.
   - Microinteracciones: AUTOPLAY con pausa al hover/focus/arrastre, control
     por TECLADO (← →), ARRASTRAR/deslizar para navegar, click en las
     tarjetas laterales, y hover que enciende el borde guinda.
   - transition CSS → respeta el reduced-motion global; el autoplay se apaga
     con prefers-reduced-motion.
   ========================================================================= */

const SQRT_5000 = Math.sqrt(5000)

type Item = Testimonio & { tempId: number }

/** Rellena la lista hasta ≥7 tarjetas duplicando (el carrusel se ve vacío con pocas). */
function pad(items: Testimonio[]): Item[] {
  if (items.length === 0) return []
  const out: Item[] = []
  let i = 0
  while (out.length < Math.max(7, items.length)) {
    out.push({ ...items[i % items.length], tempId: out.length })
    i++
  }
  return out
}

function Chevron({ dir }: { dir: 'left' | 'right' }) {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden>
      <path d={dir === 'left' ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CardAvatar({ t, center }: { t: Testimonio; center: boolean }) {
  const shadow = `3px 3px 0px ${center ? 'rgba(0,0,0,0.28)' : 'var(--color-cream-deep)'}`
  if (t.foto) {
    return (
      <img
        src={t.foto}
        alt={`Foto de ${t.nombre}`}
        loading="lazy"
        decoding="async"
        className="mb-4 h-14 w-12 object-cover object-top"
        style={{ boxShadow: shadow }}
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
      />
    )
  }
  const iniciales = t.nombre
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
  return (
    <span
      className={`font-condensed mb-4 flex h-14 w-12 items-center justify-center text-lg font-bold ${
        center ? 'bg-white/15 text-white' : 'bg-accent/10 text-accent'
      }`}
      style={{ boxShadow: shadow }}
      aria-hidden
    >
      {iniciales}
    </span>
  )
}

function Card({
  position,
  t,
  onMove,
  cardSize,
}: {
  position: number
  t: Item
  onMove: (steps: number) => void
  cardSize: number
}) {
  const isCenter = position === 0
  return (
    <div
      onClick={() => position !== 0 && onMove(position)}
      className={`absolute left-1/2 top-1/2 border-2 p-8 transition-all duration-500 ease-[var(--ease-out-expo)] ${
        isCenter
          ? 'z-10 border-accent bg-accent text-white'
          : 'z-0 cursor-pointer border-ink/15 bg-white text-ink hover:border-accent/60'
      }`}
      style={{
        width: cardSize,
        height: cardSize,
        clipPath:
          'polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)',
        transform: `translate(-50%, -50%) translateX(${(cardSize / 1.5) * position}px) translateY(${
          isCenter ? -65 : position % 2 ? 15 : -15
        }px) rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)`,
        boxShadow: isCenter ? '0px 8px 0px 4px var(--color-accent-deep)' : 'none',
      }}
    >
      <span
        aria-hidden
        className={`absolute block origin-top-right rotate-45 ${isCenter ? 'bg-white/30' : 'bg-ink/15'}`}
        style={{ right: -2, top: 48, width: SQRT_5000, height: 2 }}
      />
      <CardAvatar t={t} center={isCenter} />
      <blockquote className={`text-base font-medium leading-snug sm:text-lg ${isCenter ? 'text-white' : 'text-ink/90'}`}>
        “{t.texto}”
      </blockquote>
      <p
        className={`font-condensed absolute bottom-8 left-8 right-8 mt-2 text-sm font-semibold uppercase tracking-wide ${
          isCenter ? 'text-white/80' : 'text-mute'
        }`}
      >
        — {t.nombre}
        {t.rol ? `, ${t.rol}` : ''}
        {t.lugar ? ` · ${t.lugar}` : ''}
      </p>
    </div>
  )
}

const btnCls =
  'flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-ink/20 bg-white text-ink shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:bg-accent hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2'

export function StaggerTestimonials({ items }: { items: Testimonio[] }) {
  const reduce = useReducedMotion()
  const [cardSize, setCardSize] = useState(365)
  const [list, setList] = useState<Item[]>(() => pad(items))
  const [paused, setPaused] = useState(false)
  const dragX = useRef<number | null>(null)

  useEffect(() => {
    setList(pad(items))
  }, [items])

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia('(min-width: 640px)')
      setCardSize(matches ? 365 : 290)
    }
    updateSize()
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  const handleMove = (steps: number) => {
    setList((prev) => {
      const next = [...prev]
      if (steps > 0) {
        for (let i = steps; i > 0; i--) {
          const item = next.shift()
          if (!item) return prev
          next.push({ ...item, tempId: Math.random() })
        }
      } else {
        for (let i = steps; i < 0; i++) {
          const item = next.pop()
          if (!item) return prev
          next.unshift({ ...item, tempId: Math.random() })
        }
      }
      return next
    })
  }

  // AUTOPLAY (pausa al hover/focus/arrastre; se apaga con reduced-motion)
  useEffect(() => {
    if (reduce || paused || list.length < 2) return
    const id = window.setInterval(() => handleMove(1), 5200)
    return () => window.clearInterval(id)
  }, [reduce, paused, list.length])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      handleMove(-1)
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      handleMove(1)
    }
  }

  const onPointerDown = (e: React.PointerEvent) => {
    dragX.current = e.clientX
    setPaused(true)
  }
  const onPointerUp = (e: React.PointerEvent) => {
    if (dragX.current != null) {
      const dx = e.clientX - dragX.current
      if (Math.abs(dx) > 45) handleMove(dx < 0 ? 1 : -1)
      dragX.current = null
    }
    setPaused(false)
  }

  if (list.length === 0) return null

  return (
    <div
      role="group"
      aria-roledescription="Carrusel de testimonios"
      aria-label="Testimonios de vecinas y vecinos"
      tabIndex={0}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        dragX.current = null
        setPaused(false)
      }}
      className="relative w-full cursor-grab select-none overflow-hidden rounded-sm outline-none [touch-action:pan-y] focus-visible:ring-2 focus-visible:ring-accent/40 active:cursor-grabbing"
      style={{ height: 600 }}
    >
      {list.map((t, index) => {
        const position = list.length % 2 ? index - (list.length + 1) / 2 : index - list.length / 2
        return <Card key={t.tempId} t={t} onMove={handleMove} position={position} cardSize={cardSize} />
      })}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-3">
        <button type="button" onClick={() => handleMove(-1)} className={btnCls} aria-label="Testimonio anterior">
          <Chevron dir="left" />
        </button>
        <button type="button" onClick={() => handleMove(1)} className={btnCls} aria-label="Siguiente testimonio">
          <Chevron dir="right" />
        </button>
      </div>
    </div>
  )
}
