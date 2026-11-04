import type { ReactNode } from 'react'
import { RevealText } from '../ui/RevealText'
import { SectionLabel } from '../ui/SectionLabel'
import { Reveal } from '../ui/Reveal'
import { ArchPortrait } from '../ui/ArchPortrait'
import { GrecaField } from '../ui/Greca'

type Props = {
  index: string
  label: string
  title: string
  intro?: string
  /** Versión compacta: título más chico, menos aire y SIN intro largo. */
  compact?: boolean
  /** Foto (jpg/webp) en arco a la derecha (desktop) */
  image?: string
  imageAlt?: string
  /** Recorte de Marco (ruta base sin extensión) en arco guinda a la derecha */
  cutout?: string
  children?: ReactNode
}

/**
 * Banda hero de página: crema cálido con grano, título gigante en NEGRO,
 * accent solo como acento (número, regla del índice). A la derecha, el ARCO
 * de marca (foto o recorte) o, si no hay imagen, arcos de filete dorado +
 * greca tenue — así todas las páginas comparten el mismo lenguaje del Inicio.
 */
export function PageHero({ index, label, title, intro, compact = false, image, imageAlt = '', cutout, children }: Props) {
  const hasMedia = !compact && (image || cutout)
  return (
    <section
      className={`grain relative overflow-hidden bg-cream text-ink [--grain:0.05] ${
        compact ? 'pt-28 pb-8 md:pt-32 md:pb-10' : 'pt-32 pb-16 md:pt-44 md:pb-24'
      }`}
    >
      {/* Decoración de fondo (derecha): greca dorada desvanecida + arcos */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-1/2 md:block"
        style={{
          WebkitMaskImage: 'radial-gradient(65% 70% at 75% 55%, #000 25%, transparent 75%)',
          maskImage: 'radial-gradient(65% 70% at 75% 55%, #000 25%, transparent 75%)',
        }}
      >
        <GrecaField color="var(--color-gold)" opacity={0.14} size={72} strokeWidth={2} />
      </div>
      {!hasMedia && !compact && (
        <div aria-hidden className="pointer-events-none absolute bottom-0 right-[6%] z-0 hidden lg:block">
          <span className="arch absolute bottom-0 right-0 block h-[420px] w-[340px] border border-b-0 border-gold/35" />
          <span className="arch absolute bottom-0 right-[-40px] block h-[500px] w-[420px] border border-b-0 border-gold/20" />
          <span className="arch absolute bottom-0 right-[40px] block h-[340px] w-[260px] bg-accent/[0.06]" />
        </div>
      )}

      <div className={`container-x relative z-10 ${hasMedia ? 'grid items-end gap-12 lg:grid-cols-12' : ''}`}>
        <div className={hasMedia ? 'lg:col-span-7' : ''}>
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
        </div>

        {hasMedia && (
          <Reveal delay={0.1} y={40} className="relative mx-auto hidden w-full max-w-[380px] lg:col-span-5 lg:block">
            <div aria-hidden className="arch pointer-events-none absolute -inset-5 border border-gold/30" />
            {cutout ? (
              <ArchPortrait cutout={cutout} alt={imageAlt} tone="accent" eager className="aspect-[4/5] w-full" />
            ) : (
              <div className="arch relative aspect-[4/5] overflow-hidden bg-mist shadow-lift">
                <img
                  src={image}
                  alt={imageAlt}
                  decoding="async"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                  }}
                />
                <div aria-hidden className="arch pointer-events-none absolute inset-3 border border-white/45" />
              </div>
            )}
          </Reveal>
        )}
        {children}
      </div>
      {/* regla al pie con segmento guinda */}
      <div aria-hidden className={`container-x relative z-10 ${compact ? 'mt-6 md:mt-8' : 'mt-10 md:mt-14'}`}>
        <div className="relative h-px w-full bg-ink/10">
          <span className="absolute left-0 top-0 h-px w-28 bg-accent" />
        </div>
      </div>
    </section>
  )
}
