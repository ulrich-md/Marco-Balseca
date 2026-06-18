/* Reels — galería vertical 9:16 estilo Instagram.
   Lista local fácil de actualizar. Listo para enlazar reels reales de
   @marcobalseca1 (Instagram permalink, YouTube id o MP4 propio).

   - kind: 'instagram' -> usa `instagramUrl` (se abre el reel original)
   - kind: 'youtube'   -> usa `youtubeId` (embed en el lightbox)
   - kind: 'mp4'       -> usa `src` (autoplay-on-hover + <video> en el modal)
   Mientras no haya video, el componente muestra un bloque de marca (sin URLs rotas).
*/

export type Reel = {
  id: string
  titulo: string
  // Para hover-preview/modal con archivo propio:
  // REEMPLAZAR: '/reels/mi-reel.mp4'
  src?: string
  // O enlazar el reel original de Instagram:
  // REEMPLAZAR: 'https://www.instagram.com/reel/XXXXXXXXXXX/'
  instagramUrl?: string
  // O un id de YouTube (Shorts):
  youtubeId?: string
  kind: 'instagram' | 'youtube' | 'mp4'
}

export const REELS: Reel[] = [
  {
    id: 'reel-1',
    titulo: 'Tiui Chikavak — en la calle',
    kind: 'instagram',
    // REEMPLAZAR: permalink real del reel de @marcobalseca1
    instagramUrl: 'https://www.instagram.com/marcobalseca1/',
  },
  {
    id: 'reel-2',
    titulo: 'Raíces que no se traducen',
    kind: 'instagram',
    instagramUrl: 'https://www.instagram.com/marcobalseca1/',
  },
  {
    id: 'reel-3',
    titulo: 'Por nuestra tierra',
    kind: 'instagram',
    instagramUrl: 'https://www.instagram.com/marcobalseca1/',
  },
  {
    id: 'reel-4',
    titulo: 'Cerca de la gente',
    kind: 'instagram',
    instagramUrl: 'https://www.instagram.com/marcobalseca1/',
  },
]
