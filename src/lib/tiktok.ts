/* TikTok: convierte un enlace público a la URL de embed en iframe oficial.
   Ej.: https://www.tiktok.com/@marcobalseca1/video/7412345678901234567
        → https://www.tiktok.com/embed/v2/7412345678901234567
   Los enlaces cortos (vm.tiktok.com/…) no traen el id → caen al botón. */
export function tiktokEmbedSrc(url?: string): string | null {
  if (!url) return null
  const m = url.match(/video\/(\d{6,})/) || url.match(/\/(\d{15,})/)
  if (!m) return null
  return `https://www.tiktok.com/embed/v2/${m[1]}`
}
