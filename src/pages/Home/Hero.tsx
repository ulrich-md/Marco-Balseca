import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { RevealText } from '../../components/ui/RevealText'
import { ButtonLink } from '../../components/ui/Button'
import { ScrollIndicator } from '../../components/ui/ScrollIndicator'
import { HeroVideo, type VideoPhoto } from '../../components/ui/HeroVideo'
import { LiveCounter } from '../../components/ui/LiveCounter'
import { CommunityAvatars } from '../../components/ui/CommunityAvatars'
import { InstagramIcon, FacebookIcon, XIcon } from '../../components/ui/Icons'
import { PrehispanicField } from '../../components/ui/PrehispanicField'
import { useParallax } from '../../lib/useParallax'
import { SOCIAL, JUNTAS_AUXILIARES, COLONIAS_RECORRIDAS } from '../../data/site'

const HERO_SOCIAL = [
  { Icon: InstagramIcon, ...SOCIAL.instagram },
  { Icon: FacebookIcon, ...SOCIAL.facebook },
  { Icon: XIcon, ...SOCIAL.x },
]

const INDEX = [
  { n: '01', label: 'Conóceme', to: '/conoceme' },
  { n: '02', label: 'Trayectoria', to: '/trayectoria' },
  { n: '03', label: 'Testimonios', to: '/testimonios' },
  { n: '04', label: 'Reels', to: '/reels' },
  { n: '05', label: 'Agenda', to: '/agenda' },
  { n: '06', label: 'Contacto', to: '/contacto' },
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

  // Micro-interacción: la foto se inclina en 3D siguiendo el mouse (solo
  // transform + springs = fluido; se desactiva con reduced-motion).
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const spring = { stiffness: 140, damping: 18, mass: 0.4 }
  const rotY = useSpring(useTransform(px, [-0.5, 0.5], [-7, 7]), spring)
  const rotX = useSpring(useTransform(py, [-0.5, 0.5], [5, -5]), spring)
  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width - 0.5)
    py.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    px.set(0)
    py.set(0)
  }

  const appear = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
        }

  return (
    <section onMouseMove={onMove} onMouseLeave={onLeave} className="relative overflow-hidden bg-white text-ink">
      {/* Fondo BLANCO editorial. Glow guinda muy sutil en la esquina superior
          izquierda (calidez, no ruido) + símbolos prehispánicos confinados a la
          zona del nombre, difuminándose antes del cuerpo y del teléfono. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(58% 55% at 6% -2%, rgba(155,34,71,0.06), transparent 58%)' }}
        />
        <PrehispanicField opacity={0.26} />
      </div>

      {/* Índice vertical derecho (ref. ESPN) */}
      <nav
        className="absolute right-5 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-3 xl:flex"
        aria-label="Secciones"
      >
        {INDEX.map((it) => (
          <Link key={it.to} to={it.to} className="group flex items-center gap-2">
            <span aria-hidden className="h-px w-0 bg-accent transition-all duration-300 group-hover:w-5" />
            <span className="eyebrow text-mute transition-colors group-hover:text-accent">{it.n}</span>
            <span className="eyebrow text-ink transition-all duration-300 group-hover:-translate-x-0.5 group-hover:text-accent">
              {it.label}
            </span>
          </Link>
        ))}
      </nav>

      <div className="container-x relative z-10 pt-28 lg:pt-32">
        {/* Titular gigante — MARCO en guinda, BALSECA en tinta; el nombre pasa
            POR DETRÁS del teléfono (capas = profundidad, ref. póster editorial) */}
        <div className="relative">
          <h1 className="relative z-10">
            <RevealText
              as="span"
              text="Marco"
              onMount
              stagger={0.05}
              className="font-display block text-[19vw] leading-[0.8] text-accent sm:text-[16vw] lg:text-[12.5vw]"
            />
            <RevealText
              as="span"
              text="Balseca"
              onMount
              delay={0.12}
              stagger={0.04}
              className="font-display block text-[19vw] leading-[0.8] text-ink sm:text-[16vw] lg:text-[12.5vw]"
            />
          </h1>
          {/* Cargo completo, pegado al nombre */}
          <motion.p
            {...appear(0.35)}
            className="relative z-10 mt-5 flex max-w-xl items-start gap-3 lg:mt-6"
          >
            <span aria-hidden className="mt-[0.55em] h-[3px] w-10 shrink-0 bg-accent" />
            <span className="font-condensed text-base font-semibold uppercase leading-snug tracking-[0.08em] text-accent md:text-lg">
              Delegado de Gobernación del Estado de Puebla · Microrregión 25
            </span>
          </motion.p>
        </div>

        {/* Fila inferior. En MÓVIL el orden DOM es copy/CTA → contador → video →
            prensa. En desktop, el placement explícito apila copy/contador/prensa
            en la columna izquierda y el video (span 3 filas) a la derecha. */}
        <div className="mt-6 grid items-start lg:mt-0 lg:grid-cols-[1fr_0.78fr] lg:gap-x-12">
          {/* A — copy + CTA + redes */}
          <div className="lg:col-start-1 lg:row-start-1 lg:pt-4">
            <motion.p {...appear(0.45)} className="max-w-xl text-lg text-ink/75 md:text-xl">
              Soy abogado y maestro en Administración. Empecé en esto a los 15 años y llevo 30 en
              la vida pública, siempre con la misma idea: la política se hace en territorio, cara a
              cara, todos los días.
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
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/15 text-ink/70 transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:border-accent hover:text-accent"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* B1 — contador + cifras (en móvil va ANTES del video) */}
          <div className="lg:col-start-1 lg:row-start-2">
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

          {/* Media principal: VIDEO en pantalla de teléfono. En móvil va tras el
              contador; en desktop sube y se TRASLAPA con el nombre (z-20 sobre
              el h1), con rotación sutil y halo guinda detrás = capas y energía. */}
          <div
            ref={photoRef}
            className="relative z-20 mt-8 lg:col-start-2 lg:row-start-1 lg:row-span-3 lg:mt-[max(-24vw,-320px)]"
          >
            {/* Halo orgánico guinda (color + profundidad detrás del teléfono) */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[130%] w-[150%] -translate-x-1/2 -translate-y-1/2"
              style={{
                background:
                  'radial-gradient(48% 42% at 50% 46%, rgba(155,34,71,0.20), rgba(155,34,71,0.07) 60%, transparent 75%)',
              }}
            />
            <motion.div
              className="relative mx-auto w-full max-w-[300px] rotate-2 lg:max-w-[390px] lg:rotate-3"
              style={{ rotateX: reduce ? 0 : rotX, rotateY: reduce ? 0 : rotY, transformPerspective: 1000 }}
            >
              {/* Carcasa del teléfono (bezel + botones + dynamic island) */}
              <div className="relative rounded-[2.7rem] bg-black p-2.5 shadow-[0_35px_70px_-25px_rgba(0,0,0,0.55)] ring-1 ring-black/20">
                <span aria-hidden className="absolute -left-[3px] top-24 h-9 w-[3px] rounded-l-sm bg-black" />
                <span aria-hidden className="absolute -left-[3px] top-36 h-14 w-[3px] rounded-l-sm bg-black" />
                <span aria-hidden className="absolute -right-[3px] top-28 h-16 w-[3px] rounded-r-sm bg-black" />
                <div className="relative overflow-hidden rounded-[2.1rem]">
                  {/* Montaje de fotos reales (no hay MP4 todavía). Para activar un
                      video real, vuelve a pasar videoSrc={{ mp4, webm }} con el
                      archivo subido a /assets/video/. */}
                  <HeroVideo
                    photos={HERO_SLIDES}
                    caption="En territorio · Tehuacán, Puebla"
                    poster="/assets/portraits/marco-formal.jpg"
                    className="aspect-[9/19] w-full"
                  />
                  {/* dynamic island */}
                  <span aria-hidden className="absolute left-1/2 top-2.5 z-30 h-[22px] w-24 -translate-x-1/2 rounded-full bg-black" />
                </div>
              </div>

              {/* Badge circular giratorio (detalle vivo; pausa con reduced-motion).
                  El anillo de texto gira; la flecha del centro queda fija. */}
              <div className="absolute -bottom-8 -left-10 h-28 w-28 drop-shadow-[0_10px_25px_rgba(0,0,0,0.18)] lg:-left-14">
                <svg
                  viewBox="0 0 100 100"
                  className="h-full w-full animate-[spin_18s_linear_infinite] motion-reduce:animate-none"
                  aria-hidden
                >
                  <defs>
                    <path id="mb-circ" d="M 50,50 m -37,0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                  </defs>
                  <circle cx="50" cy="50" r="49" className="fill-white" />
                  <circle cx="50" cy="50" r="49" fill="none" stroke="rgba(22,22,22,0.12)" />
                  <text className="fill-accent font-condensed" style={{ fontSize: '10.5px', letterSpacing: '0.16em', fontWeight: 600 }}>
                    <textPath href="#mb-circ" textLength="230">
                      CERCA DE LA GENTE · POR NUESTRA TIERRA ·
                    </textPath>
                  </text>
                </svg>
                <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden>
                  <path
                    d="M43 50 L57 50 M51 44 L57 50 L51 56"
                    stroke="var(--color-accent)"
                    strokeWidth="2.4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </motion.div>
          </div>

          {/* B2 — prensa (en móvil va tras el video) */}
          <div className="lg:col-start-1 lg:row-start-3">
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
