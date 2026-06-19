type Props = {
  className?: string
  /** muestra la nota de reemplazo (solo cuando NO hay foto real) */
  note?: boolean
  /** B&N: bloque gris claro o negro */
  tone?: 'grey' | 'black'
  /** marco accent fino (ref. Yeezy) */
  frame?: boolean
  rounded?: string
  /** Foto real. Si se define, se muestra en lugar del placeholder.
   *  Ej: src="/assets/retrato/marco-hero.jpg" (archivo en public/assets/...) */
  src?: string
  /** Texto alternativo (accesibilidad) cuando hay foto real */
  alt?: string
  /** Convierte la foto a blanco y negro para conservar el sistema editorial */
  grayscale?: boolean
}

/**
 * Retrato en BLANCO Y NEGRO.
 * - Con `src`: muestra la foto real (object-cover, B&N por defecto).
 * - Sin `src`: dibuja una silueta digna en gris/negro neutro (placeholder).
 * El accent solo aparece como marco fino opcional. Nunca usa URLs rotas.
 */
export function PortraitPlaceholder({
  className = '',
  note = true,
  tone = 'grey',
  frame = false,
  rounded = 'rounded-none',
  src,
  alt = 'Marco Balseca',
  grayscale = true,
}: Props) {
  const base =
    tone === 'black'
      ? 'bg-gradient-to-b from-[#1c1c1c] to-[#0b0b0b]'
      : 'bg-gradient-to-b from-[#ededed] to-[#cfcfcf]'
  const figFrom = tone === 'black' ? '#3a3a3a' : '#bdbdbd'
  const figTo = tone === 'black' ? '#161616' : '#dcdcdc'
  const noteCls = tone === 'black' ? 'bg-white/12 text-white/85' : 'bg-black/45 text-white/90'

  return (
    <div
      className={`relative overflow-hidden ${rounded} ${base} ${className}`}
      role="img"
      aria-label={src ? alt : 'Retrato de Marco Balseca (pendiente de reemplazar)'}
    >
      {src ? (
        // Foto real
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover ${grayscale ? 'grayscale' : ''}`}
        />
      ) : (
        // Silueta busto B&N (placeholder)
        <svg
          aria-hidden
          viewBox="0 0 400 520"
          preserveAspectRatio="xMidYMax meet"
          className="absolute bottom-0 left-1/2 h-[90%] -translate-x-1/2"
        >
          <defs>
            <linearGradient id={`fig-${tone}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={figFrom} />
              <stop offset="100%" stopColor={figTo} />
            </linearGradient>
          </defs>
          <path d="M40 520 C 40 410, 120 360, 200 360 C 280 360, 360 410, 360 520 Z" fill={`url(#fig-${tone})`} />
          <circle cx="200" cy="250" r="92" fill={`url(#fig-${tone})`} />
        </svg>
      )}

      {/* Marco accent fino (ref. Yeezy) */}
      {frame && (
        <span aria-hidden className="pointer-events-none absolute inset-3 border border-accent md:inset-4" />
      )}

      {note && !src && (
        <span
          className={`absolute bottom-3 left-3 rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] backdrop-blur-sm ${noteCls}`}
        >
          REEMPLAZAR · @marcobalseca1
        </span>
      )}
    </div>
  )
}
