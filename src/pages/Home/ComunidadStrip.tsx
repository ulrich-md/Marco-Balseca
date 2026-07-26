import { Reveal } from '../../components/ui/Reveal'
import { RevealText } from '../../components/ui/RevealText'
import { ButtonLink } from '../../components/ui/Button'
import { OrganicShapes } from '../../components/ui/OrganicShapes'

/* =========================================================================
   "EN TERRITORIO" — collage estilo sitio del Gobierno del Estado
   ('EN MERCADOS Y TIANGUIS'): fondo guinda texturizado, fotos reales
   traslapadas e inclinadas y titular blanco gigante cruzando encima.
   ========================================================================= */

const FOTOS = [
  {
    src: '/assets/comunidad/comunidad-mercado.webp',
    alt: 'Marco en el mercado de Tehuacán',
    cls: 'left-[2%] top-[10%] w-[34%] -rotate-3 md:w-[30%]',
  },
  {
    src: '/assets/comunidad/comunidad-familia.webp',
    alt: 'Marco con las familias de Tehuacán',
    cls: 'left-1/2 top-0 w-[52%] -translate-x-1/2 rotate-1 md:w-[44%]',
  },
  {
    src: '/assets/comunidad/comunidad-cancha.webp',
    alt: 'Marco en la cancha del barrio',
    cls: 'bottom-[6%] right-[2%] w-[30%] rotate-2 md:w-[24%]',
  },
]

export function ComunidadStrip() {
  return (
    <section className="relative overflow-hidden bg-accent py-20 text-white md:py-32">
      {/* Fondo: foto real difuminada en B&N (textura/profundidad) + capa guinda
          (multiply) + formas orgánicas + grano. Riqueza detrás del collage. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <img
          src="/assets/comunidad/comunidad-visita.webp"
          alt=""
          loading="lazy"
          decoding="async"
          className="h-full w-full scale-110 object-cover opacity-30 blur-[3px] grayscale"
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
        <div className="absolute inset-0 bg-accent/80 mix-blend-multiply" />
        <OrganicShapes opacity={0.5} />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'url(/assets/backgrounds/grain.png)', backgroundSize: '420px' }}
        />
      </div>

      <div className="container-x relative z-10">
        {/* Eyebrow centrado (ref. Armenta) */}
        <Reveal>
          <p className="font-condensed text-center text-base font-bold uppercase tracking-[0.14em] text-white md:text-xl">
            Honestidad, trabajo y amor a Tehuacán
          </p>
        </Reveal>

        {/* Collage con titular gigante cruzando */}
        <div className="relative mx-auto mt-10 aspect-[16/10] max-w-5xl md:mt-14 md:aspect-[16/8]">
          {FOTOS.map((f) => (
            <img
              key={f.src}
              src={f.src}
              alt={f.alt}
              loading="lazy"
              decoding="async"
              className={`absolute rounded-sm shadow-[0_25px_60px_-20px_rgba(0,0,0,0.55)] ${f.cls}`}
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
          ))}
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <RevealText
              as="h2"
              text="En territorio"
              className="font-display text-center text-[13vw] leading-none text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.45)] md:text-[8.5vw]"
            />
          </div>
        </div>

        {/* CTA — grande y visible */}
        <Reveal delay={0.1}>
          <div className="mt-12 flex justify-center md:mt-16">
            <ButtonLink
              to="/reels"
              tone="bone"
              variant="solid"
              arrow
              className="px-10 py-5 text-base shadow-[0_20px_45px_-16px_rgba(0,0,0,0.55)] md:px-12 md:text-lg"
            >
              Mira los recorridos
            </ButtonLink>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
