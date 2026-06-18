import { RevealText } from '../../components/ui/RevealText'
import { Reveal } from '../../components/ui/Reveal'
import { SectionLabel } from '../../components/ui/SectionLabel'

/** Cita ancla editorial (placeholder de cita real). */
export function QuoteAncla() {
  return (
    <section className="bg-bone py-24 text-ink md:py-32">
      <div className="container-x">
        <div className="flex justify-center">
          <SectionLabel tone="guinda">En sus palabras</SectionLabel>
        </div>
        <figure className="mx-auto mt-8 max-w-4xl text-center">
          <RevealText
            as="p"
            text={'"La fuerza de Tehuacán\nestá en su gente."'}
            className="font-display text-[9vw] leading-[0.95] text-ink sm:text-5xl lg:text-6xl"
          />
          <Reveal delay={0.15}>
            <figcaption className="mt-7 text-sm uppercase tracking-[0.2em] text-mute">
              {/* REEMPLAZAR: [cita] textual real de Marco Balseca */}
              Marco Balseca · <span className="text-guinda">Tiui Chikavak</span>
            </figcaption>
          </Reveal>
        </figure>
      </div>
    </section>
  )
}
