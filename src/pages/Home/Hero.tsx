import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { RevealText } from '../../components/ui/RevealText'
import { ButtonLink } from '../../components/ui/Button'
import { ScrollIndicator } from '../../components/ui/ScrollIndicator'
import { HeroVideo, type VideoPhoto } from '../../components/ui/HeroVideo'
import { LiveCounter } from '../../components/ui/LiveCounter'
import { CommunityAvatars } from '../../components/ui/CommunityAvatars'
import { InstagramIcon, FacebookIcon, XIcon } from '../../components/ui/Icons'
import { useParallax } from '../../lib/useParallax'
import { SITE, SOCIAL, JUNTAS_AUXILIARES, COLONIAS_RECORRIDAS } from '../../data/site'

const HERO_SOCIAL = [
  { Icon: InstagramIcon, ...SOCIAL.instagram },
  { Icon: FacebookIcon, ...SOCIAL.facebook },
  { Icon: XIcon, ...SOCIAL.x },
]

const INDEX = [
  { n: '01', label: 'Conóceme', to: '/conoceme' },
  { n: '02', label: 'Trayectoria', to: '/trayectoria' },
  { n: '03', label: 'Acciones', to: '/acciones' },
  { n: '04', label: 'Reels', to: '/reels' },
  { n: '05', label: 'Agenda', to: '/agenda' },
]

