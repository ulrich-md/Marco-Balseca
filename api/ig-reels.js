/* Función serverless (Vercel) — trae los REELS más recientes de Instagram de
   Marco con la API oficial (Graph API). Devuelve título (1ª línea del caption),
   enlace, PORTADA real (thumbnail_url) y fecha.

   Variables de entorno en Vercel (ver INSTAGRAM_SETUP.md):
     IG_TOKEN    = token de acceso (obligatorio)
     IG_USER_ID  = id de la cuenta profesional de Instagram (opcional)
       · Con IG_USER_ID → ruta "Instagram con Facebook Login" (graph.facebook.com),
         usando un token de PÁGINA (no caduca si se genera desde un token de
         usuario de larga duración).
       · Sin IG_USER_ID → ruta "Instagram Login" (graph.instagram.com/me),
         token de larga duración (~60 días; se renueva).
   Sin IG_TOKEN devuelve vacío y el sitio usa los reels del panel /admin o los
   locales: nunca se rompe. */

const FIELDS = 'id,caption,media_type,media_product_type,permalink,thumbnail_url,timestamp'

function titleFrom(caption = '') {
  const first = caption
    .split('\n')
    .map((l) => l.trim())
    .find((l) => l && !l.startsWith('#'))
  if (!first) return 'Reel de Marco Balseca'
  const clean = first.replace(/\s#\S+/g, '').trim()
  return clean.length > 90 ? `${clean.slice(0, 87).trimEnd()}…` : clean
}

export default async function handler(_req, res) {
  const TOKEN = process.env.IG_TOKEN
  const USER = process.env.IG_USER_ID

  if (!TOKEN) {
    res.status(200).json({ reels: [], configured: false })
    return
  }

  const base = USER
    ? `https://graph.facebook.com/v21.0/${USER}/media`
    : 'https://graph.instagram.com/v21.0/me/media'

  try {
    const r = await fetch(`${base}?fields=${FIELDS}&limit=40&access_token=${encodeURIComponent(TOKEN)}`)
    const data = await r.json()
    if (data.error) {
      res.status(200).json({ reels: [], configured: true, error: data.error.message })
      return
    }

    const reels = (data.data || [])
      .filter((m) => m.media_product_type === 'REELS' || m.media_type === 'VIDEO')
      .filter((m) => m.permalink)
      .slice(0, 24)
      .map((m) => ({
        id: `ig-${m.id}`,
        titulo: titleFrom(m.caption),
        instagramUrl: m.permalink,
        poster: m.thumbnail_url || null,
        fecha: m.timestamp || null,
      }))

    // Cache en el edge: 30 min, sirviendo viejo mientras revalida (las URLs de
    // portada de Instagram son firmadas y caducan; así se refrescan solas).
    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=21600')
    res.status(200).json({ reels, configured: true })
  } catch (e) {
    res.status(200).json({ reels: [], configured: true, error: String(e) })
  }
}
