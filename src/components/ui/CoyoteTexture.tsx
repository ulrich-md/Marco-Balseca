import { useMemo } from 'react'

/* =========================================================================
   Textura institucional: patrón del COYOTE (símbolo de Puebla), tono sobre
   tono, en teselado. Es la textura de fondo del sitio (guinda del Gobierno
   del Estado). Line-art vectorial ligero; color y opacidad configurables:
   - sobre guinda  → color="#ffffff" (líneas claras)
   - sobre crema   → color="#9b2247" (líneas guinda)
   Validado renderizando con Chromium sobre #9b2247, #611232 y crema.
   ========================================================================= */

// Cabeza de coyote estilizada (perfil a la izquierda: hocico, orejas, ojo).
const COYOTE =
  'M8 66 L46 56 L60 38 L67 38 L74 14 L82 38 L92 33 L101 10 L109 38 L114 50 L108 68 L88 74 L78 82 L50 76 L30 70 Z'
const MOUTH = 'M8 66 L44 66 L64 63'

let _uid = 0
const nextId = () => `coy${++_uid}`

export function CoyoteTexture({
  color = '#ffffff',
  opacity = 0.09,
  className = '',
}: {
  color?: string
  opacity?: number
  className?: string
}) {
  const id = useMemo(nextId, [])
  return (
    <svg aria-hidden fill="none" className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}>
      <defs>
        <pattern id={id} width="150" height="112" patternUnits="userSpaceOnUse">
          {[false, true].map((offset) => (
            <g
              key={String(offset)}
              transform={offset ? 'translate(75,56)' : undefined}
              fill="none"
              stroke={color}
              strokeOpacity={opacity}
              strokeWidth={2.4}
              strokeLinejoin="round"
              strokeLinecap="round"
            >
              <path d={COYOTE} />
              <path d={MOUTH} />
              <circle cx={70} cy={44} r={2.3} fill={color} fillOpacity={opacity} stroke="none" />
            </g>
          ))}
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}
