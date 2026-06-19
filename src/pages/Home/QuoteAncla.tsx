import { RevealText } from '../../components/ui/RevealText'
import { Reveal } from '../../components/ui/Reveal'
import { SectionLabel } from '../../components/ui/SectionLabel'

/** Cita ancla editorial (placeholder de cita real). */
export function QuoteAncla() {
  return (
    <section className="bg-bone py-24 text-ink md:py-32">
      <div className="container-x">
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
            <figcaption className="eyebrow mt-7 text-mute">
              {/* REEMPLAZAR: [cita] textual real de Marco Balseca */}
              Marco Balseca · <span className="text-accent">Tehuacán, Puebla</span>
            </figcaption>
          </Reveal>
        </figure>
      </div>
    </section>
  )
}
