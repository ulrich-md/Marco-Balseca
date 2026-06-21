/* Muro de Facebook embebido (plugin oficial de página). Muestra las
   publicaciones recientes de @balseca y se actualiza solo, sin API ni token.
   Nota: es un embed oficial de Facebook; algunos antivirus lo marcan por
   heurística — por eso incluye enlace directo de respaldo. */

const FB_URL = 'https://www.facebook.com/balseca'
const TIMELINE = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
  FB_URL,
)}&tabs=timeline&width=500&height=640&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false`

export function FacebookRecentPosts() {
  return (
    <div className="overflow-hidden rounded-sm border border-ink/12 bg-white">
      <div className="flex items-center justify-between border-b border-ink/10 px-4 py-3">
        <span className="eyebrow text-accent">Facebook · @balseca</span>
        <a
          href={FB_URL}
          target="_blank"
          rel="noreferrer"
          className="eyebrow text-mute transition-colors hover:text-accent"
        >
          Seguir ↗
        </a>
      </div>
      <iframe
        title="Publicaciones recientes de Marco Balseca en Facebook"
        src={TIMELINE}
        className="block h-[640px] w-full"
        style={{ border: 'none' }}
        scrolling="no"
        frameBorder={0}
        loading="lazy"
        allow="encrypted-media; picture-in-picture; web-share"
      />
    </div>
  )
}
