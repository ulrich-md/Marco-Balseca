import type { ReactNode } from 'react'
import { RevealText } from '../ui/RevealText'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'

type Props = {
  index: string
  label: string
  title: string
  intro?: string
  children?: ReactNode
}

/**
 * Banda hero de página: blanco editorial, título gigante en NEGRO (ref. ESPN),
 * accent solo como acento (número, regla del índice).
 */
export function PageHero({ index, label, title, intro, children }: Props) {
  return (
    <section className="relative overflow-hidden bg-white pt-32 pb-12 text-ink md:pt-44 md:pb-16">
      <div className="container-x relative">
        <SectionLabel num={index} tone="accent">
          {label}
        </SectionLabel>
        <RevealText
          as="h1"
          text={title}
          onMount
          className="font-display mt-6 text-[16vw] leading-[0.86] text-ink sm:text-[12vw] lg:text-[9vw]"
        />
        {intro && (
          <Reveal delay={0.15} className="mt-7 max-w-2xl">
            <p className="text-lg text-ink/70 md:text-xl">{intro}</p>
          </Reveal>
        )}
        {children}
      </div>
      {/* regla al pie con segmento rojo (ref. ESPN section divider) */}
      <div aria-hidden className="container-x mt-10 md:mt-14">
        <div className="relative h-px w-full bg-ink/10">
          <span className="absolute left-0 top-0 h-px w-28 bg-accent" />
        </div>
      </div>
    </section>
  )
}
