import { useEffect, useState } from 'react'

/* =========================================================================
   Publicaciones recientes de Facebook, embebidas y auto-actualizables.
   - Si la Graph API está configurada (api/fb-posts), muestra los 4 posts más
     recientes como embeds individuales (plugins/post.php).
   - Si no, muestra el TIMELINE de la página (plugins/page.php), que también se
     actualiza solo con lo último que publica Marco. (Sin necesidad de token.)
   Nota: son embeds oficiales de Facebook; algunos antivirus los marcan por
   heurística — por eso siempre hay enlace directo a Facebook.
   ========================================================================= */

const FB_URL = 'https://www.facebook.com/balseca'

type Post = { permalink_url: string; message: string; created_time: string; picture: string | null }

const postPlugin = (href: string) =>
  `https://www.facebook.com/plugins/post.php?href=${encodeURIComponent(href)}&show_text=true&width=400`

const timelinePlugin = `https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(
  FB_URL,
)}&tabs=timeline&width=500&height=640&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=false`

export function FacebookRecentPosts() {
  const [posts, setPosts] = useState<Post[]>([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let cancel = false
    fetch('/api/fb-posts')
      .then((r) => r.json())
      .then((d) => {
        if (!cancel && Array.isArray(d.posts)) setPosts(d.posts)
      })
      .catch(() => {})
      .finally(() => !cancel && setReady(true))
    return () => {
      cancel = true
    }
  }, [])

  const hasPosts = posts.length > 0

  return (
    <div>
      <div className="mb-5 flex items-end justify-between">
        <p className="font-condensed text-xl font-semibold uppercase tracking-wide text-ink">
          Publicaciones recientes
        </p>
        <a
          href={FB_URL}
          target="_blank"
          rel="noreferrer"
          className="font-condensed text-sm font-semibold uppercase tracking-wide text-ink transition-colors hover:text-accent"
        >
          Seguir en Facebook ↗
        </a>
      </div>

      {hasPosts ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {posts.slice(0, 4).map((p) => (
            <div key={p.permalink_url} className="overflow-hidden rounded-sm border border-ink/12 bg-white">
              <iframe
                title="Publicación de Facebook de Marco Balseca"
                src={postPlugin(p.permalink_url)}
                className="h-[480px] w-full"
                style={{ border: 'none', overflow: 'hidden' }}
                scrolling="no"
                frameBorder={0}
                loading="lazy"
                allow="encrypted-media; picture-in-picture; web-share"
              />
            </div>
          ))}
        </div>
      ) : (
        // Respaldo sin token: timeline (se actualiza solo). Visible aunque el
        // fetch aún no termine, para que nunca quede en blanco.
        <div className="mx-auto max-w-md overflow-hidden rounded-sm border border-ink/12 bg-white">
          <iframe
            title="Publicaciones recientes de Marco Balseca en Facebook"
            src={timelinePlugin}
            className="h-[640px] w-full"
            style={{ border: 'none', overflow: 'hidden' }}
            scrolling="no"
            frameBorder={0}
            loading="lazy"
            allow="encrypted-media; picture-in-picture; web-share"
          />
          {ready && (
            <p className="border-t border-ink/10 px-4 py-2 text-xs text-mute">
              Mostrando el muro en vivo. Para ver las 4 publicaciones por separado, conecta la API de
              Facebook (ver FACEBOOK_SETUP.md).
            </p>
          )}
        </div>
      )}
    </div>
  )
}
