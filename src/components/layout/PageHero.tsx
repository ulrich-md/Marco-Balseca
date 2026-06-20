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
  /** Fondo del hero: 'light' (blanco) o 'dark' (negro). */
  variant?: 'light' | 'dark'
  /** Tratamiento del titular: relleno, en rojo, o contorneado. */
  titleTone?: 'solid' | 'accent' | 'outline'
}

/**
 * Banda hero de página. Variantes (light/dark) + tratamientos de titular
 * (solid/accent/outline) para que cada página tenga IDENTIDAD propia sin
 * romper el sistema editorial B&N + rojo.
 */
export function PageHero({
  index,
  label,
  title,
  intro,
  children,
  variant = 'light',
  titleTone = 'solid',
}: Props) {
  const dark = variant === 'dark'

  const sectionCls = dark ? 'bg-black text-white' : 'bg-white text-ink'
  const introCls = dark ? 'text-white/70' : 'text-ink/70'
  const ruleBase = dark ? 'bg-white/15' : 'bg-ink/10'

  const titleColor =
    titleTone === 'accent'
      ? 'text-accent'
      : titleTone === 'outline'
        ? `text-outline ${dark ? 'text-white' : 'text-ink'}`
        : dark
          ? 'text-white'
          : 'text-ink'

  return (
    <section className={`relative overflow-hidden pt-32 pb-12 md:pt-44 md:pb-16 ${sectionCls}`}>
      <div className="container-x relative">
        <SectionLabel num={index} tone={dark ? 'bone' : 'accent'}>
          {label}
        </SectionLabel>
        <RevealText
          as="h1"
          text={title}
          onMount
          className={`font-display mt-6 text-[16vw] leading-[0.86] sm:text-[12vw] lg:text-[9vw] ${titleColor}`}
        />
        {intro && (
          <Reveal delay={0.15} className="mt-7 max-w-2xl">
            <p className={`text-lg md:text-xl ${introCls}`}>{intro}</p>
          </Reveal>
        )}
        {children}
      </div>
      {/* regla al pie con segmento rojo (ref. ESPN section divider) */}
      <div aria-hidden className="container-x mt-10 md:mt-14">
        <div className={`relative h-px w-full ${ruleBase}`}>
          <span className="absolute left-0 top-0 h-px w-28 bg-accent" />
        </div>
      </div>
    </section>
  )
}
