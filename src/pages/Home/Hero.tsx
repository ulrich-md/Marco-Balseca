import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { RevealText } from '../../components/ui/RevealText'
import { ButtonLink } from '../../components/ui/Button'
import { ScrollIndicator } from '../../components/ui/ScrollIndicator'
import { HeroCarousel, type HeroSlide } from '../../components/ui/HeroCarousel'
import { LiveCounter } from '../../components/ui/LiveCounter'
import { useParallax } from '../../lib/useParallax'
import { SITE, JUNTAS_AUXILIARES, COLONIAS_RECORRIDAS } from '../../data/site'

const INDEX = [
  { n: '01', label: 'Conóceme', to: '/conoceme' },
  { n: '02', label: 'Trayectoria', to: '/trayectoria' },
  { n: '03', label: 'Acciones', to: '/acciones' },
  { n: '04', label: 'Reels', to: '/reels' },
  { n: '05', label: 'Agenda', to: '/agenda' },
]

// Carrusel del hero: fotos REALES a color (retrato + momentos con la gente).
const HERO_SLIDES: HeroSlide[] = [
  { src: '/assets/portraits/marco-formal.jpg', alt: 'Marco Balseca, retrato', caption: 'Marco Balseca' },
  { src: '/assets/comunidad/comunidad-familia.jpg', alt: 'Marco con las familias de Tehuacán', caption: 'Con las familias' },
  { src: '/assets/comunidad/comunidad-mercado.jpg', alt: 'Marco en el mercado de Tehuacán', caption: 'En el mercado' },
  { src: '/assets/comunidad/comunidad-cancha.jpg', alt: 'Marco en la cancha del barrio', caption: 'En la cancha' },
  { src: '/assets/portraits/marco-corazon-fondo.jpg', alt: 'Marco con la comunidad', caption: 'Con la gente' },
]

export function Hero() {
  const reduce = useReducedMotion()
  const photoRef = useParallax<HTMLDivElement>(36)
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
    <section className="relative overflow-hidden bg-white text-ink">
      {/* Índice vertical derecho (ref. ESPN) */}
      <nav
        className="absolute right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-3 xl:flex"
        aria-label="Secciones"
      >
        {INDEX.map((it) => (
          <Link key={it.to} to={it.to} className="group flex items-center gap-2">
            <span className="eyebrow text-mute transition-colors group-hover:text-accent">{it.n}</span>
            <span className="eyebrow text-ink transition-colors group-hover:text-accent">{it.label}</span>
          </Link>
        ))}
      </nav>

      <div className="container-x relative z-10 pt-28 lg:pt-32">
        {/* Meta superior (mono) */}
        <motion.div {...appear(0)} className="flex items-center justify-between border-b border-ink/15 pb-4">
          <span className="eyebrow text-accent">Marco Balseca</span>
          <span className="eyebrow text-mute">
            {SITE.ciudad}, {SITE.estado} · {year}
          </span>
        </motion.div>

        {/* Titular gigante — el NOMBRE es el héroe */}
        <div className="relative mt-8 lg:mt-10">
          {/* Acento rojo vertical (ref. ESPN) */}
          <span
            aria-hidden
            className="font-display pointer-events-none absolute -left-1 top-1 z-0 hidden select-none text-[7vw] leading-none text-accent lg:block"
            style={{ writingMode: 'vertical-rl' }}
          >
            TEHUACÁN
          </span>
          <h1 className="relative z-20 lg:pl-[9vw]">
            <RevealText
              as="span"
              text="Marco"
              onMount
              stagger={0.05}
              className="font-display block text-[20vw] leading-[0.82] text-ink sm:text-[18vw] lg:text-[12vw]"
            />
            <RevealText
              as="span"
              text="Balseca"
              onMount
              delay={0.12}
              stagger={0.04}
              className="font-display block text-[20vw] leading-[0.82] text-ink sm:text-[18vw] lg:text-[12vw]"
            />
          </h1>
        </div>

        {/* Fila inferior: copy/CTA/comunidad (izq) + carrusel (der) */}
        <div className="mt-8 grid items-start gap-10 lg:mt-6 lg:grid-cols-[1fr_0.78fr] lg:gap-12">
          <div className="lg:pl-[9vw] lg:pt-4">
            <motion.p {...appear(0.45)} className="max-w-xl text-lg text-ink/75 md:text-xl">
              Soy abogado y emprendedor de Tehuacán, hoy delegado de Gobernación de la microrregión
              25. {SITE.tagline} Acciones de comunidad, todos los días.
            </motion.p>

            <motion.div {...appear(0.55)} className="mt-7 flex flex-wrap items-center gap-4">
              <ButtonLink to="/contacto" tone="accent" variant="solid">
                Súmate
              </ButtonLink>
              <ButtonLink to="/conoceme" tone="ink" variant="outline">
                Conoce a Marco
              </ButtonLink>
            </motion.div>

            {/* Comunidad: avatares + contador EN VIVO + cifras territoriales */}
            <motion.div {...appear(0.65)} className="mt-9 border-t border-ink/15 pt-6">
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3" aria-hidden>
                  {[0, 1, 2, 3].map((i) => (
                    <span
                      key={i}
                      className="h-10 w-10 rounded-full border-2 border-white bg-gradient-to-b from-[#d9d9d9] to-[#b8b8b8]"
                    />
                  ))}
                  <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-accent text-xs font-bold text-white">
                    +
                  </span>
                </div>
                <LiveCounter />
              </div>

              <div className="mt-6 flex flex-wrap gap-x-9 gap-y-3">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-2xl leading-none text-ink">
                    +{COLONIAS_RECORRIDAS}
                  </span>
                  <span className="text-sm text-ink/60">colonias recorridas</span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-2xl leading-none text-ink">
                    {JUNTAS_AUXILIARES}
                  </span>
                  <span className="text-sm text-ink/60">juntas auxiliares de Tehuacán</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Carrusel de fotos reales (crossfade + Ken Burns), con parallax sutil */}
          <div ref={photoRef} className="relative lg:-mt-[7vw]">
            <HeroCarousel
              slides={HERO_SLIDES}
              className="aspect-[4/5] w-full rounded-sm shadow-[0_30px_60px_-25px_rgba(0,0,0,0.5)]"
            />
            {/* marco accent fino (ref. Yeezy) */}
            <span aria-hidden className="pointer-events-none absolute inset-3 z-20 border border-accent md:inset-4" />
            <span className="eyebrow absolute -bottom-3 left-3 z-30 bg-white px-2 py-1 text-mute">
              Tehuacán, Puebla
            </span>
          </div>
        </div>

        <div className="flex justify-center py-10 lg:justify-start">
          <ScrollIndicator tone="accent" />
        </div>
      </div>
    </section>
  )
}
