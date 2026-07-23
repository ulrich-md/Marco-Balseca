/* Noticias — "Últimas Noticias" (estilo del sitio del Gobierno del Estado).
   Editables desde /admin (tabla `noticias` en Supabase); esta lista es el
   respaldo local. REEMPLAZAR las imágenes por las fotos reales de cada nota. */

export type Noticia = {
  id: string
  titulo: string
  /** ISO yyyy-mm-dd (opcional; si falta no se muestra fecha) */
  fecha?: string
  /** URL de la imagen de la nota */
  imagen?: string
  /** Enlace a la nota completa */
  url: string
}

export const NOTICIAS: Noticia[] = [
  {
    id: 'n1',
    titulo: '«Sí al desarme, sí a la paz»: Marco Balseca encabeza el canje de armas',
    imagen: '/assets/comunidad/comunidad-visita.jpg',
    url: 'https://municipiospuebla.mx/nota/tehuacan/realizan-en-tehuacan-campana-de-canje-voluntario-de-armas',
  },
  {
    id: 'n2',
    titulo: 'Entrega Marco Balseca una alarma vecinal más en una junta auxiliar',
    imagen: '/assets/comunidad/comunidad-familia.jpg',
    url: 'https://www.facebook.com/balseca',
  },
  {
    id: 'n3',
    titulo: 'El delegado de la microrregión 25 invita a sumarse a las jornadas de comunidad',
    imagen: '/assets/comunidad/comunidad-mercado.jpg',
    url: 'https://www.facebook.com/DiarioPrimeraLineaTH/videos/2010567689555570/',
  },
]
