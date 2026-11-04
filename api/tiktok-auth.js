/* Autorización de TikTok — se usa UNA sola vez para obtener el refresh token
   de la cuenta de Marco (ver TIKTOK_SETUP.md).

   1) Abrir:  https://TU-DOMINIO/api/tiktok-auth?key=TIKTOK_SETUP_KEY
      → redirige a TikTok para que Marco autorice (scopes user.info.basic,video.list).
   2) TikTok regresa aquí con ?code=… → se cambia por tokens y se muestra el
      REFRESH TOKEN para copiarlo a Vercel como TIKTOK_REFRESH_TOKEN.

   Protegido con TIKTOK_SETUP_KEY (una contraseña que tú eliges): sin ella la
   página no hace nada. Después de configurar, puedes borrar TIKTOK_SETUP_KEY
   de Vercel y esta página queda desactivada.

   Variables: TIKTOK_CLIENT_KEY, TIKTOK_CLIENT_SECRET, TIKTOK_SETUP_KEY.
   En la app de TikTok registra como Redirect URI:
     https://TU-DOMINIO/api/tiktok-auth */

const esc = (s) => String(s).replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)

function page(res, title, body) {
  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('X-Robots-Tag', 'noindex')
  res.status(200).send(
    `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(title)}</title>` +
      `<body style="font-family:system-ui;max-width:640px;margin:48px auto;padding:0 16px;line-height:1.5;color:#161616">` +
      `<h1 style="color:#711924">${esc(title)}</h1>${body}</body>`,
  )
}

export default async function handler(req, res) {
  const KEY = process.env.TIKTOK_CLIENT_KEY
  const SECRET = process.env.TIKTOK_CLIENT_SECRET
  const SETUP = process.env.TIKTOK_SETUP_KEY
  const url = new URL(req.url, `https://${req.headers.host}`)
  const redirectUri = `https://${req.headers.host}/api/tiktok-auth`

  if (!KEY || !SECRET || !SETUP) {
    page(res, 'TikTok: falta configuración', '<p>Agrega TIKTOK_CLIENT_KEY, TIKTOK_CLIENT_SECRET y TIKTOK_SETUP_KEY en Vercel.</p>')
    return
  }

  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')

  // Paso 1: iniciar autorización (requiere la clave de configuración)
  if (!code) {
    if (url.searchParams.get('key') !== SETUP) {
      page(res, 'No autorizado', '<p>Falta o no coincide <code>?key=</code>.</p>')
      return
    }
    const auth = new URL('https://www.tiktok.com/v2/auth/authorize/')
    auth.searchParams.set('client_key', KEY)
    auth.searchParams.set('scope', 'user.info.basic,video.list')
    auth.searchParams.set('response_type', 'code')
    auth.searchParams.set('redirect_uri', redirectUri)
    auth.searchParams.set('state', SETUP)
    res.writeHead(302, { Location: auth.toString() })
    res.end()
    return
  }

  // Paso 2: TikTok regresa con el código → cambiarlo por tokens
  if (state !== SETUP) {
    page(res, 'No autorizado', '<p>El parámetro <code>state</code> no coincide.</p>')
    return
  }
  try {
    const r = await fetch('https://open.tiktokapis.com/v2/oauth/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_key: KEY,
        client_secret: SECRET,
        code,
        grant_type: 'authorization_code',
        redirect_uri: redirectUri,
      }),
    })
    const d = await r.json()
    if (!d.refresh_token) {
      page(res, 'TikTok: error', `<p>${esc(d.error_description || d.error || 'No se recibió el token.')}</p>`)
      return
    }
    page(
      res,
      'TikTok conectado ✓',
      `<p>Copia este valor en <b>Vercel → Settings → Environment Variables</b> como <code>TIKTOK_REFRESH_TOKEN</code> y haz <b>Redeploy</b>:</p>` +
        `<textarea readonly style="width:100%;height:110px;font-family:monospace">${esc(d.refresh_token)}</textarea>` +
        `<p>Vence en ${Math.round((d.refresh_expires_in || 31536000) / 86400)} días. Después puedes borrar <code>TIKTOK_SETUP_KEY</code> para desactivar esta página.</p>`,
    )
  } catch (e) {
    page(res, 'TikTok: error', `<p>${esc(e.message || e)}</p>`)
  }
}
