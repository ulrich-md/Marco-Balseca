/* Muro de Facebook embebido (plugin oficial de página). Muestra las
   publicaciones recientes de @balseca y se actualiza solo, sin API ni token.
   Nota: es un embed oficial de Facebook; algunos antivirus lo marcan por
   heurística — por eso incluye enlace directo de respaldo. Detrás del iframe
   hay un panel de marca (retrato + enlace) que se ve mientras carga o si el
   navegador bloquea el plugin: nunca queda una caja vacía. */
import { FacebookIcon } from './Icons'

const FB_URL = 'https://www.facebook.com/balseca'
const TIMELINE = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
  FB_URL,
)}&tabs=timeline&width=500&height=640&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false`

export function FacebookRecentPosts() {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink/8 bg-white shadow-soft">
      <div className="flex items-center justify-between border-b border-ink/8 px-4 py-3">
        <span className="flex items-center gap-2.5">
          <span aria-hidden className="grid h-7 w-7 place-items-center rounded-full bg-accent text-white">
            <FacebookIcon className="h-3.5 w-3.5" />
          </span>
          <span className="eyebrow text-accent">Facebook · @balseca</span>
        </span>
        <a
          href={FB_URL}
          target="_blank"
          rel="noreferrer"
          className="eyebrow inline-flex min-h-[44px] items-center text-mute transition-colors hover:text-accent"
        >
          Seguir ↗
        </a>
      </div>
      <div className="relative h-[500px] sm:h-[640px]">
        {/* Panel de marca de respaldo (debajo del iframe) */}
        <a
          href={FB_URL}
          target="_blank"
          rel="noreferrer"
          aria-hidden
          tabIndex={-1}
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-cream to-white"
        >
          <span className="relative">
            <img
              src="/assets/portraits/marco-formal-sm.webp"
              alt=""
              loading="lazy"
              decoding="async"
              className="h-24 w-24 rounded-full object-cover ring-4 ring-white shadow-soft"
            />
            <span className="absolute -bottom-1 -right-1 grid h-8 w-8 place-items-center rounded-full bg-accent text-white ring-4 ring-white">
              <FacebookIcon className="h-4 w-4" />
            </span>
          </span>
          <span className="eyebrow text-accent">Facebook · @balseca</span>
        </a>
        <iframe
          title="Publicaciones recientes de Marco Balseca en Facebook"
          src={TIMELINE}
          className="relative block h-full w-full"
          style={{ border: 'none', background: 'transparent' }}
          scrolling="no"
          frameBorder={0}
          loading="lazy"
          allow="encrypted-media; picture-in-picture; web-share"
        />
      </div>
    </div>
  )
}
