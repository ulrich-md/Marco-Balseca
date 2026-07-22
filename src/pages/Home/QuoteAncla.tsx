import { RevealText } from '../../components/ui/RevealText'
import { Reveal } from '../../components/ui/Reveal'
import { SectionLabel } from '../../components/ui/SectionLabel'
import { Atmosphere } from '../../components/ui/Atmosphere'

/** Cita ancla editorial sobre las curvas de nivel del valle de Tehuacán. */
export function QuoteAncla() {
  return (
    <section className="relative overflow-hidden bg-bone py-20 text-ink md:py-32">
      <Atmosphere variant="topo" />
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
            <figcaption className="eyebrow mt-7 text-mute">
              Marco Balseca · <span className="text-accent">Tehuacán, Puebla</span>
            </figcaption>
          </Reveal>
        </figure>
      </div>
    </section>
  )
}
