import { useRef } from 'react'
import { useReducedMotion } from 'framer-motion'
import type { Reel } from '../../data/reels'

type Props = {
  reel: Reel
  index: number
  onOpen: (reel: Reel) => void
}

const PlayIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
    <path d="M8 5v14l11-7z" />
  </svg>
)

/**
 * Tarjeta de reel 9:16 en B&N. Si hay MP4 propio, reproduce en hover (muted).
 * Si no, muestra un bloque gris/negro neutro. Click -> lightbox.
 */
export function ReelCard({ reel, index, onOpen }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const reduce = useReducedMotion()

  const handleEnter = () => {
    if (reduce || !reel.src || !videoRef.current) return
    videoRef.current.play().catch(() => {})
  }
  const handleLeave = () => {
    if (!videoRef.current) return
    videoRef.current.pause()
    videoRef.current.currentTime = 0
  }

  return (
    <button
      type="button"
      onClick={() => onOpen(reel)}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="group relative block aspect-[9/16] w-full overflow-hidden rounded-sm bg-black text-left transition-transform duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 focus-visible:-translate-y-1.5"
      aria-label={`Ver reel: ${reel.titulo}`}
    >
      {reel.src ? (
        <video
          ref={videoRef}
          src={reel.src}
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover opacity-90 grayscale transition-all duration-500 group-hover:grayscale-0"
        />
      ) : (
        // Bloque B&N placeholder. REEMPLAZAR: thumbnail real del reel.
        <div className="absolute inset-0 bg-gradient-to-b from-[#222] to-[#0b0b0b]">
          <span className="font-display absolute -right-2 -top-3 text-[7rem] leading-none text-white/[0.06]">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />

      {/* marco accent fino al hover */}
      <span aria-hidden className="pointer-events-none absolute inset-2.5 border border-accent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-accent transition-transform duration-300 group-hover:scale-110">
        <PlayIcon />
      </span>

      <div className="absolute inset-x-0 bottom-0 p-4">
        <span className="eyebrow text-accent-soft">Reel · 9:16</span>
        <h3 className="font-condensed mt-1 text-lg font-semibold leading-tight text-white">
          {reel.titulo}
        </h3>
      </div>
    </button>
  )
}
