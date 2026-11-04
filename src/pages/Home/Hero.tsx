import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { RevealText } from '../../components/ui/RevealText'
import { ButtonLink } from '../../components/ui/Button'
import { HeroVideo, type VideoPhoto } from '../../components/ui/HeroVideo'
import { LiveCounter } from '../../components/ui/LiveCounter'
import { CommunityAvatars } from '../../components/ui/CommunityAvatars'
import { InstagramIcon, FacebookIcon, XIcon } from '../../components/ui/Icons'
import { StatCounter } from '../../components/ui/StatCounter'
import { GrecaBand } from '../../components/ui/Greca'
import { useParallax } from '../../lib/useParallax'
import { SOCIAL, STATS } from '../../data/site'

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

/* =========================================================================
   HERO — "El cartel".
   Lenguaje de póster de campaña (ref. Mamdani) con identidad propia: campo
   DORADO intenso, triángulo GUINDA que apunta al teléfono, marco guinda con
   filete crema, nombre en crema con sombra dura guinda y sello circular
   "Súmate". El video (montaje de fotos reales) vuelve a ser el protagonista.
   Cierra con una franja guinda de credenciales (cifras verificables).
   ========================================================================= */
export function Hero() {
  const reduce = useReducedMotion()
  const phoneRef = useParallax<HTMLDivElement>(30)

  // Micro-interacción: el teléfono se inclina en 3D siguiendo el mouse.
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
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
        }

  return (
    <section
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative overflow-hidden bg-marigold text-ink"
    >
      {/* ---------- Fondo de cartel ---------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        {/* luz y viñeta: el dorado no se siente plano */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 55% at 25% 20%, rgba(255,236,190,0.55), transparent 65%), radial-gradient(80% 70% at 50% 120%, rgba(201,138,26,0.65), transparent 70%)',
          }}
        />
        {/* TRIÁNGULO guinda invertido (figura del cartel) detrás del teléfono */}
        <div
          className="absolute inset-x-0 top-[104px] hidden h-[86%] bg-accent lg:left-[38%] lg:block"
          style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
        />
        {/* semitono guinda sobre el dorado (serigrafía) */}
        <div
          className="halftone absolute inset-0 text-accent opacity-[0.10]"
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 30%, #000 100%)',
            maskImage: 'linear-gradient(to bottom, transparent 30%, #000 100%)',
          }}
        />
        {/* papel/grano */}
        <div
          className="absolute inset-0 opacity-[0.09] mix-blend-multiply"
          style={{ backgroundImage: 'url(/assets/backgrounds/grain.png)', backgroundSize: '420px' }}
        />
        {/* textura de póster generada (opcional; si falta, se oculta) */}
        <img
          src="/assets/generated/poster-papel.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40 mix-blend-multiply"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
      </div>

      {/* Marco del cartel: borde guinda + filete crema interior */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-30 border-[8px] border-accent md:border-[12px]" />
      <div aria-hidden className="pointer-events-none absolute inset-[14px] z-30 border border-cream/70 md:inset-[22px]" />

      <div className="container-x relative z-10 pt-28 lg:pt-32">
        <div className="grid items-center gap-y-12 lg:grid-cols-12 lg:gap-x-8">
          {/* ---------------- Texto ---------------- */}
          <div className="relative z-20 lg:col-span-7">
            <h1 className="[--poster-shadow:var(--color-accent)]">
              <RevealText
                as="span"
                text="Marco"
                onMount
                stagger={0.05}
                className="font-display poster-shadow block text-[19vw] leading-[0.8] text-cream sm:text-[16vw] lg:text-[12.5vw]"
              />
              <RevealText
                as="span"
                text="Balseca"
                onMount
                delay={0.12}
                stagger={0.04}
                className="font-display poster-shadow block text-[19vw] leading-[0.8] text-cream sm:text-[16vw] lg:text-[12.5vw]"
              />
            </h1>

            <motion.p {...appear(0.35)} className="mt-7 flex max-w-xl items-start gap-3">
              <span aria-hidden className="mt-[0.55em] h-[3px] w-10 shrink-0 bg-accent" />
              <span className="font-condensed text-base font-semibold uppercase leading-snug tracking-[0.08em] text-accent md:text-lg">
                Delegado de Gobernación del Estado de Puebla · Microrregión 25
              </span>
            </motion.p>

            <motion.p
              {...appear(0.44)}
              className="font-condensed mt-5 max-w-xl text-[1.7rem] font-bold leading-[1.08] text-ink sm:text-[2rem] lg:text-[2.4rem]"
            >
              Cerca de la gente, <span className="text-accent">por nuestra tierra.</span>
            </motion.p>

            <motion.p {...appear(0.5)} className="mt-5 max-w-xl text-lg text-ink/80 md:text-xl">
              Soy abogado y maestro en Administración. Empecé en esto a los 15 años y llevo 30 en
              la vida pública, siempre con la misma idea: la política se hace en territorio, cara a
              cara, todos los días.
            </motion.p>

            <motion.div {...appear(0.55)} className="mt-8">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
                <ButtonLink
                  to="/contacto"
                  tone="accent"
                  variant="solid"
                  className="shadow-[5px_5px_0_0_var(--color-ink)] hover:shadow-[7px_7px_0_0_var(--color-ink)]"
                >
                  Súmate
                </ButtonLink>
                <ButtonLink to="/conoceme" tone="ink" variant="outline">
                  Conoce a Marco
                </ButtonLink>
              </div>

              <div className="mt-7 flex items-center gap-3">
                <span className="eyebrow text-ink/70">Sígueme</span>
                <span aria-hidden className="h-px w-6 bg-ink/25" />
                <div className="flex items-center gap-2">
                  {HERO_SOCIAL.map(({ Icon, label, url }) => (
                    <a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/20 text-ink/80 transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-cream"
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* ---------------- Teléfono con el video ---------------- */}
          <div className="relative lg:col-span-5">
            {/* Triángulo guinda en móvil: solo detrás del teléfono */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-6 -top-8 bottom-[8%] bg-accent lg:hidden"
              style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
            />
            {/* Prueba social: sobre el triángulo guinda, arriba del teléfono */}
            <motion.div
              {...appear(0.5)}
              className="relative z-40 mx-auto mb-6 flex w-fit items-center gap-2.5 rounded-2xl bg-accent px-3 py-2 shadow-[4px_4px_0_0_var(--color-ink)] lg:mb-7"
            >
              <CommunityAvatars count={3} />
              <LiveCounter tone="bone" layout="inline" />
            </motion.div>

            <div ref={phoneRef} className="relative">
              <motion.div
                className="relative mx-auto w-full max-w-[270px] rotate-2 lg:max-w-[320px] lg:rotate-3"
                style={{ rotateX: reduce ? 0 : rotX, rotateY: reduce ? 0 : rotY, transformPerspective: 1000 }}
              >
                {/* Carcasa del teléfono (bezel + botones + dynamic island) */}
                <div className="relative rounded-[2.7rem] bg-black p-2.5 shadow-[14px_14px_0_0_var(--color-accent-deep),0_40px_70px_-25px_rgba(0,0,0,0.55)] ring-1 ring-black/20">
                  <span aria-hidden className="absolute -left-[3px] top-24 h-9 w-[3px] rounded-l-sm bg-black" />
                  <span aria-hidden className="absolute -left-[3px] top-36 h-14 w-[3px] rounded-l-sm bg-black" />
                  <span aria-hidden className="absolute -right-[3px] top-28 h-16 w-[3px] rounded-r-sm bg-black" />
                  <div className="relative overflow-hidden rounded-[2.1rem]">
                    <HeroVideo
                      photos={HERO_SLIDES}
                      caption="En territorio · Tehuacán, Puebla"
                      poster="/assets/portraits/marco-formal.jpg"
                      className="aspect-[9/19] w-full"
                    />
                    <span aria-hidden className="absolute left-1/2 top-2.5 z-30 h-[22px] w-24 -translate-x-1/2 rounded-full bg-black" />
                  </div>
                </div>
              </motion.div>

              {/* Sello circular (ref. "VOTE JUNE 24" del cartel) */}
              <motion.div
                {...appear(0.85)}
                className="absolute -right-1 top-[42%] z-40 sm:right-[6%] lg:-left-10 lg:right-auto lg:top-auto lg:bottom-[12%]"
              >
                <Link
                  to="/contacto"
                  className="font-display group grid h-28 w-28 -rotate-12 place-items-center rounded-full bg-accent text-center text-2xl leading-none text-cream shadow-[5px_5px_0_0_var(--color-ink)] ring-[3px] ring-cream transition-transform duration-300 hover:-rotate-6 hover:scale-105 md:h-32 md:w-32 md:text-[1.7rem]"
                >
                  Súmate
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ---------------- Franja de credenciales ---------------- */}
      <div className="relative z-20 mt-16 bg-accent text-white lg:mt-20">
        <GrecaBand className="absolute inset-x-0 top-0 text-sand/30" height={10} />
        <div className="container-x">
          <div className="grid grid-cols-3 gap-4 pb-12 pt-10 sm:gap-8 md:pb-14 md:pt-12">
            {STATS.map((s, i) => (
              <div key={s.label} className={i > 0 ? 'border-l border-white/20 pl-4 sm:pl-8' : ''}>
                <StatCounter
                  value={s.value}
                  suffix={s.suffix}
                  placeholder={s.placeholder}
                  label={s.label}
                  tone="bone"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
