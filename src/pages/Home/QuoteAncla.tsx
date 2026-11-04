import { RevealText } from '../../components/ui/RevealText'
import { Reveal } from '../../components/ui/Reveal'
import { SectionLabel } from '../../components/ui/SectionLabel'
import { GrecaBand } from '../../components/ui/Greca'

/** Cita ancla editorial: arcos concéntricos de filete dorado (el portal de
 *  marca) enmarcan la frase; firma con retrato circular. */
export function QuoteAncla() {
  return (
    <section className="relative overflow-hidden bg-paper py-24 text-ink md:py-36">
      {/* Arcos concéntricos de fondo */}
      <div aria-hidden className="pointer-events-none absolute inset-0 flex items-end justify-center">
        {[100, 78, 56].map((w, i) => (
          <span
            key={w}
            className="arch absolute bottom-0 border border-b-0 border-gold"
            style={{ width: `min(${w}vw, ${w * 11}px)`, height: `min(${w * 0.9}vw, ${w * 9.5}px)`, opacity: 0.18 + i * 0.07 }}
          />
        ))}
      </div>
      {/* Ilustración lineal del valle (asset generado opcional; si falta, se oculta) */}
      <img
        src="/assets/generated/valle-tehuacan-lineal.webp"
        alt=""
        aria-hidden
        loading="lazy"
        decoding="async"
        className="pointer-events-none absolute inset-x-0 bottom-3 h-[42%] w-full object-cover object-bottom opacity-50 mix-blend-multiply"
        onError={(e) => {
          e.currentTarget.style.display = 'none'
        }}
      />
      <GrecaBand className="absolute inset-x-0 bottom-0 text-accent/15" height={14} />

      <div className="container-x relative z-10">
        <div className="flex justify-center">
          <SectionLabel tone="accent">En sus palabras</SectionLabel>
        </div>
        <figure className="mx-auto mt-8 max-w-4xl text-center">
          <RevealText
            as="p"
            text={'"La fuerza de Tehuacán\nestá en su gente."'}
            className="font-display text-[9vw] leading-[0.95] text-ink sm:text-5xl lg:text-6xl"
          />
          <Reveal delay={0.15}>
            <figcaption className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <img
                src="/assets/portraits/marco-corazon-fondo-sm.webp"
                alt=""
                aria-hidden
                loading="lazy"
                decoding="async"
                className="h-11 w-11 rounded-full object-cover ring-2 ring-white shadow-soft"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
              <span className="eyebrow text-mute">
                Marco Balseca · <span className="text-accent">Tehuacán, Puebla</span>
              </span>
            </figcaption>
          </Reveal>
        </figure>
      </div>
    </section>
  )
}
