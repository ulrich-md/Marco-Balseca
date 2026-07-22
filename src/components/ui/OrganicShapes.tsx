/* Formas orgánicas tono sobre tono — patrón institucional del Gobierno del
   Estado de Puebla (blobs suaves guinda sobre guinda oscuro), como en
   alejandroarmenta.com.mx. Decorativo, ligero (SVG puro). */
export function OrganicShapes({ opacity = 1 }: { opacity?: number }) {
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
        fill="#9b2247"
        opacity="0.32"
      />
      <path
        d="M1120 -60 C 1320 -20, 1480 120, 1440 300 C 1400 470, 1180 480, 1080 360 C 980 240, 960 60, 1120 -60 Z"
        fill="#9b2247"
        opacity="0.28"
      />
      <path
        d="M540 260 C 700 180, 900 220, 940 360 C 980 500, 840 600, 680 570 C 520 540, 420 380, 540 260 Z"
        stroke="#9b2247"
        strokeWidth="40"
        opacity="0.22"
      />
      <path
        d="M180 40 C 300 -30, 470 10, 500 120 C 530 230, 420 310, 300 290 C 180 270, 90 130, 180 40 Z"
        stroke="#9b2247"
        strokeWidth="26"
        opacity="0.2"
      />
    </svg>
  )
}
