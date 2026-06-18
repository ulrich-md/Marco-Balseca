type Props = {
  tone?: 'dark' | 'light'
  /** segundos por ciclo (más alto = más lento) */
  speed?: number
}

const SEGMENTS = ['TIUI CHIKAVAK', 'VÁMONOS RECIO', 'POR TEHUACÁN', 'POR NUESTRA GENTE']

/**
 * Marquee lento e infinito con el lema. B&N con guinda como separador.
 * CSS puro, pausable en hover. Se detiene con prefers-reduced-motion.
 */
export function Marquee({ tone = 'dark', speed = 34 }: Props) {
  const bg = tone === 'dark' ? 'bg-black text-white' : 'bg-white text-ink border-y border-ink/10'

  const unit = (
    <div className="flex shrink-0 items-center">
      {SEGMENTS.map((s, i) => (
        <span key={i} className="flex items-center">
          <span className="font-display text-3xl leading-none px-6 md:text-5xl">{s}</span>
          <span aria-hidden className="px-2 text-xl text-guinda md:text-2xl">
            ✦
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
