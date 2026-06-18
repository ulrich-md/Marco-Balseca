import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { RevealText } from '../../components/ui/RevealText'
import { ButtonLink } from '../../components/ui/Button'
import { ScrollIndicator } from '../../components/ui/ScrollIndicator'
import { PortraitPlaceholder } from '../../components/ui/PortraitPlaceholder'
import { useParallax } from '../../lib/useParallax'
import { SITE } from '../../data/site'

const HERO_INDEX = [
  { label: 'Historia', to: '/conoceme' },
  { label: 'Trayectoria', to: '/trayectoria' },
  { label: 'Acciones', to: '/acciones' },
  { label: 'Reels', to: '/reels' },
  { label: 'Agenda', to: '/agenda' },
]

export function Hero() {
  const reduce = useReducedMotion()
  const portraitRef = useParallax<HTMLDivElement>(50)
  const ghostRef = useParallax<HTMLDivElement>(-90)
  const year = new Date().getFullYear()

  const appear = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
        }

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-white text-ink">
      <h1 className="sr-only">
        Marco Balseca — Tiui Chikavak, vámonos recio. {SITE.ciudad}, {SITE.estado}.
      </h1>

      {/* Etiqueta vertical (ref. Yeezy "2016") */}
      <div className="pointer-events-none absolute left-5 top-1/2 hidden -translate-y-1/2 lg:block">
        <span className="vertical-rl eyebrow text-mute">
          {SITE.ciudad} · {year}
        </span>
      </div>

      {/* Índice vertical derecho (ref. ESPN) */}
      <nav
        className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-end gap-2.5 lg:flex"
        aria-label="Índice"
      >
        {HERO_INDEX.map((it) => (
          <Link key={it.to} to={it.to} className="eyebrow text-ink/55 transition-colors hover:text-guinda">
            {it.label}
          </Link>
        ))}
      </nav>

      <div className="container-x relative z-10 flex flex-1 flex-col justify-center pt-28 pb-10 lg:pt-32">
        {/* Eyebrow */}
        <motion.div {...appear(0)} className="flex items-center justify-center gap-4">
          <span className="eyebrow text-guinda">
            {SITE.ciudad} · {SITE.estado}
          </span>
          <span aria-hidden className="h-px w-8 bg-guinda" />
          <span className="eyebrow text-ink/55">Por nuestra tierra</span>
        </motion.div>

        {/* STAGE: TIUI (guinda, frente) · retrato B&N · CHIKAVAK (gris, fondo) */}
        <div className="relative mx-auto mt-5 w-full max-w-4xl">
          <div className="relative h-[60vh] max-h-[600px] min-h-[420px] w-full">
            {/* marco fino guinda (ref. Yeezy) */}
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-2 inset-y-0 z-30 border border-guinda/55 sm:inset-x-10"
            />

            {/* CHIKAVAK detrás (gris) — más ancho que el retrato, asoma a los lados */}
            <div ref={ghostRef} aria-hidden className="absolute inset-x-0 bottom-[14%] z-0 text-center">
              <span className="font-display text-[21vw] leading-none text-[#d2d2d2] md:text-[12.5vw]">
                Chikavak
              </span>
            </div>

            {/* Retrato B&N */}
            <div
              ref={portraitRef}
              className="absolute inset-x-0 bottom-0 z-10 mx-auto h-[84%] w-[min(72%,330px)]"
            >
              {/* REEMPLAZAR: retrato oficial recortado (B&N) de @marcobalseca1 */}
              <PortraitPlaceholder tone="grey" className="h-full w-full" note={false} />
            </div>

            {/* TIUI al frente (guinda) */}
            <div className="absolute inset-x-0 top-[2%] z-20 text-center">
              <RevealText
                as="span"
                text="Tiui"
                onMount
                stagger={0.05}
                className="font-display block text-[22vw] leading-none text-guinda md:text-[12vw]"
              />
            </div>
          </div>
        </div>

        {/* Apoyo con regla (ref. "By Kanye West") */}
        <motion.div {...appear(0.4)} className="mx-auto mt-7 flex w-full max-w-md items-center gap-4">
          <span aria-hidden className="h-px flex-1 bg-guinda/45" />
          <span className="font-condensed whitespace-nowrap text-base font-semibold uppercase tracking-[0.22em] text-ink">
            Vámonos recio
          </span>
          <span aria-hidden className="h-px flex-1 bg-guinda/45" />
        </motion.div>
        <motion.p {...appear(0.48)} className="mt-2 text-center text-xs uppercase tracking-[0.24em] text-mute">
          Náhuatl · Por nuestra gente
        </motion.p>

        {/* CTAs */}
        <motion.div {...appear(0.58)} className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <ButtonLink to="/contacto" tone="guinda" variant="solid">
            Súmate
          </ButtonLink>
          <ButtonLink to="/conoceme" tone="ink" variant="outline">
            Conoce su historia
          </ButtonLink>
        </motion.div>

        <div className="mt-10 flex justify-center lg:mt-12">
          <ScrollIndicator tone="guinda" />
        </div>
      </div>
    </section>
  )
}
