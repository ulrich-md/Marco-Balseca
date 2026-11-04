import { useId } from 'react'

/* =========================================================================
   GRECA — motivo escalonado (xicalcoliuhqui) del valle de Tehuacán, dibujado
   en SVG puro (0 KB de imagen, nítido a cualquier tamaño, color por props).
   - <GrecaField>: campo de textura que llena el contenedor (fondos).
   - <GrecaBand>: friso horizontal de una fila (divisores / remates).
   ========================================================================= */

const FRET = 'M4 44 V4 H44 V36 H16 V16 H32 V28 H24'

type FieldProps = {
  className?: string
  /** color del trazo (CSS) */
  color?: string
  opacity?: number
  /** tamaño del módulo en px */
  size?: number
  strokeWidth?: number
}

export function GrecaField({
  className = '',
  color = 'currentColor',
  opacity = 0.08,
  size = 56,
  strokeWidth = 3,
}: FieldProps) {
  const id = useId().replace(/:/g, '')
  return (
    <svg aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} style={{ opacity }}>
      <defs>
        <pattern id={`greca-${id}`} width={size} height={size} patternUnits="userSpaceOnUse" viewBox="0 0 48 48">
          <path d={FRET} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="square" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#greca-${id})`} />
    </svg>
  )
}

type BandProps = {
  className?: string
  color?: string
  /** alto del friso en px */
  height?: number
}

export function GrecaBand({ className = '', color = 'currentColor', height = 18 }: BandProps) {
  const id = useId().replace(/:/g, '')
  return (
    <svg aria-hidden className={`block w-full ${className}`} style={{ height }}>
      <defs>
        <pattern id={`band-${id}`} width={height * 2} height={height} patternUnits="userSpaceOnUse" viewBox="0 0 96 48">
          <path d={FRET} fill="none" stroke={color} strokeWidth={4} strokeLinecap="square" />
          <path
            d={FRET}
            transform="translate(96 48) rotate(180) translate(0 0)"
            fill="none"
            stroke={color}
            strokeWidth={4}
            strokeLinecap="square"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#band-${id})`} />
    </svg>
  )
}

/** Ícono suelto de greca (separadores, viñetas). */
export function GrecaMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className} fill="none">
      <path d={FRET} stroke="currentColor" strokeWidth={5} strokeLinecap="square" />
    </svg>
  )
}
