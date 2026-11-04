import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { RevealText } from '../../components/ui/RevealText'
import { ButtonLink } from '../../components/ui/Button'
import { HeroVideo, type VideoPhoto } from '../../components/ui/HeroVideo'
import { LiveCounter } from '../../components/ui/LiveCounter'
import { CommunityAvatars } from '../../components/ui/CommunityAvatars'
import { InstagramIcon, FacebookIcon, XIcon } from '../../components/ui/Icons'
import { StatCounter } from '../../components/ui/StatCounter'
import { GrecaBand } from '../../components/ui/Greca'
import { Sticker } from '../../components/ui/Sticker'
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
   Estructura de póster de campaña (ref. Mamdani) con la identidad propia:
   campo BLANCO, un solo color de peso (GUINDA) en el triángulo que apunta al
   teléfono, marco guinda con filete dorado fino, nombre en sus colores de
   marca y sello circular "Súmate". El video (montaje de fotos reales) vuelve a ser el protagonista.
   Cierra con una franja guinda de credenciales (cifras verificables).
   ========================================================================= */
/** Textura de serigrafía dentro del triángulo: semitono dorado que se
 *  desvanece hacia la punta, luz diagonal y grano. Da cuerpo sin competir
 *  con el video. Si existe /assets/generated/triangulo-textura.webp (pintura
 *  / papel), se suma encima. */
