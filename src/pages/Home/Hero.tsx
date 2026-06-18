import { motion, useReducedMotion } from 'framer-motion'
import { RevealText } from '../../components/ui/RevealText'
import { ButtonLink } from '../../components/ui/Button'
import { ScrollIndicator } from '../../components/ui/ScrollIndicator'
import { PortraitPlaceholder } from '../../components/ui/PortraitPlaceholder'
import { useParallax } from '../../lib/useParallax'
import { SITE, SOCIAL } from '../../data/site'

export function Hero() {
  const reduce = useReducedMotion()
  const portraitRef = useParallax<HTMLDivElement>(70)
  const ghostRef = useParallax<HTMLDivElement>(-120)

  const appear = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
        }

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden bg-bone text-ink">
      {/* halo guinda muy suave (calidez, no agresivo) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[18%] -top-[24%] h-[78%] w-[70%] rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(110,34,51,0.07), transparent)' }}
      />
      {/* franja de acento superior */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-guinda" />

      {/* Lema fantasma de fondo (parallax) */}
      <div
        ref={ghostRef}
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[32%] z-0 select-none text-center"
      >
        <span className="font-display text-[34vw] leading-none text-guinda/[0.05]">RECIO</span>
      </div>

      {/* Retrato sobre bloque guinda: absoluto a la derecha en desktop */}
      <div className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[44%] py-24 pr-6 lg:block xl:w-[42%]">
        <div ref={portraitRef} className="h-full w-full">
          {/* REEMPLAZAR: retrato oficial recortado de @marcobalseca1 */}
          <PortraitPlaceholder className="h-full w-full" tone="guinda" rounded="rounded-[2rem]" />
        </div>
      </div>

      {/* Contenido */}
      <div className="container-x relative z-10 flex flex-1 flex-col justify-center pt-28 pb-10 lg:pt-32">
        {/* Eyebrows tipo índice */}
        <motion.div {...appear(0)} className="flex flex-wrap items-center gap-x-5 gap-y-2">
          <span className="eyebrow text-guinda">
            {SITE.ciudad} · {SITE.estado}
          </span>
          <span aria-hidden className="h-px w-8 bg-guinda/40" />
          <span className="eyebrow text-ink/55">Por nuestra tierra</span>
        </motion.div>

        {/* LEMA — protagonista (outline + sólido), en guinda sobre claro */}
        <h1 className="mt-6 text-guinda lg:mt-8">
          <span className="sr-only">
            {SITE.lema.nahuatl} — {SITE.lema.es} ({SITE.lema.lang})
          </span>
          <RevealText
            as="span"
            text="Tiui"
            onMount
            stagger={0.04}
            className="font-display block text-[26vw] leading-[0.82] sm:text-[22vw] lg:text-[13vw] xl:text-[12.5vw]"
          />
          <RevealText
            as="span"
            text="Chikavak"
            onMount
            delay={0.18}
            stagger={0.03}
            wordClassName="text-outline"
            className="font-display block text-[26vw] leading-[0.82] sm:text-[22vw] lg:text-[13vw] xl:text-[12.5vw]"
          />
        </h1>

        {/* Apoyo */}
        <motion.div {...appear(0.5)} className="mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <p className="font-condensed text-2xl font-semibold uppercase tracking-wide text-ink md:text-3xl">
            Vámonos recio
          </p>
          <span className="text-sm text-mute">({SITE.lema.lang})</span>
        </motion.div>

        {/* CTAs */}
        <motion.div {...appear(0.62)} className="mt-9 flex flex-wrap items-center gap-4">
          <ButtonLink to="/contacto" tone="guinda" variant="solid">
            Súmate
          </ButtonLink>
          <ButtonLink to="/conoceme" tone="guinda" variant="outline">
            Conoce su historia
          </ButtonLink>
        </motion.div>

        {/* Barra inferior (desktop) */}
        <div className="mt-12 hidden items-center justify-between lg:flex">
          <ScrollIndicator tone="guinda" />
          <a
            href={SOCIAL.instagram.url}
            target="_blank"
            rel="noreferrer"
            className="eyebrow text-ink/55 transition-colors hover:text-guinda"
          >
            {SOCIAL.instagram.handle}
          </a>
        </div>
      </div>

      {/* Retrato en flujo (móvil/tablet) */}
      <div className="relative z-10 px-5 pb-6 lg:hidden">
        <PortraitPlaceholder className="h-[46vh] w-full" tone="guinda" rounded="rounded-[1.75rem]" />
      </div>
    </section>
  )
}
