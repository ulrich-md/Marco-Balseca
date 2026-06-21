/* =========================================================================
   Perfil de Facebook EMBEBIDO (plugin oficial, iframe). Carga "normal".
   Nota: algunos antivirus (Malwarebytes) pueden marcar los plugins de FB como
   "phishing" por heurística; por eso se incluye enlace directo de respaldo.
   ========================================================================= */

const FB_URL = 'https://www.facebook.com/balseca'
const PAGE_PLUGIN = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
  FB_URL,
)}&tabs=timeline&width=400&height=560&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`

export function FacebookProfileCard({ className = '' }: { className?: string }) {
  return (
    <div className={`overflow-hidden rounded-md border border-ink/12 bg-white ${className}`}>
      <div className="flex items-center justify-between border-b border-ink/10 px-4 py-3">
        <span className="eyebrow text-accent">Facebook · @balseca</span>
        <a
          href={FB_URL}
          target="_blank"
          rel="noreferrer"
          className="eyebrow text-mute transition-colors hover:text-accent"
        >
          Ver ↗
        </a>
      </div>
      <iframe
        title="Página de Facebook de Marco Balseca"
        src={PAGE_PLUGIN}
        className="h-[560px] w-full"
        style={{ border: 'none', overflow: 'hidden' }}
        scrolling="no"
        frameBorder={0}
        loading="lazy"
        allow="encrypted-media; picture-in-picture; web-share"
      />
    </div>
  )
}