function TriangleTexture() {
  return (
    <>
      <div
        className="halftone absolute inset-0 text-sand opacity-[0.16]"
        style={{
          WebkitMaskImage: 'linear-gradient(200deg, #000 0%, transparent 55%)',
          maskImage: 'linear-gradient(200deg, #000 0%, transparent 55%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(115deg, rgba(255,255,255,0.10) 0%, transparent 35%, rgba(0,0,0,0.22) 100%)' }}
      />
      <img
        src="/assets/generated/triangulo-textura.webp"
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-multiply"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.10] mix-blend-overlay"
        style={{ backgroundImage: 'url(/assets/backgrounds/grain.png)', backgroundSize: '320px' }}
      />
    </>
  )
}

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
      className="relative overflow-hidden bg-white text-ink"
    >
      {/* ---------- Fondo de cartel (blanco + guinda) ---------- */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        {/* TRIÁNGULO guinda invertido (figura del cartel) detrás del teléfono */}
        {/* anclado al contenedor: acompaña siempre al teléfono y no toca el nombre */}
        <div className="absolute inset-y-0 left-1/2 hidden w-full max-w-[88rem] -translate-x-1/2 lg:block">
          <div
            className="absolute -right-[120px] left-[54%] top-[104px] h-[86%] overflow-hidden bg-gradient-to-b from-accent to-accent-deep"
            style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
          >
            <TriangleTexture />
          </div>
        </div>
        {/* papel de cartel (pliegues + fibras, en gris neutro: no tiñe el blanco) */}
        <img
          src="/assets/generated/poster-papel.webp"
          alt=""
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover opacity-[0.28] mix-blend-multiply"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
        {/* semitono guinda muy tenue al pie (textura de serigrafía) */}
        <div
          className="halftone absolute inset-0 text-accent opacity-[0.06]"
          style={{
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 45%, #000 100%)',
            maskImage: 'linear-gradient(to bottom, transparent 45%, #000 100%)',
          }}
        />
      </div>

      {/* Marco del cartel: borde guinda delgado (sin filete interior: competía
          con el menú y formaba una doble raya) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-30 border-[6px] border-accent md:border-[8px]" />

      <div className="container-x relative z-10 pt-24 lg:pt-28">
        <div className="grid items-center gap-y-10 lg:grid-cols-12 lg:gap-x-8">
          {/* ---------------- Texto ---------------- */}
          <div className="relative z-20 lg:col-span-7">
            <h1>
              <RevealText
                as="span"
                text="Marco"
                onMount
                stagger={0.05}
                className="font-display block text-[19vw] leading-[0.8] text-accent sm:text-[16vw] lg:text-[12.5vw] 2xl:text-[11.25rem]"
              />
              <RevealText
                as="span"
                text="Balseca"
                onMount
                delay={0.12}
                stagger={0.04}
                className="font-display block text-[19vw] leading-[0.8] text-ink sm:text-[16vw] lg:text-[12.5vw] 2xl:text-[11.25rem]"
              />
            </h1>

            <motion.p {...appear(0.35)} className="mt-5 flex max-w-xl items-start gap-3">
              <span aria-hidden className="mt-[0.55em] h-[3px] w-10 shrink-0 bg-gradient-to-r from-accent to-gold" />
              <span className="font-condensed text-base font-semibold uppercase leading-snug tracking-[0.08em] text-accent md:text-lg">
                Delegado de Gobernación del Estado de Puebla · Microrregión 25
              </span>
            </motion.p>

            <motion.p
              {...appear(0.44)}
              className="font-condensed mt-4 max-w-xl text-[1.7rem] font-bold leading-[1.08] text-ink sm:text-[2rem] lg:text-[2.4rem]"
            >
              Cerca de la gente, <span className="text-accent">por nuestra tierra.</span>
            </motion.p>

            <motion.p {...appear(0.5)} className="mt-4 max-w-[40rem] text-lg text-ink/75 md:text-xl">
              Soy abogado y maestro en Administración. Empecé en esto a los 15 años y llevo 30 en
              la vida pública, siempre con la misma idea: la política se hace en territorio, cara a
              cara, todos los días.
            </motion.p>

            <motion.div {...appear(0.55)} className="mt-6">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-3 sm:gap-x-4">
                <ButtonLink
                  to="/contacto"
                  tone="accent"
                  variant="solid"
                  className="shadow-[0_16px_36px_-14px_rgba(113,25,36,0.7)] max-sm:px-5"
                >
                  Súmate
                </ButtonLink>
                <ButtonLink to="/conoceme" tone="ink" variant="outline" className="max-sm:px-5">
                  Conoce a Marco
                </ButtonLink>
              </div>

              {/* Prueba social JUNTO al botón (punto de decisión) + redes */}
              <div className="mt-8 hidden flex-wrap items-center gap-x-6 gap-y-4 sm:flex">
                <div className="hidden items-center gap-2.5 lg:flex">
                  <CommunityAvatars count={3} />
                  <LiveCounter tone="ink" layout="inline" />
                </div>
                <span aria-hidden className="hidden h-10 w-px bg-ink/12 lg:block" />
                <div className="flex items-center gap-3">
                <span className="eyebrow text-mute">Sígueme</span>
                <span aria-hidden className="h-px w-6 bg-ink/15" />
                <div className="flex items-center gap-2">
                  {HERO_SOCIAL.map(({ Icon, label, url }) => (
                    <a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/12 text-ink/70 transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-white"
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </a>
                  ))}
                </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ---------------- Teléfono con el video ---------------- */}
          <div className="relative lg:col-span-5">
            {/* Triángulo guinda en móvil: solo detrás del teléfono */}
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-6 -top-8 bottom-[8%] overflow-hidden bg-gradient-to-b from-accent to-accent-deep lg:hidden"
              style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
            >
              <TriangleTexture />
            </div>
            {/* Prueba social en móvil/tablet: sobre el triángulo, arriba del teléfono
                (en desktop vive junto al botón) */}
            <motion.div
              {...appear(0.5)}
              className="relative z-40 mx-auto mb-6 flex w-fit items-center gap-2.5 rounded-2xl bg-white px-3 py-2 pr-5 shadow-lift ring-1 ring-ink/5 lg:hidden"
            >
              <CommunityAvatars count={3} />
              <LiveCounter tone="ink" layout="inline" />
            </motion.div>

            <div ref={phoneRef} className="relative">
              <motion.div
                className="relative mx-auto w-full max-w-[270px] rotate-2 lg:max-w-[320px] lg:rotate-3"
                style={{ rotateX: reduce ? 0 : rotX, rotateY: reduce ? 0 : rotY, transformPerspective: 1000 }}
              >
                {/* Carcasa del teléfono (bezel + botones + dynamic island) */}
                <div className="relative rounded-[2.7rem] bg-black p-2.5 shadow-[0_45px_80px_-30px_rgba(0,0,0,0.6)] ring-1 ring-black/20">
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

              {/* Sticker "Microrregión 25" (ref. sello "VOTE JUNE 24" del cartel) */}
              <Sticker
                name="microrregion-25"
                alt="Microrregión 25"
                rotate={-10}
                delay={0.6}
                className="-right-2 top-[38%] w-28 sm:right-[4%] md:w-36 lg:-left-16 lg:right-auto lg:top-auto lg:bottom-[10%] lg:w-40"
              />
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
