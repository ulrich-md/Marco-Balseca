import { useState } from 'react'
import { igEmbedSrc } from '../../lib/instagram'
import { tiktokEmbedSrc } from '../../lib/tiktok'
import { ButtonAnchor } from './Button'
import type { Reel } from '../../data/reels'

/* Embed unificado para VIDEOS: Reel de Instagram o TikTok, embebido en iframe
   oficial. Patrón FACADE: primero se muestra una portada ligera (foto real +
   botón de play) y el iframe de Instagram/TikTok se carga SOLO al tocarla.
   → sin cajas blancas vacías, página mucho más ligera y sin rastreo de
   terceros hasta que la persona decide ver el video.
   Si el enlace no es válido, muestra un botón (sin romperse). */

/** Portadas de respaldo (fotos reales en territorio) si el reel no trae una. */
export const REEL_POSTERS = [
  '/assets/comunidad/comunidad-visita.webp',
  '/assets/acciones/accion-deporte-voleibol.webp',
  '/assets/acciones/accion-deporte-copa.webp',
  '/assets/comunidad/comunidad-cancha.webp',
  '/assets/acciones/accion-educacion.webp',
  '/assets/comunidad/comunidad-mercado.webp',
  '/assets/acciones/accion-obra-cancha.webp',
  '/assets/comunidad/comunidad-familia.webp',
]

type Props = {
  video: Reel
  className?: string
  /** foto de portada; si falta se usa una real según `index` */
  poster?: string
  index?: number
  theme?: 'light' | 'dark'
}

export function VideoEmbed({ video, className = '', poster, index = 0, theme = 'light' }: Props) {
  const [playing, setPlaying] = useState(false)
  const isTikTok = video.kind === 'tiktok'
  const url = isTikTok ? video.tiktokUrl : video.instagramUrl
  const src = isTikTok ? tiktokEmbedSrc(video.tiktokUrl) : igEmbedSrc(video.instagramUrl)
  const platform = isTikTok ? 'TikTok' : 'Reel'
  // Portada: 1) la que se pase por props, 2) /assets/reels/<id>.webp si existe
  // (captura real del video), 3) foto real de respaldo.
  const fallback = REEL_POSTERS[index % REEL_POSTERS.length]
  const [cover, setCover] = useState(poster ?? video.poster ?? `/assets/reels/${video.id}.webp`)
  const dark = theme === 'dark'

  return (
    <figure
      className={`group overflow-hidden rounded-2xl border ${
        dark ? 'border-white/10 bg-white/[0.04]' : 'border-ink/10 bg-white shadow-soft'
      } ${className}`}
    >
      {src ? (
        playing ? (
          <iframe
            src={src}
            title={video.titulo || `${platform} de Marco Balseca`}
            className="block h-[620px] w-full bg-white"
            style={{ border: 'none' }}
            scrolling="no"
            frameBorder={0}
            allow="autoplay; encrypted-media; clipboard-write; picture-in-picture; web-share; fullscreen"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={`${platform}: ${video.titulo}`}
            className="relative block h-[520px] w-full cursor-pointer overflow-hidden bg-accent-deep text-left sm:h-[460px] lg:h-[480px]"
          >
            <img
              src={cover}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
              onError={(e) => {
                if (cover !== fallback) setCover(fallback)
                else e.currentTarget.style.display = 'none'
              }}
            />
            <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-wine via-wine/30 to-black/10" />
            {/* Play */}
            <span
              aria-hidden
              className="absolute left-1/2 top-1/2 grid h-16 w-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/95 text-accent shadow-lift transition-transform duration-300 group-hover:scale-110"
            >
              <span className="absolute inset-0 animate-ping rounded-full bg-white/30 [animation-duration:2.4s]" />
              <svg viewBox="0 0 24 24" className="relative ml-1 h-6 w-6" fill="currentColor">
                <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.2-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
              </svg>
            </span>
            <span aria-hidden className="eyebrow absolute left-4 top-4 rounded-full bg-black/35 px-3 py-1.5 text-white backdrop-blur-sm">
              {platform}
            </span>
          </button>
        )
      ) : (
        <div className="flex h-[480px] flex-col items-center justify-center gap-4 p-6 text-center">
          <span className="eyebrow text-accent">{platform}</span>
          <p className={`text-sm ${dark ? 'text-white/60' : 'text-mute'}`}>{video.titulo}</p>
          <ButtonAnchor href={url ?? '#'} tone="accent" variant="solid" arrow>
            Ver en {platform}
          </ButtonAnchor>
        </div>
      )}
      {video.titulo && (
        <figcaption className={`border-t px-4 py-3 ${dark ? 'border-white/10' : 'border-ink/10'}`}>
          <span className={`eyebrow ${dark ? 'text-sand' : 'text-accent'}`}>{platform}</span>
          <p
            className={`font-condensed mt-1 text-base font-semibold leading-tight ${dark ? 'text-white' : 'text-ink'}`}
          >
            {video.titulo}
          </p>
        </figcaption>
      )}
    </figure>
  )
}
