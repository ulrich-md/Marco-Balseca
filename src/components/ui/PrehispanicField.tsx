/* =========================================================================
   Campo de símbolos prehispánicos (Mixteca-Puebla / Nahua) que emerge del
   margen IZQUIERDO y se DEGRADA hacia la derecha. Line-art guinda muy sutil
   sobre blanco: grecas escalonadas (xicalcoliuhqui), espirales cuadradas,
   chevrones y quincunces (cruz de puntos). Decorativo, ligero (SVG puro).
   La densidad "cae" a la derecha mediante una máscara de gradiente.
   ========================================================================= */

const ACCENT = '#9b2247'

export function PrehispanicField({
  className = '',
  opacity = 0.4,
}: {
  className?: string
  opacity?: number
}) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-y-0 left-0 w-full max-w-[820px] ${className}`}
      style={{
        opacity,
        WebkitMaskImage: 'linear-gradient(to right, #000 0%, #000 20%, transparent 72%)',
        maskImage: 'linear-gradient(to right, #000 0%, #000 20%, transparent 72%)',
      }}
    >
      <svg className="h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden>
        <defs>
          <pattern id="mb-glifos" width="132" height="132" patternUnits="userSpaceOnUse">
            <g fill="none" stroke={ACCENT} strokeWidth="2.2" strokeLinecap="square" strokeLinejoin="miter">
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
            {/* quincunx (cruz de 5 puntos, centro) */}
            <g fill={ACCENT}>
              <circle cx="62" cy="62" r="2.4" />
              <circle cx="50" cy="62" r="2" />
              <circle cx="74" cy="62" r="2" />
              <circle cx="62" cy="50" r="2" />
              <circle cx="62" cy="74" r="2" />
              <circle cx="118" cy="60" r="1.8" />
              <circle cx="30" cy="72" r="1.8" />
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#mb-glifos)" />
      </svg>
    </div>
  )
}
