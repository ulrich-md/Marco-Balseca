import type { ReactNode } from 'react'
import { GrecaField } from './Greca'

/* =========================================================================
   ARCO + RETRATO — firma visual del sitio.
   Un arco de medio punto (portal colonial de Tehuacán) con fondo de marca,
   greca sutil, filete dorado interior y el RECORTE de Marco anclado a la base.
   El recorte vive FUERA del overflow del arco: la cabeza puede "romper" el
   marco por arriba (profundidad, ref. póster editorial).
   `backdrop` = imagen generada opcional (paisaje/textura); si no existe, se
   oculta sola y queda el degradado de marca (nunca imagen rota).
   ========================================================================= */

type Tone = 'accent' | 'sand' | 'cream' | 'marigold'

type Props = {
  /** ruta base del recorte SIN extensión (usa .webp y -sm.webp) */
  cutout: string
  alt: string
  backdrop?: string
  tone?: Tone
  className?: string
  /** tamaño/posición del recorte dentro del arco */
  cutoutClassName?: string
  eager?: boolean
  children?: ReactNode
}

const TONES: Record<Tone, { bg: string; grecaColor: string; grecaOpacity: number; ring: string; glow: string }> = {
  accent: {
    bg: 'bg-gradient-to-b from-accent-soft via-accent to-accent-deep',
    grecaColor: 'var(--color-sand)',
    grecaOpacity: 0.09,
    ring: 'border-sand/45',
    glow: 'radial-gradient(60% 45% at 50% 30%, rgba(230,209,148,0.28), transparent 70%)',
  },
  sand: {
    bg: 'bg-gradient-to-b from-[#f1e3b4] via-sand to-[#cfb26a]',
    grecaColor: 'var(--color-accent)',
    grecaOpacity: 0.08,
    ring: 'border-accent/30',
    glow: 'radial-gradient(60% 45% at 50% 30%, rgba(255,255,255,0.55), transparent 70%)',
  },
  marigold: {
    bg: 'bg-gradient-to-b from-[#f0c060] via-marigold to-marigold-deep',
    grecaColor: 'var(--color-accent)',
    grecaOpacity: 0.09,
    ring: 'border-cream/70',
    glow: 'radial-gradient(60% 45% at 50% 30%, rgba(255,240,200,0.6), transparent 70%)',
  },
  cream: {
    bg: 'bg-gradient-to-b from-white via-cream to-cream-deep',
    grecaColor: 'var(--color-accent)',
    grecaOpacity: 0.06,
    ring: 'border-gold/40',
    glow: 'radial-gradient(60% 45% at 50% 30%, rgba(255,255,255,0.8), transparent 70%)',
  },
}

export function ArchPortrait({
  cutout,
  alt,
  backdrop,
  tone = 'accent',
  className = '',
  cutoutClassName = 'w-[96%]',
  eager = false,
  children,
}: Props) {
  const t = TONES[tone]
  return (
    <div className={`relative ${className}`}>
      {/* Arco (fondo) */}
      <div aria-hidden className={`arch absolute inset-0 overflow-hidden ${t.bg}`}>
        {backdrop && (
          <img
            src={backdrop}
            alt=""
            loading={eager ? 'eager' : 'lazy'}
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover opacity-45 mix-blend-luminosity"
            onError={(e) => {
              e.currentTarget.style.display = 'none'
            }}
          />
        )}
        <div className="absolute inset-0" style={{ background: t.glow }} />
        <GrecaField color={t.grecaColor} opacity={t.grecaOpacity} size={64} />
        {/* sombra interior en la base: asienta el recorte */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/25 to-transparent" />
      </div>
      {/* Filete dorado interior */}
      <div aria-hidden className={`arch pointer-events-none absolute inset-3 border md:inset-4 ${t.ring}`} />

      {/* Recorte de Marco anclado a la base */}
      <picture>
        <source media="(max-width: 640px)" srcSet={`${cutout}-sm.webp`} type="image/webp" />
        <img
          src={`${cutout}.webp`}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          className={`absolute bottom-0 left-1/2 h-auto -translate-x-1/2 drop-shadow-[0_24px_30px_rgba(59,14,21,0.35)] ${cutoutClassName}`}
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
        />
      </picture>

      {children}
    </div>
  )
}
