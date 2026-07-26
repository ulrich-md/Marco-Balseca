/* Formas orgánicas tono sobre tono — patrón institucional del Gobierno del
   Estado de Puebla (ref. alejandroarmenta.com.mx). Curvas suaves distribuidas
   por todo el lienzo, SIEMPRE en un tono ligeramente distinto al fondo para que
   se perciban (nunca del mismo color, si no desaparecen). Decorativo y ligero.
   tone 'dark'  → guinda claro sobre guinda (#611232 / #490d26): footer, CTA,
                  "En territorio", panel derecho del hero
   tone 'gold'  → DORADO oficial (#e6d194) sobre guinda: calidez en el hero
   tone 'light' → crema profundo sobre crema: noticias, testimonios */
export function OrganicShapes({
  opacity = 1,
  tone = 'dark',
}: {
  opacity?: number
  tone?: 'dark' | 'light' | 'gold'
}) {
  const isDark = tone === 'dark'
  const isGold = tone === 'gold'
  // Nota: en dark las formas son un guinda MÁS CLARO que el fondo (#611232/#490d26)
  // para que siempre se perciban; en gold son DORADO cálido sobre guinda; en
  // light reusan el token institucional crema.
  const fillC = isDark ? '#7d244c' : isGold ? 'var(--color-sand)' : 'var(--color-cream-deep)'
  const strokeC = isDark ? '#94315e' : isGold ? '#efe3bd' : '#e6d8b8'
  // Opacidades por forma, calibradas para verse sutiles pero presentes.
  const fA = isGold ? 0.16 : isDark ? 0.34 : 0.55
  const fB = isGold ? 0.13 : isDark ? 0.3 : 0.5
  const sA = isGold ? 0.15 : isDark ? 0.24 : 0.5
  const sB = isGold ? 0.12 : isDark ? 0.2 : 0.45
  const sC = isGold ? 0.1 : isDark ? 0.18 : 0.4
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
      style={{ opacity }}
    >
      <path
        d="M1000 -40 C 1240 -10, 1460 120, 1460 340 C 1460 520, 1240 560, 1080 440 C 940 336, 900 120, 1000 -40 Z"
        fill={fillC}
        opacity={fA}
      />
      <path
        d="M-100 480 C 120 340, 340 380, 440 540 C 540 700, 360 860, 160 840 C -40 820, -160 640, -100 480 Z"
        fill={fillC}
        opacity={fB}
      />
      <path
        d="M980 560 C 1180 480, 1420 540, 1500 720 C 1560 860, 1360 980, 1140 940 C 960 906, 820 660, 980 560 Z"
        fill={fillC}
        opacity={fA}
      />
      <path
        d="M480 240 C 660 160, 880 210, 920 370 C 960 520, 800 620, 620 588 C 460 558, 340 360, 480 240 Z"
        stroke={strokeC}
        strokeWidth="34"
        opacity={sA}
      />
      <path
        d="M120 120 C 260 40, 440 90, 470 210 C 500 330, 360 410, 240 380 C 140 355, 60 220, 120 120 Z"
        stroke={strokeC}
        strokeWidth="22"
        opacity={sB}
      />
      <path
        d="M560 700 C 700 640, 860 690, 880 800 C 900 900, 780 970, 660 940"
        stroke={strokeC}
        strokeWidth="18"
        strokeLinecap="round"
        opacity={sC}
      />
    </svg>
  )
}