// Fotos REALES para el "video" principal del hero (montaje; usa el MP4 real
// si se sube a /assets/video/marco-reel.mp4).
const HERO_SLIDES: VideoPhoto[] = [
  { src: '/assets/portraits/marco-formal.jpg', alt: 'Marco Balseca, retrato' },
  { src: '/assets/comunidad/comunidad-familia.jpg', alt: 'Marco con las familias de Tehuacán' },
  { src: '/assets/comunidad/comunidad-mercado.jpg', alt: 'Marco en el mercado de Tehuacán' },
  { src: '/assets/comunidad/comunidad-cancha.jpg', alt: 'Marco en la cancha del barrio' },
  { src: '/assets/portraits/marco-corazon-fondo.jpg', alt: 'Marco con la comunidad' },
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
      {/* Textura editorial ESTÁTICA (sin animación, sin crema): malla de puntos
          concentrada en el área inferior-izquierda + retícula fina. Da interés
          al fondo sin competir con el nombre ni meter color. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(rgba(22,22,22,0.13) 1.2px, transparent 1.3px)',
            backgroundSize: '24px 24px',
            WebkitMaskImage: 'radial-gradient(58% 58% at 16% 82%, #000 0%, transparent 72%)',
            maskImage: 'radial-gradient(58% 58% at 16% 82%, #000 0%, transparent 72%)',
          }}
        />
        {/* Acento: bloque rojo fino tipo "+", sutil, abajo-izquierda */}
        <div
          className="absolute bottom-[16%] left-[2%] h-24 w-24 opacity-[0.6]"
          style={{
            backgroundImage:
              'linear-gradient(var(--color-accent) 2px, transparent 2px), linear-gradient(90deg, var(--color-accent) 2px, transparent 2px)',
            backgroundSize: '24px 24px',
            WebkitMaskImage: 'linear-gradient(135deg, #000, transparent 75%)',
            maskImage: 'linear-gradient(135deg, #000, transparent 75%)',
          }}
        />
      </div>

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

      <div className="container-x relative z-10 pt-20 lg:pt-16">
        {/* Meta superior (mono) */}
        <motion.div {...appear(0)} className="flex items-center justify-between border-b border-ink/15 pb-4">
          <span className="eyebrow text-accent">Marco Balseca</span>
          <span className="eyebrow text-mute">
            {SITE.ciudad}, {SITE.estado} · {year}
          </span>
        </motion.div>

        {/* Titular gigante — el NOMBRE es el héroe */}
        <div className="relative mt-5 lg:mt-4">
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

        {/* Fila inferior. En MÓVIL el orden DOM es copy/CTA → contador → video →
            prensa. En desktop, el placement explícito apila copy/contador/prensa
            en la columna izquierda y el video (span 3 filas) a la derecha. */}
        <div className="mt-6 grid items-start lg:mt-0 lg:grid-cols-[1fr_0.78fr] lg:gap-x-12">
          {/* A — copy + CTA + redes */}
          <div className="lg:col-start-1 lg:row-start-1 lg:pl-[9vw] lg:pt-4">
            <motion.p {...appear(0.45)} className="max-w-xl text-lg text-ink/75 md:text-xl">
              Soy abogado y emprendedor de Tehuacán, hoy delegado de Gobernación de la microrregión
              25. {SITE.tagline} Acciones de comunidad, todos los días.
            </motion.p>

            <motion.div {...appear(0.55)} className="mt-7">
              <div className="flex flex-wrap items-center gap-3">
                <ButtonLink to="/contacto" tone="accent" variant="solid">
                  Súmate
                </ButtonLink>
                <ButtonLink to="/conoceme" tone="ink" variant="outline">
                  Conoce a Marco
                </ButtonLink>
              </div>
              <div className="mt-5 flex items-center gap-3">
                <span className="eyebrow text-mute">Sígueme</span>
                <div className="flex items-center gap-2">
                  {HERO_SOCIAL.map(({ Icon, label, url }) => (
                    <a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-colors hover:border-accent hover:text-accent"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* B1 — contador + cifras (en móvil va ANTES del video) */}
          <div className="lg:col-start-1 lg:row-start-2 lg:pl-[9vw]">
            <motion.div {...appear(0.6)} className="mt-9 border-t border-ink/15 pt-6">
              <div className="flex items-center gap-4">
                <CommunityAvatars />
                <LiveCounter />
              </div>

              <div className="mt-6 flex flex-wrap gap-x-8 gap-y-4">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                  <span className="font-display text-2xl leading-none text-ink">
                    +{COLONIAS_RECORRIDAS}
                  </span>
                  <span className="text-sm text-ink/60">colonias recorridas</span>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
                  <span className="font-display text-2xl leading-none text-ink">
                    {JUNTAS_AUXILIARES}
                  </span>
                  <span className="text-sm text-ink/60">juntas auxiliares de Tehuacán</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Media principal: VIDEO. En móvil va tras el contador. */}
          <div
            ref={photoRef}
            className="relative mt-8 lg:col-start-2 lg:row-start-1 lg:row-span-3 lg:mt-0 lg:-mt-[17vw]"
          >
            <HeroVideo
              photos={HERO_SLIDES}
              caption="En territorio · Tehuacán, Puebla"
              videoSrc={{ mp4: '/assets/video/marco-reel.mp4', webm: '/assets/video/marco-reel.webm' }}
              poster="/assets/portraits/marco-formal.jpg"
              className="aspect-[4/5] w-full shadow-[0_30px_60px_-25px_rgba(0,0,0,0.5)]"
            />
            {/* marco accent fino (ref. Yeezy) */}
            <span aria-hidden className="pointer-events-none absolute inset-3 z-20 border border-accent md:inset-4" />
          </div>

          {/* B2 — prensa (en móvil va tras el video) */}
          <div className="lg:col-start-1 lg:row-start-3 lg:pl-[9vw]">
            <motion.div {...appear(0.75)} className="mt-8 border-t border-ink/15 pt-6">
              <span className="eyebrow text-mute">En la prensa</span>
              <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1.5">
                {['Municipios Puebla', 'Diario Primera Línea', 'Gobierno de Tehuacán'].map(
                  (fuente, idx) => (
                    <span key={fuente} className="flex items-center gap-3">
                      {idx > 0 && <span aria-hidden className="h-1 w-1 rounded-full bg-ink/30" />}
                      <span className="font-condensed text-sm font-semibold uppercase tracking-wide text-ink/70">
                        {fuente}
                      </span>
                    </span>
                  ),
                )}
              </div>
              <a
                href="https://municipiospuebla.mx/nota/tehuacan/realizan-en-tehuacan-campana-de-canje-voluntario-de-armas"
                target="_blank"
                rel="noreferrer"
                className="group mt-3 inline-flex max-w-md items-start gap-2 text-ink transition-colors hover:text-accent"
              >
                <span aria-hidden className="mt-2 h-px w-6 shrink-0 bg-accent transition-all duration-300 group-hover:w-9" />
                <span className="font-condensed text-base font-medium leading-snug">
                  «Sí al desarme, sí a la paz»: encabezo el canje voluntario de armas en Tehuacán →
                </span>
              </a>
            </motion.div>
          </div>
        </div>

        <div className="flex justify-center py-10 lg:justify-start">
          <ScrollIndicator tone="accent" />
        </div>
      </div>
    </section>
  )
}
