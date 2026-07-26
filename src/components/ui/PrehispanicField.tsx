/* =========================================================================
   Campo de símbolos prehispánicos (Mixteca-Puebla / Nahua) que emerge de la
   ESQUINA superior izquierda y se DIFUMINA hacia el centro-derecha y hacia
   abajo (máscara radial). Line-art guinda muy sutil sobre blanco: grecas
   escalonadas (xicalcoliuhqui), espirales cuadradas, chevrones y quincunces.
   Confinado a la zona del nombre → NO compite con el cuerpo ni el teléfono.
   ========================================================================= */

const ACCENT = '#611232'

// Densidad concentrada arriba-izq; se apaga antes del centro y del botón.
const MASK = 'radial-gradient(115% 82% at -4% -12%, #000 0%, #000 20%, transparent 58%)'

export function PrehispanicField({
  className = '',
  opacity = 0.26,
}: {
  className?: string
  opacity?: number
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-y-0 left-0 w-full max-w-[760px] ${className}`}
      style={{ opacity, WebkitMaskImage: MASK, maskImage: MASK }}
    >
      <svg className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
          <pattern id="mb-glifos" width="132" height="132" patternUnits="userSpaceOnUse">
            <g fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
              {/* greca escalonada (arriba-izq) */}
              <path d="M8 44 L8 14 L38 14 L38 36 L20 36 L20 24 L30 24" />
              {/* espiral cuadrada / xicalcoliuhqui (arriba-der) */}
              <path d="M78 12 L108 12 L108 42 L84 42 L84 24 L98 24 L98 32" />
              {/* chevrones anidados (abajo-izq) */}
              <path d="M10 104 L26 86 L42 104" />
              <path d="M16 108 L26 96 L36 108" />
              {/* greca invertida (abajo-der) */}
              <path d="M120 92 L120 118 L92 118 L92 98 L108 98 L108 108 L100 108" strokeLinecap="round" />
            </g>
            {/* quincunx (cruz de 5 puntos) */}
            <g fill={ACCENT}>
              <circle cx="62" cy="62" r="2.2" />
              <circle cx="50" cy="62" r="1.8" />
              <circle cx="74" cy="62" r="1.8" />
              <circle cx="62" cy="50" r="1.8" />
              <circle cx="62" cy="74" r="1.8" />
              <circle cx="118" cy="60" r="1.6" />
              <circle cx="30" cy="72" r="1.6" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mb-glifos)" />
      </svg>
    </div>
  )
}
