type Props = {
  className?: string
  /** muestra la nota de reemplazo (solo cuando NO hay foto real) */
  note?: boolean
  /** B&N: bloque gris claro o negro (también es el color de fallback si la foto falta) */
  tone?: 'grey' | 'black'
  /** marco accent fino (ref. Yeezy) */
  frame?: boolean
  rounded?: string
  /** Foto real. Ej: src="/assets/portraits/marco-hero.png" */
  src?: string
  /** Texto alternativo (accesibilidad) cuando hay foto real */
  alt?: string
  /** Pasa la foto a blanco y negro. Por defecto FALSE: las fotos van a color
   *  (a color se sienten vivas/cercanas; el B&N se veía apagado). */
  grayscale?: boolean
  /** 'cover' (recorta) o 'contain' (recorte transparente, sin recortar) */
  fit?: 'cover' | 'contain'
  /** sombra suave (ideal para recortes transparentes) */
  shadow?: boolean
}

/**
 * Retrato en BLANCO Y NEGRO.
 * - Con `src`: muestra la foto real. Si la foto faltara o fallara la carga,
 *   se oculta el <img> y queda el color de fondo del bloque (gris/negro):
 *   nunca se ve un ícono de imagen rota.
 * - Sin `src`: dibuja una silueta digna (placeholder).
 */
export function PortraitPlaceholder({
  className = '',
  note = true,
  tone = 'grey',
  frame = false,
  rounded = 'rounded-none',
  src,
  alt = 'Marco Balseca',
  grayscale = false,
  fit = 'cover',
  shadow = false,
}: Props) {
  const base =
    tone === 'black'
      ? 'bg-gradient-to-b from-[#1c1c1c] to-[#0b0b0b]'
      : 'bg-gradient-to-b from-[#ededed] to-[#cfcfcf]'
  const figFrom = tone === 'black' ? '#3a3a3a' : '#bdbdbd'
  const figTo = tone === 'black' ? '#161616' : '#dcdcdc'
  const noteCls = tone === 'black' ? 'bg-white/12 text-white/85' : 'bg-black/45 text-white/90'

  const imgCls = [
    'absolute inset-0 h-full w-full',
    fit === 'contain' ? 'object-contain object-bottom' : 'object-cover',
    grayscale ? 'grayscale' : '',
    shadow ? 'drop-shadow-2xl' : '',
  ].join(' ')

  return (
    <div
      className={`relative overflow-hidden ${rounded} ${base} ${className}`}
      role="img"
      aria-label={src ? alt : 'Retrato de Marco Balseca (pendiente de reemplazar)'}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className={imgCls}
          // Fallback de color: si la foto falta, se oculta y queda el bloque.
          onError={(e) => {
            e.currentTarget.style.display = 'none'
          }}
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
        <span aria-hidden className="pointer-events-none absolute inset-3 z-10 border border-accent md:inset-4" />
      )}

      {note && !src && (
        <span
          className={`absolute bottom-3 left-3 z-10 rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] backdrop-blur-sm ${noteCls}`}
        >
          REEMPLAZAR · @marcobalseca1
        </span>
      )}
    </div>
  )
}
