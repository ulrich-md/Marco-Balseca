import { igEmbedSrc } from '../../lib/instagram'
import { ButtonAnchor } from './Button'

/* Reel de Instagram EMBEBIDO en la web (iframe oficial /embed). Lazy-load.
   Si el enlace no es válido, muestra un botón a Instagram (sin romperse). */

type Props = { url?: string; titulo?: string; className?: string }

export function InstagramEmbed({ url, titulo, className = '' }: Props) {
  const src = igEmbedSrc(url)

  return (
    <figure className={`overflow-hidden rounded-sm border border-ink/12 bg-white ${className}`}>
      {src ? (
        <iframe
          src={src}
          title={titulo || 'Reel de Instagram de Marco Balseca'}
          className="block h-[620px] w-full"
          style={{ border: 'none' }}
          scrolling="no"
          frameBorder={0}
          loading="lazy"
          allow="encrypted-media; clipboard-write; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <div className="flex h-[620px] flex-col items-center justify-center gap-4 p-6 text-center">
          <span className="eyebrow text-accent">Instagram</span>
          <p className="text-sm text-mute">{titulo}</p>
          <ButtonAnchor href={url ?? '#'} tone="accent" variant="solid" arrow>
            Ver en Instagram
          </ButtonAnchor>
        </div>
      )}
      {titulo && (
        <figcaption className="border-t border-ink/10 px-4 py-3">
          <span className="eyebrow text-accent">Reel</span>
          <p className="font-condensed mt-1 text-base font-semibold leading-tight text-ink">{titulo}</p>
        </figcaption>
      )}
    </figure>
  )
}
