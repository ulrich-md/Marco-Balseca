import { igEmbedSrc } from '../../lib/instagram'
import { tiktokEmbedSrc } from '../../lib/tiktok'
import { ButtonAnchor } from './Button'
import type { Reel } from '../../data/reels'

/* Embed unificado para VIDEOS: Reel de Instagram o TikTok, embebido en iframe
   oficial. Lazy-load. Si el enlace no es válido, muestra un botón (sin romperse). */

type Props = { video: Reel; className?: string }

export function VideoEmbed({ video, className = '' }: Props) {
  const isTikTok = video.kind === 'tiktok'
  const url = isTikTok ? video.tiktokUrl : video.instagramUrl
  const src = isTikTok ? tiktokEmbedSrc(video.tiktokUrl) : igEmbedSrc(video.instagramUrl)
  const platform = isTikTok ? 'TikTok' : 'Reel'

  return (
    <figure className={`overflow-hidden rounded-sm border border-ink/12 bg-white ${className}`}>
      {src ? (
        <iframe
          src={src}
          title={video.titulo || `${platform} de Marco Balseca`}
          className="block h-[620px] w-full"
          style={{ border: 'none' }}
          scrolling="no"
          frameBorder={0}
          loading="lazy"
          allow="encrypted-media; clipboard-write; picture-in-picture; web-share; fullscreen"
          allowFullScreen
        />
      ) : (
        <div className="flex h-[620px] flex-col items-center justify-center gap-4 p-6 text-center">
          <span className="eyebrow text-accent">{platform}</span>
          <p className="text-sm text-mute">{video.titulo}</p>
          <ButtonAnchor href={url ?? '#'} tone="accent" variant="solid" arrow>
            Ver en {platform}
          </ButtonAnchor>
        </div>
      )}
      {video.titulo && (
        <figcaption className="border-t border-ink/10 px-4 py-3">
          <span className="eyebrow text-accent">{platform}</span>
          <p className="font-condensed mt-1 text-base font-semibold leading-tight text-ink">
            {video.titulo}
          </p>
        </figcaption>
      )}
    </figure>
  )
}
