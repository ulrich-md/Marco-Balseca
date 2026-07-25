import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { RevealText } from '../../components/ui/RevealText'
import { ButtonLink } from '../../components/ui/Button'
import { ScrollIndicator } from '../../components/ui/ScrollIndicator'
import { HeroVideo, type VideoPhoto } from '../../components/ui/HeroVideo'
import { LiveCounter } from '../../components/ui/LiveCounter'
import { CommunityAvatars } from '../../components/ui/CommunityAvatars'
import { InstagramIcon, FacebookIcon, XIcon } from '../../components/ui/Icons'
import { PrehispanicField } from '../../components/ui/PrehispanicField'
import { OrganicShapes } from '../../components/ui/OrganicShapes'
import { useParallax } from '../../lib/useParallax'
import { SOCIAL } from '../../data/site'

const HERO_SOCIAL = [
  { Icon: InstagramIcon, ...SOCIAL.instagram },
  { Icon: FacebookIcon, ...SOCIAL.facebook },
  { Icon: XIcon, ...SOCIAL.x },
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
          style={{ background: 'radial-gradient(58% 55% at 6% -2%, rgba(113,25,36,0.06), transparent 58%)' }}
        />
        <PrehispanicField opacity={0.26} />
      </div>

      {/* Panel guinda con FORMAS ORGÁNICAS a la MITAD DERECHA (detrás del
          teléfono), con BORDE CURVO — mismo lenguaje que la sección "Honestidad,
          trabajo y amor a Tehuacán". Solo desktop; el lado izquierdo queda en
          blanco para el nombre y el texto. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-1/2 overflow-hidden bg-accent lg:block"
        style={{ clipPath: 'ellipse(150% 130% at 122% 50%)' }}
      >
        <OrganicShapes opacity={0.8} />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'url(/assets/backgrounds/grain.png)', backgroundSize: '420px' }}
        />
      </div>

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
          <div className="lg:pt-4">
            <motion.p {...appear(0.45)} className="max-w-xl text-lg text-ink/75 md:text-xl">
              Soy abogado y maestro en Administración. Empecé en esto a los 15 años y llevo 30 en
              la vida pública, siempre con la misma idea: la política se hace en territorio, cara a
              cara, todos los días.
            </motion.p>

            <motion.div {...appear(0.55)} className="mt-7">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                <ButtonLink to="/contacto" tone="accent" variant="solid">
                  Súmate
                </ButtonLink>
                <ButtonLink to="/conoceme" tone="ink" variant="ghost" className="px-2">
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

          {/* Media principal: VIDEO en pantalla de teléfono. En desktop sube y
              se TRASLAPA con el nombre (z-20 sobre el h1), con rotación sutil y
              halo guinda detrás = capas y energía. */}
          <div
            ref={photoRef}
            className="relative z-20 mt-8 lg:col-start-2 lg:mt-[max(-24vw,-320px)]"
          >
            {/* Fondo guinda curvo SOLO en móvil (en desktop existe el panel de
                la derecha): mantiene la marca presente en la pantalla chica. */}
            <div
              aria-hidden
              className="absolute -inset-x-4 -top-4 bottom-[-1.5rem] -z-10 overflow-hidden rounded-[2.4rem] bg-accent lg:hidden"
            >
              <OrganicShapes opacity={0.7} />
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{ backgroundImage: 'url(/assets/backgrounds/grain.png)', backgroundSize: '420px' }}
              />
            </div>

            {/* Contador social ARRIBA del teléfono (sobre el panel guinda en
                desktop, sobre blanco en móvil): tarjeta clara flotante que
                mantiene contraste en ambos fondos. */}
            <motion.div
              {...appear(0.5)}
              className="relative z-30 mx-auto mb-5 flex w-fit items-center gap-3 rounded-2xl bg-white/95 px-3.5 py-2.5 shadow-[0_20px_45px_-24px_rgba(22,22,22,0.6)] ring-1 ring-ink/10 backdrop-blur-sm"
            >
              <CommunityAvatars count={3} />
              <LiveCounter tone="ink" size="sm" />
            </motion.div>

            {/* Halo de gradiente guinda + dorado detrás del teléfono: aporta
                color, calidez y profundidad, y equilibra el peso del nombre a
                la izquierda (va sobre zona sin texto → suma sin quitar jerarquía). */}
            <div
              aria-hidden
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[135%] w-[155%] -translate-x-1/2 -translate-y-1/2 blur-[2px]"
              style={{
                background:
                  'radial-gradient(52% 46% at 50% 47%, rgba(113,25,36,0.26), rgba(113,25,36,0.09) 54%, transparent 74%), radial-gradient(40% 34% at 72% 15%, rgba(165,127,44,0.16), transparent 62%)',
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
