/* Videos de Marco Balseca (Instagram Reels + TikTok).
   - kind: 'instagram' → Reel; usa instagramUrl (igEmbedSrc convierte a /embed)
   - kind: 'tiktok'    → TikTok; usa tiktokUrl (tiktokEmbedSrc → /embed/v2/{id})
   - kind: 'youtube'   → usa youtubeId
   - kind: 'mp4'       → usa src
*/

export type VideoKind = 'instagram' | 'tiktok' | 'youtube' | 'mp4'

export type Reel = {
  id: string
  titulo: string
  src?: string
  instagramUrl?: string
  tiktokUrl?: string
  youtubeId?: string
  kind: VideoKind
}

export const REELS: Reel[] = [
  {
    id: 'reel-1',
    titulo: 'Atención a vecinos — Col. San Francisco 1ª sección',
    kind: 'instagram',
    instagramUrl: 'https://www.instagram.com/marcobalseca1/reel/DZp5ue_xllO/',
  },
  {
    id: 'reel-2',
    titulo: 'Deporte que une a las colonias de Tehuacán',
    kind: 'instagram',
    instagramUrl: 'https://www.instagram.com/marcobalseca1/reel/DZh-CPJRqow/',
  },
  {
    id: 'reel-3',
    titulo: 'La fiesta del fútbol — Complejo Cultural El Carmen',
    kind: 'instagram',
    instagramUrl: 'https://www.instagram.com/marcobalseca1/reel/DZbSlIsxFl8/',
  },
  {
    id: 'reel-4',
    titulo: 'Vecinos de San Vicente Ferrer organizándose',
    kind: 'instagram',
    instagramUrl: 'https://www.instagram.com/marcobalseca1/reel/DZa0EtoSpWy/',
  },
  {
    id: 'reel-5',
    titulo: 'Jornada de salud en la comunidad',
    kind: 'instagram',
    instagramUrl: 'https://www.instagram.com/marcobalseca1/reel/DZIN3yWRoMi/',
  },
  {
    id: 'reel-6',
    titulo: 'Graduados del TecNM-Tehuacán',
    kind: 'instagram',
    instagramUrl: 'https://www.instagram.com/marcobalseca1/reel/DY_P-i8uTKb/',
  },
  {
    id: 'reel-7',
    titulo: 'Visita a la Universidad Levi (Unilevi Tehuacán)',
    kind: 'instagram',
    instagramUrl: 'https://www.instagram.com/marcobalseca1/reel/DY8Kx00q_Ao/',
  },
  {
    id: 'reel-8',
    titulo: 'Fútbol comunitario — Complejo Cultural El Carmen',
    kind: 'instagram',
    instagramUrl: 'https://www.instagram.com/marcobalseca1/reel/DY2AKVMxNQ6/',
  },
]
