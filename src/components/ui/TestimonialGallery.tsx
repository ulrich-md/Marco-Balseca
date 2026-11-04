import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Testimonio } from '../../data/testimonios'

/* =========================================================================
   GALERÍA DE TESTIMONIOS — tarjetas flotantes "en la pared" (ref. galería
   de historias): cada voz es una tarjeta blanca con nombre y lugar arriba,
   la cita, y la foto del lugar fundiéndose desde abajo. Aura de color
   (guinda / dorado) detrás de cada tarjeta, avatar circular con iniciales.
   Pista horizontal con snap: arrastre con mouse, swipe, flechas y teclado.
   Foto por tarjeta: /assets/generated/testimonios/<id>.webp (lugar generado,
   sin personas) y, si no existe, una foto REAL en territorio.
   ========================================================================= */

const FALLBACKS = [
  '/assets/comunidad/comunidad-mercado.webp',
  '/assets/acciones/accion-deporte-voleibol.webp',
  '/assets/acciones/accion-educacion.webp',
  '/assets/comunidad/comunidad-visita.webp',
  '/assets/comunidad/comunidad-cancha.webp',
  '/assets/acciones/accion-obra-cancha.webp',
]

// Auras alternadas (identidad: guinda + dorado institucional)
const AURAS = [
  { glow: 'rgba(113,25,36,0.42)', avatar: 'from-accent to-accent-soft' },
  { glow: 'rgba(165,127,44,0.35)', avatar: 'from-gold to-[#c9a75a]' },
  { glow: 'rgba(148,48,60,0.38)', avatar: 'from-accent-deep to-accent' },
  { glow: 'rgba(230,209,148,0.6)', avatar: 'from-[#8a6a22] to-gold' },
]

function initials(nombre: string) {
  return nombre
    .replace(/^(Don|Doña|Sr\.|Sra\.)\s+/i, '')
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}

function Card({ t, i }: { t: Testimonio; i: number }) {
  const aura = AURAS[i % AURAS.length]
  const fallback = FALLBACKS[i % FALLBACKS.length]
  const [img, setImg] = useState(`/assets/generated/testimonios/${t.id}.webp`)
  const sub = [t.rol, t.lugar].filter(Boolean).join(' · ')

  return (
    <article
      className="group relative h-[460px] w-[78vw] max-w-[320px] sm:w-[300px] lg:w-[320px]"
      aria-roledescription="tarjeta"
    >
      {/* Aura de color (sombra difusa tintada, como la referencia) */}
      <div
        aria-hidden
        className="absolute inset-x-0 -bottom-12 top-24 rounded-[45%] opacity-90 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: aura.glow }}
      />
      <div className="relative flex h-full flex-col overflow-hidden rounded-md bg-white shadow-[0_30px_60px_-28px_rgba(22,22,22,0.35)] ring-1 ring-ink/5 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-2">
        <header className="px-7 pt-8 text-center">
          <h3 className="font-condensed text-2xl font-semibold leading-tight text-ink">{t.nombre}</h3>
          {sub && <p className="mt-1 text-sm leading-snug text-ink/60">{sub}</p>}
        </header>
        <blockquote className="relative z-10 mt-5 px-7 text-center text-[15px] leading-relaxed text-ink/80">
          “{t.texto}”
        </blockquote>

        {/* Foto del lugar, fundiéndose en el blanco desde arriba */}
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[44%]"
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, #000 45%)',
            maskImage: 'linear-gradient(to bottom, transparent 0%, #000 45%)',
          }}
        >
          <img
            src={img}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
            onError={(e) => {
              if (img !== fallback) setImg(fallback)
              else e.currentTarget.style.display = 'none'
            }}
          />
        </div>

        {/* Avatar */}
        <div className="absolute bottom-5 left-5 z-10">
          {t.foto ? (
            <img
              src={t.foto}
              alt=""
              className="h-11 w-11 rounded-full object-cover ring-2 ring-white"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <span
              aria-hidden
              className={`font-condensed grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br text-sm font-bold text-white ring-2 ring-white ${aura.avatar}`}
            >
              {initials(t.nombre)}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}

export function TestimonialGallery({ items }: { items: Testimonio[] }) {
  const reduce = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)
  const drag = useRef({ down: false, x: 0, left: 0, moved: false })
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  const update = useCallback(() => {
    const el = trackRef.current
    if (!el) return
    setAtStart(el.scrollLeft < 8)
    setAtEnd(el.scrollLeft + el.clientWidth > el.scrollWidth - 8)
  }, [])

  useEffect(() => {
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [update, items.length])

  const step = (dir: number) => {
    const el = trackRef.current
    if (!el) return
    const card = el.querySelector('article')
    const w = card ? card.getBoundingClientRect().width + 48 : 360
    el.scrollBy({ left: dir * w, behavior: reduce ? 'auto' : 'smooth' })
  }

  // Arrastre con mouse (en touch, el scroll nativo ya hace swipe)
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse' || !trackRef.current) return
    drag.current = { down: true, x: e.clientX, left: trackRef.current.scrollLeft, moved: false }
  }
  const onPointerMove = (e: React.PointerEvent) => {
    const el = trackRef.current
    if (!drag.current.down || !el) return
    const dx = e.clientX - drag.current.x
    if (Math.abs(dx) > 4) {
      drag.current.moved = true
      el.style.scrollSnapType = 'none'
    }
    el.scrollLeft = drag.current.left - dx
  }
  const endDrag = () => {
    const el = trackRef.current
    if (!drag.current.down || !el) return
    drag.current.down = false
    el.style.scrollSnapType = ''
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        role="region"
        aria-label="Testimonios"
        tabIndex={0}
        onScroll={update}
        onKeyDown={(e) => {
          if (e.key === 'ArrowRight') step(1)
          if (e.key === 'ArrowLeft') step(-1)
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className="flex cursor-grab snap-x snap-mandatory gap-12 overflow-x-auto pb-20 pt-6 outline-none [-ms-overflow-style:none] [scrollbar-width:none] active:cursor-grabbing lg:gap-14 [&::-webkit-scrollbar]:hidden"
        style={{
          paddingInline: 'max(1.25rem, calc((100vw - 88rem) / 2 + 3.5rem))',
          scrollPaddingInline: 'max(1.25rem, calc((100vw - 88rem) / 2 + 3.5rem))',
        }}
      >
        {items.map((t, i) => (
          <motion.div
            key={t.id}
            className="shrink-0 snap-start"
            initial={reduce ? false : { opacity: 0, y: 40 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -10% 0px' }}
            transition={{ duration: 0.7, delay: (i % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card t={t} i={i} />
          </motion.div>
        ))}
      </div>

      {/* Controles */}
      <div className="container-x flex items-center justify-end gap-2">
        <button
          type="button"
          aria-label="Testimonio anterior"
          onClick={() => step(-1)}
          disabled={atStart}
          className="grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-ink/15 bg-white text-lg text-ink transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-white disabled:cursor-default disabled:opacity-35 disabled:hover:border-ink/15 disabled:hover:bg-white disabled:hover:text-ink"
        >
          ←
        </button>
        <button
          type="button"
          aria-label="Testimonio siguiente"
          onClick={() => step(1)}
          disabled={atEnd}
          className="grid h-12 w-12 cursor-pointer place-items-center rounded-full border border-ink/15 bg-white text-lg text-ink transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-white disabled:cursor-default disabled:opacity-35 disabled:hover:border-ink/15 disabled:hover:bg-white disabled:hover:text-ink"
        >
          →
        </button>
      </div>
    </div>
  )
}
