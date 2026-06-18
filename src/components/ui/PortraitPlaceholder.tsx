type Props = {
  className?: string
  /** muestra la nota de reemplazo */
  note?: boolean
  /** intensidad del fondo */
  tone?: 'deep' | 'guinda'
  rounded?: string
}

/**
 * Retrato heroico — PLACEHOLDER.
 * REEMPLAZAR: retrato oficial recortado de @marcobalseca1 (PNG con fondo
 * transparente). Mientras tanto se dibuja una silueta digna sobre guinda,
 * con arco tipo cartel. Nunca usa URLs rotas.
 */
export function PortraitPlaceholder({
  className = '',
  note = true,
  tone = 'deep',
  rounded = 'rounded-[1.5rem]',
}: Props) {
  const base = tone === 'deep' ? 'bg-guinda-deep' : 'bg-guinda'
  return (
    <div
      className={`relative overflow-hidden ${rounded} ${base} bg-grain ${className}`}
      role="img"
      aria-label="Retrato de Marco Balseca (pendiente de reemplazar)"
    >
      {/* Arco tipo cartel */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-[-10%] top-[8%] h-[120%] rounded-[50%] border border-sand/15"
        style={{ background: 'radial-gradient(120% 80% at 50% 0%, rgba(217,199,168,0.10), transparent 60%)' }}
      />

      {/* Silueta busto */}
      <svg
        aria-hidden
        viewBox="0 0 400 520"
        preserveAspectRatio="xMidYMax meet"
        className="absolute bottom-0 left-1/2 h-[88%] -translate-x-1/2"
      >
        <defs>
          <linearGradient id="figFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8A3145" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#8A3145" stopOpacity="0.18" />
          </linearGradient>
        </defs>
        {/* hombros */}
        <path
          d="M40 520 C 40 410, 120 360, 200 360 C 280 360, 360 410, 360 520 Z"
          fill="url(#figFill)"
        />
        {/* cabeza */}
        <circle cx="200" cy="250" r="92" fill="url(#figFill)" />
      </svg>

      {/* viñeta inferior para anclar texto si se sobrepone */}
      <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-guinda-deep/70 via-transparent to-transparent" />

      {note && (
        <span className="absolute bottom-3 left-3 rounded-full bg-ink/35 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-bone/80 backdrop-blur-sm">
          REEMPLAZAR · @marcobalseca1
        </span>
      )}
    </div>
  )
}
