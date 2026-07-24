/* Formas orgánicas tono sobre tono — patrón institucional del Gobierno del
   Estado de Puebla, como en alejandroarmenta.com.mx. Decorativo y ligero.
   tone 'dark'  → blobs guinda sobre guinda oscuro (footer, CTA)
   tone 'light' → blobs crema profundo sobre crema (noticias, hero) */
export function OrganicShapes({
  opacity = 1,
  tone = 'dark',
}: {
  opacity?: number
  tone?: 'dark' | 'light'
}) {
  const c = tone === 'dark' ? '#711924' : '#eee0c6'
  const strong = tone === 'dark' ? 0.32 : 0.55
  const soft = tone === 'dark' ? 0.22 : 0.4
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
        d="M-80 620 C 60 470, 260 480, 360 600 S 520 830, 340 890 C 180 940, -40 850, -80 720 Z"
        fill={c}
        opacity={strong}
      />
      <path
        d="M1120 -60 C 1320 -20, 1480 120, 1440 300 C 1400 470, 1180 480, 1080 360 C 980 240, 960 60, 1120 -60 Z"
        fill={c}
        opacity={strong * 0.85}
      />
      <path
        d="M540 260 C 700 180, 900 220, 940 360 C 980 500, 840 600, 680 570 C 520 540, 420 380, 540 260 Z"
        stroke={c}
        strokeWidth="40"
        opacity={soft}
      />
      <path
        d="M180 40 C 300 -30, 470 10, 500 120 C 530 230, 420 310, 300 290 C 180 270, 90 130, 180 40 Z"
        stroke={c}
        strokeWidth="26"
        opacity={soft * 0.9}
      />
    </svg>
  )
}
