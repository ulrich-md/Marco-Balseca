import { motion, useReducedMotion } from 'framer-motion'
import { RevealText } from '../../components/ui/RevealText'
import { ButtonLink } from '../../components/ui/Button'
import { ScrollIndicator } from '../../components/ui/ScrollIndicator'
import { HeroVideo, type VideoPhoto } from '../../components/ui/HeroVideo'
import { LiveCounter } from '../../components/ui/LiveCounter'
import { CommunityAvatars } from '../../components/ui/CommunityAvatars'
import { InstagramIcon, FacebookIcon, XIcon } from '../../components/ui/Icons'
import { ArchPortrait } from '../../components/ui/ArchPortrait'
import { StatCounter } from '../../components/ui/StatCounter'
import { GrecaField } from '../../components/ui/Greca'
import { useParallax } from '../../lib/useParallax'
import { SOCIAL, STATS } from '../../data/site'

const HERO_SOCIAL = [
  { Icon: InstagramIcon, ...SOCIAL.instagram },
  { Icon: FacebookIcon, ...SOCIAL.facebook },
  { Icon: XIcon, ...SOCIAL.x },
]

// Fotos REALES para el montaje "en territorio" (polaroid flotante del hero).
const HERO_SLIDES: VideoPhoto[] = [
  { src: '/assets/comunidad/comunidad-familia.jpg', alt: 'Marco con las familias de Tehuacán' },
  { src: '/assets/comunidad/comunidad-mercado.jpg', alt: 'Marco en el mercado de Tehuacán' },
  { src: '/assets/comunidad/comunidad-cancha.jpg', alt: 'Marco en la cancha del barrio' },
  { src: '/assets/portraits/marco-corazon-fondo.jpg', alt: 'Marco con la comunidad' },
]

/* =========================================================================
   HERO — "El portal".
   Crema cálido + ARCO guinda (portal colonial de Tehuacán) con el recorte de
   Marco. Jerarquía: nombre → cargo → promesa → CTA. Prueba social flotando
   sobre el arco (cerca del rostro = confianza) y el montaje de fotos reales
   como polaroid. Cierra con la barra de credenciales (cifras verificables).
   ========================================================================= */
