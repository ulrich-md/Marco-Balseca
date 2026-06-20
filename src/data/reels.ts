/* Reels reales de @marcobalseca1 (Instagram).
   - kind: 'instagram' → usa instagramUrl (igEmbedUrl() convierte a /embed)
   - kind: 'youtube'   → usa youtubeId (embed en el lightbox)
   - kind: 'mp4'       → usa src (autoplay-on-hover + <video> en el modal)
*/

export type Reel = {
  id: string
  titulo: string
  src?: string
  instagramUrl?: string
  youtubeId?: string
  kind: 'instagram' | 'youtube' | 'mp4'
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
    titulo: 'La fiesta del Mundial en Tehuacán, con la gente',
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
    titulo: 'El Mundial en Puebla — Complejo Cultural El Carmen',
    kind: 'instagram',
    instagramUrl: 'https://www.instagram.com/marcobalseca1/reel/DY2AKVMxNQ6/',
  },
]
