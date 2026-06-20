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

/**
 * Carrusel del hero: crossfade + Ken Burns (zoom lento) entre fotos REALES.
 * Puntos de control, autoplay pausable, y respeto a prefers-reduced-motion
 * (sin autoplay ni zoom; muestra la primera foto). Da vida sin distraer.
 */
export function HeroCarousel({ slides, interval = 4200, className = '' }: Props) {
  const reduce = useReducedMotion()
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)

  useEffect(() => {
    if (reduce || paused || slides.length <= 1) return
    const id = window.setInterval(() => setI((p) => (p + 1) % slides.length), interval)
    return () => window.clearInterval(id)
  }, [reduce, paused, slides.length, interval])

  const active = slides[i]
  const s = sources(active.src)

  return (
    <div
      className={`relative overflow-hidden bg-mist ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="group"
      aria-roledescription="carrusel"
      aria-label="Fotos de Marco Balseca con la comunidad"
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={i}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div
            className="h-full w-full"
            initial={reduce ? false : { scale: 1.001 }}
            animate={reduce ? {} : { scale: 1.09 }}
            transition={{ duration: interval / 1000 + 1.2, ease: 'linear' }}
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

      {/* Degradado inferior para legibilidad del pie + puntos */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 to-transparent" />

      {active.caption && (
        <span className="eyebrow absolute bottom-9 left-4 z-20 text-white">{active.caption}</span>
      )}

      {/* Puntos de control */}
      <div className="absolute bottom-3.5 left-4 z-20 flex gap-1.5">
        {slides.map((_, d) => (
          <button
            key={d}
            type="button"
            onClick={() => setI(d)}
            aria-label={`Ver foto ${d + 1} de ${slides.length}`}
            aria-current={d === i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              d === i ? 'w-7 bg-accent' : 'w-1.5 bg-white/70 hover:bg-white'
            }`}
          />
        ))}
      </div>
    </div>
  )
}