export function Hero() {
  const reduce = useReducedMotion()
  const archRef = useParallax<HTMLDivElement>(28)

  const appear = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const },
        }

  return (
    <section className="grain relative overflow-hidden bg-cream text-ink [--grain:0.05]">
      {/* Atmósfera: luz cálida arriba a la izquierda + greca dorada casi
          imperceptible detrás del arco (textura cultural sin ruido). */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(55% 60% at 0% 0%, rgba(255,255,255,0.9), transparent 60%), radial-gradient(45% 55% at 85% 55%, rgba(113,25,36,0.08), transparent 70%)',
          }}
        />
        <div
          className="absolute inset-y-0 right-0 hidden w-1/2 lg:block"
          style={{
            WebkitMaskImage: 'radial-gradient(70% 70% at 70% 50%, #000 30%, transparent 75%)',
            maskImage: 'radial-gradient(70% 70% at 70% 50%, #000 30%, transparent 75%)',
          }}
        >
          <GrecaField color="var(--color-gold)" opacity={0.14} size={72} strokeWidth={2} />
        </div>
      </div>

      <div className="container-x relative z-10 pt-28 lg:pt-32">
        <div className="grid items-center gap-y-10 lg:grid-cols-12 lg:gap-x-10">
          {/* ---------------- Columna de texto ---------------- */}
          <div className="relative z-20 lg:col-span-7">
            <h1>
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

            <motion.p {...appear(0.35)} className="mt-6 flex max-w-xl items-start gap-3 lg:mt-7">
              <span aria-hidden className="mt-[0.55em] h-[3px] w-10 shrink-0 bg-gradient-to-r from-accent to-gold" />
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

            <motion.p {...appear(0.5)} className="mt-5 max-w-xl text-lg text-ink/75 md:text-xl">
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
                  className="px-9 py-4 shadow-[0_18px_40px_-16px_rgba(113,25,36,0.75)]"
                >
                  Súmate
                </ButtonLink>
                <ButtonLink to="/conoceme" tone="ink" variant="outline" className="border-ink/20 bg-white/60">
                  Conoce a Marco
                </ButtonLink>
              </div>

              <div className="mt-7 flex items-center gap-3">
                <span className="eyebrow text-mute">Sígueme</span>
                <span aria-hidden className="h-px w-6 bg-ink/20" />
                <div className="flex items-center gap-2">
                  {HERO_SOCIAL.map(({ Icon, label, url }) => (
                    <a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={label}
                      className="flex h-11 w-11 items-center justify-center rounded-full border border-ink/12 bg-white/70 text-ink/70 transition-colors duration-200 hover:border-accent hover:bg-accent hover:text-white"
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* ---------------- Columna del arco ---------------- */}
          <div className="relative lg:col-span-5">
            {/* Prueba social en móvil: en flujo, arriba del arco (no se encima) */}
            <motion.div
              {...appear(0.5)}
              className="mx-auto mb-8 flex w-fit items-center gap-3 rounded-2xl border border-ink/10 bg-white/85 py-2 pl-2 pr-5 shadow-soft lg:hidden"
            >
              <CommunityAvatars count={3} />
              <LiveCounter tone="ink" layout="inline" />
            </motion.div>

            <motion.div
              initial={reduce ? undefined : { opacity: 0, y: 40 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative mx-auto w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[480px]"
            >
              {/* Arcos concéntricos de filete dorado (profundidad) */}
              <div aria-hidden className="arch pointer-events-none absolute -inset-5 border border-gold/30 md:-inset-7" />
              <div aria-hidden className="arch pointer-events-none absolute -inset-10 border border-gold/15 md:-inset-14" />

              <div ref={archRef}>
                <ArchPortrait
                  cutout="/assets/portraits/marco-sumate-cut"
                  alt="Marco Balseca"
                  backdrop="/assets/generated/hero-valle-tehuacan.webp"
                  tone="accent"
                  eager
                  className="aspect-[4/5] w-full"
                  cutoutClassName="w-[90%]"
                />
              </div>

              {/* Prueba social (desktop): tarjeta flotante junto al rostro */}
              <motion.div
                {...appear(0.75)}
                className="absolute -left-16 top-[46%] z-30 hidden items-center gap-3 rounded-2xl border border-ink/5 bg-white/95 p-3 pr-5 shadow-lift backdrop-blur lg:flex xl:-left-24"
              >
                <CommunityAvatars count={3} />
                <LiveCounter tone="ink" layout="inline" />
              </motion.div>

              {/* Montaje de fotos reales "en territorio" como polaroid */}
              <motion.div
                {...appear(0.9)}
                className="absolute -bottom-14 -left-10 z-30 hidden w-[40%] -rotate-[5deg] rounded-md bg-white p-1.5 pb-2 shadow-lift sm:block lg:-left-24 lg:w-[40%]"
              >
                <HeroVideo
                  photos={HERO_SLIDES}
                  caption="En territorio · Tehuacán, Puebla"
                  poster="/assets/comunidad/comunidad-familia.jpg"
                  className="aspect-[4/5] w-full rounded-[3px]"
                  interval={2800}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* ---------------- Barra de credenciales ---------------- */}
        <div className="relative mt-16 lg:mt-20">
          <div aria-hidden className="rule-gold" />
          <div className="grid grid-cols-3 gap-4 py-8 sm:gap-8 md:py-10">
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className={`relative ${i > 0 ? 'border-l border-ink/10 pl-4 sm:pl-8' : ''}`}
              >
                <StatCounter
                  value={s.value}
                  suffix={s.suffix}
                  placeholder={s.placeholder}
                  label={s.label}
                  tone="accent"
                />
              </div>
            ))}
          </div>
          <div className="hidden justify-end pb-6 lg:flex">
            <ScrollIndicator tone="accent" />
          </div>
        </div>
      </div>
    </section>
  )
}
