/* Función serverless (Vercel) — devuelve las publicaciones más recientes de la
   página de Facebook de Marco usando la Graph API.
   Requiere variables de entorno en Vercel (opcional; sin ellas devuelve vacío
   y el sitio usa el timeline embebido como respaldo):
     FB_PAGE_ID     = id numérico de la página
     FB_PAGE_TOKEN  = token de acceso de página (de larga duración)
   Ver FACEBOOK_SETUP.md para obtenerlos. */

export default async function handler(_req, res) {
  const PAGE_ID = process.env.FB_PAGE_ID
  const TOKEN = process.env.FB_PAGE_TOKEN

  if (!PAGE_ID || !TOKEN) {
    res.status(200).json({ posts: [], configured: false })
    return
  }

  try {
    const fields = 'permalink_url,message,created_time,full_picture'
    const url = `https://graph.facebook.com/v21.0/${PAGE_ID}/posts?fields=${fields}&limit=4&access_token=${TOKEN}`
    const r = await fetch(url)
    const data = await r.json()

    if (data.error) {
      res.status(200).json({ posts: [], configured: true, error: data.error.message })
      return
    }

    const posts = (data.data || [])
      .filter((p) => p.permalink_url)
      .slice(0, 4)
      .map((p) => ({
        permalink_url: p.permalink_url,
        message: p.message || '',
        created_time: p.created_time || '',
        picture: p.full_picture || null,
      }))

    // Cache en el edge: 10 min, sirviendo viejo mientras revalida.
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=1800')
    res.status(200).json({ posts, configured: true })
  } catch (e) {
    res.status(200).json({ posts: [], configured: true, error: String(e) })
  }
}
