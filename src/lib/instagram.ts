/** Convierte un enlace de Instagram (reel/post/tv) en su URL de embed oficial.
 *  Acepta enlaces con o sin nombre de usuario en la ruta, por ejemplo:
 *   - https://www.instagram.com/reel/ABC123/
 *   - https://www.instagram.com/marcobalseca1/reel/ABC123/
 */
export function igEmbedSrc(url?: string): string | null {
  if (!url) return null
  const m = url.match(/instagram\.com\/(?:[^/?#]+\/)?(reel|reels|p|tv)\/([^/?#]+)/i)
  if (!m) return null
  const kind = m[1].toLowerCase() === 'reels' ? 'reel' : m[1].toLowerCase()
  return `https://www.instagram.com/${kind}/${m[2]}/embed`
}
