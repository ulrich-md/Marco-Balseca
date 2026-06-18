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
 * Banda hero CLARA para páginas internas: blanco/bone cálido, con el título
 * gigante en guinda. Guinda como acento (no como fondo dominante).
 */
export function PageHero({ index, label, title, intro, children }: Props) {
  return (
    <section className="relative overflow-hidden bg-bone pt-32 pb-14 text-ink md:pt-44 md:pb-20">
      <div aria-hidden className="absolute inset-x-0 top-0 h-1 bg-guinda" />
      {/* halo guinda suave */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[12%] -top-[24%] h-[80%] w-[55%] rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(110,34,51,0.06), transparent)' }}
      />
      <div className="container-x relative">
        <SectionLabel num={index} tone="guinda">
          {label}
        </SectionLabel>
        <RevealText
          as="h1"
          text={title}
          onMount
          className="font-display mt-6 text-[16vw] leading-[0.86] text-guinda sm:text-[12vw] lg:text-[9vw]"
        />
        {intro && (
          <Reveal delay={0.15} className="mt-7 max-w-2xl">
            <p className="text-lg text-ink/70 md:text-xl">{intro}</p>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  )
}
