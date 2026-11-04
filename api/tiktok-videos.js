/* Función serverless (Vercel) — trae los videos más recientes de TikTok de
   Marco con la API oficial (TikTok Display API: scopes user.info.basic y
   video.list). Devuelve título, enlace, PORTADA real y fecha.

   Variables de entorno en Vercel (ver TIKTOK_SETUP.md):
     TIKTOK_CLIENT_KEY     = Client key de la app de TikTok for Developers
     TIKTOK_CLIENT_SECRET  = Client secret
     TIKTOK_REFRESH_TOKEN  = refresh token de la cuenta de Marco (dura 365 días;
                             se obtiene una sola vez con /api/tiktok-auth)
   El access token dura 24 h: esta función lo renueva sola con el refresh token
   en cada revalidación (cache de 30 min). Sin variables devuelve vacío y el
   sitio usa los TikToks de /admin o los locales: nunca se rompe. */

const FIELDS = 'id,title,video_description,cover_image_url,share_url,create_time'

function titleFrom(v) {
  const raw = (v.title || v.video_description || '').split('\n')[0].trim()
  const clean = raw.replace(/\s?#\S+/g, '').trim()
  if (!clean) return 'TikTok de Marco Balseca'
  return clean.length > 90 ? `${clean.slice(0, 87).trimEnd()}…` : clean
}

async function accessToken(key, secret, refresh) {
  const r = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_key: key,
      client_secret: secret,
      grant_type: 'refresh_token',
      refresh_token: refresh,
    }),
  })
  const d = await r.json()
  if (!d.access_token) throw new Error(d.error_description || d.error || 'No se pudo renovar el token de TikTok')
  return d.access_token
}

export default async function handler(_req, res) {
  const KEY = process.env.TIKTOK_CLIENT_KEY
  const SECRET = process.env.TIKTOK_CLIENT_SECRET
  const REFRESH = process.env.TIKTOK_REFRESH_TOKEN

  if (!KEY || !SECRET || !REFRESH) {
    res.status(200).json({ videos: [], configured: false })
    return
  }

  try {
    const token = await accessToken(KEY, SECRET, REFRESH)
    const r = await fetch(`https://open.tiktokapis.com/v2/video/list/?fields=${FIELDS}`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ max_count: 20 }),
    })
    const d = await r.json()
    if (d.error && d.error.code && d.error.code !== 'ok') {
      res.status(200).json({ videos: [], configured: true, error: d.error.message || d.error.code })
      return
    }

    const videos = ((d.data && d.data.videos) || [])
      .filter((v) => v.share_url && v.id)
      .map((v) => ({
        id: `tt-${v.id}`,
        titulo: titleFrom(v),
        // URL canónica con el id: la usa tiktokEmbedSrc para el embed oficial
        tiktokUrl: `https://www.tiktok.com/video/${v.id}`,
        poster: v.cover_image_url || null,
        fecha: v.create_time ? new Date(v.create_time * 1000).toISOString() : null,
      }))

    res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=21600')
    res.status(200).json({ videos, configured: true })
  } catch (e) {
    res.status(200).json({ videos: [], configured: true, error: String(e.message || e) })
  }
}
