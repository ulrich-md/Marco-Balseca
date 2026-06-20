import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

export type HeroSlide = { src: string; alt: string; caption?: string }

type Props = {
  slides: HeroSlide[]
  /** ms entre fotos */
  interval?: number
  className?: string
}

/** webp + variante -sm a partir de la ruta .jpg/.png (mismas que ResponsiveImg). */
function sources(src: string) {
  const base = src.replace(/\.(jpg|jpeg|png)$/i, '')
  return { webp: `${base}.webp`, sm: `${base}-sm.webp` }
}

const EXPO = [0.16, 1, 0.3, 1] as const

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: '0%', opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
}

/**
 * Carrusel del hero: transición de DESLIZAMIENTO con punch (impacto visual),
 * Ken Burns, barra de progreso en accent y numerador 01/05. Autoplay rápido
 * y pausable; respeta prefers-reduced-motion (sin slide ni autoplay).
 */
export function HeroCarousel({ slides, interval = 2600, className = '' }: Props) {
  const reduce = useReducedMotion()
  const [[i, dir], setState] = useState<[number, number]>([0, 1])
  const [paused, setPaused] = useState(false)
  const len = slides.length

  const goTo = (next: number, d: number) => setState([(next + len) % len, d])
  const advance = () => setState(([p]) => [(p + 1) % len, 1])

  useEffect(() => {
    if (reduce || paused || len <= 1) return
    const id = window.setInterval(advance, interval)
    return () => window.clearInterval(id)
  }, [reduce, paused, len, interval])

  const active = slides[i]
  const s = sources(active.src)

  return (
    <div
      className={`group relative overflow-hidden bg-mist ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="group"
      aria-roledescription="carrusel"
      aria-label="Fotos de Marco Balseca con la comunidad"
    >
      <AnimatePresence initial={false} custom={dir}>
        <motion.div
          key={i}
          className="absolute inset-0"
          custom={dir}
          variants={reduce ? undefined : variants}
          initial={reduce ? false : 'enter'}
          animate={reduce ? {} : 'center'}
          exit={reduce ? undefined : 'exit'}
          transition={{ duration: 0.62, ease: EXPO }}
        >
          <motion.div
            className="h-full w-full"
            initial={reduce ? false : { scale: 1.14 }}
            animate={reduce ? {} : { scale: 1.0 }}
            transition={{ duration: interval / 1000 + 0.8, ease: 'easeOut' }}
          >
            <picture>
              <source
                type="image/webp"
                srcSet={`${s.sm} 760w, ${s.webp} 1200w`}
                sizes="(min-width: 1024px) 40vw, 92vw"
              />
              <img
                src={active.src}
                alt={active.alt}
                loading={i === 0 ? 'eager' : 'lazy'}
                decoding="async"
                className="h-full w-full object-cover"
              />
            </picture>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      {/* Degradado inferior para legibilidad */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-black/60 to-transparent" />

      {/* Numerador 01 / 05 (ref. ESPN) */}
      <div className="absolute right-3 top-3 z-20 flex items-baseline gap-1 bg-black/30 px-2 py-1 backdrop-blur-sm">
        <span className="font-display text-lg leading-none text-white">{String(i + 1).padStart(2, '0')}</span>
        <span className="eyebrow text-white/60">/ {String(len).padStart(2, '0')}</span>
      </div>

      {active.caption && (
        <span className="font-condensed absolute bottom-7 left-4 z-20 text-xl font-semibold text-white">
          {active.caption}
        </span>
      )}

      {/* Barra de progreso (accent) + puntos */}
      <div className="absolute inset-x-4 bottom-4 z-20 flex items-center gap-3">
        <div className="h-[3px] flex-1 overflow-hidden rounded-full bg-white/25">
          {!reduce && (
            <motion.div
              key={i}
              className="h-full bg-accent"
              initial={{ width: '0%' }}
              animate={{ width: paused ? '0%' : '100%' }}
              transition={{ duration: paused ? 0 : interval / 1000, ease: 'linear' }}
            />
          )}
        </div>
        <div className="flex gap-1.5">
          {slides.map((_, d) => (
            <button
              key={d}
              type="button"
              onClick={() => goTo(d, d > i ? 1 : -1)}
              aria-label={`Ver foto ${d + 1} de ${len}`}
              aria-current={d === i}
              className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
                d === i ? 'w-5 bg-white' : 'w-1.5 bg-white/50 hover:bg-white/80'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
