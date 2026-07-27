import type { ReactNode } from 'react'
import { RevealText } from '../ui/RevealText'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'

type Props = {
  index: string
  label: string
  title: string
  intro?: string
  /** Versión compacta: título más chico, menos aire y SIN intro largo. */
  compact?: boolean
  children?: ReactNode
}

/**
 * Banda hero de página: blanco editorial, título gigante en NEGRO (ref. ESPN),
 * accent solo como acento (número, regla del índice).
 */
export function PageHero({ index, label, title, intro, compact = false, children }: Props) {
  return (
    <section
      className={`relative overflow-hidden bg-white text-ink ${
        compact ? 'pt-28 pb-8 md:pt-32 md:pb-10' : 'pt-32 pb-16 md:pt-44 md:pb-24'
      }`}
    >
      <div className="container-x relative">
        <SectionLabel num={index} tone="accent">
          {label}
        </SectionLabel>
        <RevealText
          as="h1"
          text={title}
          onMount
          className={`font-display mt-6 leading-[0.86] text-ink ${
            compact
              ? 'text-[12vw] sm:text-[9vw] lg:text-[5.5vw]'
              : 'text-[16vw] sm:text-[12vw] lg:text-[9vw]'
          }`}
        />
        {intro && !compact && (
          <Reveal delay={0.15} className="mt-7 max-w-2xl">
            <p className="text-lg text-ink/70 md:text-xl">{intro}</p>
          </Reveal>
        )}
        {children}
      </div>
      {/* regla al pie con segmento rojo (ref. ESPN section divider) */}
      <div aria-hidden className={`container-x ${compact ? 'mt-6 md:mt-8' : 'mt-10 md:mt-14'}`}>
        <div className="relative h-px w-full bg-ink/10">
          <span className="absolute left-0 top-0 h-px w-28 bg-accent" />
        </div>
      </div>
    </section>
  )
}
