import { motion, useReducedMotion } from 'framer-motion'
import { RevealText } from '../ui/RevealText'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'
import { useParallax } from '../../lib/useParallax'

/* =========================================================================
   POSTER HERO — cartel editorial de figura (ref. pósters de jugador):
   · Nombre VERTICAL gigante a la izquierda (desktop).
   · Figura guinda inclinada con el ROSTRO en grande, a color natural (foto
     sonriente), cortado por líneas guinda finas SIN desplazar las franjas
     (desplazarlas fractura la cara). El guinda asoma en las líneas y la base.
   · Recorte de cuerpo completo al frente, rompiendo la figura.
   · Columna derecha: índice + intro (el texto no cambia).
   Fotos reales de Marco (nunca generadas); el tratamiento es solo CSS.
   ========================================================================= */

type Props = {
  index: string
  label: string
  /** "Nombre\nApellido" */
  title: string
  intro?: string
  /** rostro en B/N (alta resolución) */
  face: string
  /** ruta base del recorte de cuerpo completo (sin extensión) */
  cutout: string
  alt: string
}

const BANDS = 4

export function PosterHero({ index, label, title, intro, face, cutout, alt }: Props) {
  const reduce = useReducedMotion()
  const faceRef = useParallax<HTMLDivElement>(40)
  const [first, last] = title.split('\n')

  return (
    <section className="relative overflow-hidden bg-white pb-16 pt-28 text-ink md:pt-32 lg:pb-16 lg:pt-28">
      {/* papel de cartel */}
      <img
        src="/assets/generated/poster-papel.webp"
        alt=""
        aria-hidden
        className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-[0.28] mix-blend-multiply"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
      />

      <div className="container-x relative z-10">
        <div className="grid items-end gap-10 lg:grid-cols-[auto_minmax(0,1.25fr)_minmax(0,0.85fr)] lg:gap-x-10">
          {/* ---- Nombre: vertical en desktop, horizontal en móvil ---- */}
          <div className="lg:self-stretch">
            <div className="lg:hidden">
              <SectionLabel num={index} tone="accent">
                {label}
              </SectionLabel>
            </div>
            {/* En desktop: dos columnas verticales (se leen de abajo hacia arriba),
                nombre chico en guinda + apellido grande, como el cartel de jugador */}
            <h1 className="mt-5 lg:mt-0 lg:flex lg:h-full lg:items-end lg:gap-2">
              <span className="block lg:[writing-mode:vertical-rl] lg:rotate-180">
                <RevealText
                  as="span"
                  text={first}
                  onMount
                  className="font-display block text-[19vw] leading-[0.82] text-accent sm:text-[14vw] lg:text-[clamp(3.25rem,9vh,5.75rem)]"
                />
              </span>
              <span className="block lg:[writing-mode:vertical-rl] lg:rotate-180">
                <RevealText
                  as="span"
                  text={last ?? ''}
                  onMount
                  delay={0.12}
                  className="font-display block text-[19vw] leading-[0.82] text-ink sm:text-[14vw] lg:text-[clamp(5.5rem,15.5vh,10rem)]"
                />
              </span>
            </h1>
          </div>

          {/* ---- Figura guinda con rostro rebanado + recorte al frente ---- */}
          <div className="relative mx-auto w-full max-w-[560px] lg:mr-0 lg:max-w-[min(520px,62vh)]">
            <motion.div
              initial={reduce ? undefined : { opacity: 0, x: 30 }}
              animate={reduce ? undefined : { opacity: 1, x: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative aspect-[4/5] w-full"
            >
              <div
                className="absolute inset-0 overflow-hidden bg-gradient-to-b from-accent-soft via-accent to-accent-deep"
                style={{ clipPath: 'polygon(14% 0, 100% 0, 86% 100%, 0 100%)' }}
              >
                {/* rostro en franjas desplazadas (cada franja = la misma foto, recortada) */}
                <div
                  ref={faceRef}
                  className="absolute inset-x-0 -top-[2%] h-[100%]"
                  style={{
                    WebkitMaskImage: 'linear-gradient(to bottom, #000 82%, transparent 100%)',
                    maskImage: 'linear-gradient(to bottom, #000 82%, transparent 100%)',
                  }}
                >
                  {Array.from({ length: BANDS }).map((_, k) => (
                    <div
                      key={k}
                      className="absolute inset-x-0 overflow-hidden"
                      style={{ top: `${(k * 100) / BANDS}%`, height: `calc(${100 / BANDS}% - 4px)` }}
                    >
                      <img
                        src={face}
                        alt=""
                        aria-hidden
                        decoding="async"
                        className="absolute left-0 w-full object-cover object-top saturate-[0.85]"
                        style={{ height: `${BANDS * 100}%`, top: `${-k * 100}%` }}
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    </div>
                  ))}
                </div>
                {/* semitono + grano: textura de serigrafía */}
                <div
                  className="halftone absolute inset-0 text-accent-deep opacity-20"
                  style={{
                    WebkitMaskImage: 'linear-gradient(to top, #000 0%, transparent 60%)',
                    maskImage: 'linear-gradient(to top, #000 0%, transparent 60%)',
                  }}
                />
                <div
                  className="absolute inset-0 opacity-[0.1] mix-blend-overlay"
                  style={{ backgroundImage: 'url(/assets/backgrounds/grain.png)', backgroundSize: '320px' }}
                />
              </div>

              {/* sombra de piso */}
              <div aria-hidden className="absolute -bottom-3 right-[4%] h-6 w-[58%] rounded-[50%] bg-black/25 blur-xl" />

              {/* recorte de cuerpo completo, rompiendo la figura */}
              <motion.picture
                initial={reduce ? undefined : { opacity: 0, y: 40 }}
                animate={reduce ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-2 -right-[4%] block w-[50%] sm:-right-[6%] lg:right-[3%]"
              >
                <source media="(max-width: 640px)" srcSet={`${cutout}-sm.webp`} type="image/webp" />
                <img
                  src={`${cutout}.webp`}
                  alt={alt}
                  decoding="async"
                  className="block h-auto w-full drop-shadow-[0_24px_28px_rgba(59,14,21,0.35)]"
                />
              </motion.picture>
            </motion.div>
          </div>

          {/* ---- Índice + intro ---- */}
          <div className="lg:pb-6">
            <div className="hidden lg:block">
              <SectionLabel num={index} tone="accent">
                {label}
              </SectionLabel>
            </div>
            <div aria-hidden className="mt-6 hidden h-px w-16 bg-accent lg:block" />
            {intro && (
              <Reveal delay={0.15} className="mt-0 lg:mt-6">
                <p className="text-lg text-ink/75 md:text-xl">{intro}</p>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
