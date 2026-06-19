type Props = {
  tone?: 'dark' | 'light'
  /** segundos por ciclo (más alto = más lento) */
  speed?: number
}

const SEGMENTS = ['MARCO BALSECA', 'POR TEHUACÁN', 'CERCA DE LA GENTE', 'SÚMATE']

/**
 * Marquee lento e infinito. B&N con un cuadrito rojo como separador
 * (acento único). CSS puro, pausable en hover. Respeta reduced-motion.
 */
export function Marquee({ tone = 'dark', speed = 34 }: Props) {
  const bg = tone === 'dark' ? 'bg-black text-white' : 'bg-white text-ink border-y border-ink/10'

  const unit = (
    <div className="flex shrink-0 items-center">
      {SEGMENTS.map((s, i) => (
        <span key={i} className="flex items-center">
          <span className="font-display text-3xl leading-none px-6 md:text-5xl">{s}</span>
          <span aria-hidden className="h-2 w-2 shrink-0 bg-accent" />
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
