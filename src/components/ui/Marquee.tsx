type Props = {
  tone?: 'guinda' | 'bone'
  /** segundos por ciclo (más alto = más lento) */
  speed?: number
  outline?: boolean
}

const SEGMENTS = ['TIUI CHIKAVAK', 'VÁMONOS RECIO', 'POR TEHUACÁN', 'POR NUESTRA GENTE']

/**
 * Marquee lento e infinito con el lema. CSS puro, pausable en hover.
 * Se detiene con prefers-reduced-motion (regla global en index.css).
 */
export function Marquee({ tone = 'guinda', speed = 34, outline = false }: Props) {
  const bg = tone === 'guinda' ? 'bg-guinda text-bone' : 'bg-bone text-guinda'
  const sep = tone === 'guinda' ? 'text-sand' : 'text-guinda-soft'

  // Una "unidad" se repite 2 veces; translateX(-50%) hace el loop continuo.
  const unit = (
    <div className="flex shrink-0 items-center">
      {SEGMENTS.map((s, i) => (
        <span key={i} className="flex items-center">
          <span
            className={`font-display text-3xl md:text-5xl leading-none px-6 ${
              outline ? 'text-outline' : ''
            }`}
          >
            {s}
          </span>
          <span aria-hidden className={`text-xl md:text-2xl ${sep}`}>
            ✶
          </span>
        </span>
      ))}
    </div>
  )

  return (
    <div className={`group relative w-full overflow-hidden py-5 ${bg}`} aria-hidden>
      <div
        className="flex w-max will-change-transform group-hover:[animation-play-state:paused]"
        style={{ animation: `marquee ${speed}s linear infinite` }}
      >
        {unit}
        {unit}
      </div>
    </div>
  )
}
