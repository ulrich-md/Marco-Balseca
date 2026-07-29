/* Noticias — "Últimas Noticias" (estilo del sitio del Gobierno del Estado).
   Editables desde /admin (tabla `noticias` en Supabase); esta lista es el
   respaldo local con notas REALES y positivas que mencionan a Marco Balseca.
   Las fotos son fotografías REALES de Marco en territorio (activos locales),
   asignadas por tema a cada nota. Las fuentes de prensa/Facebook bloquean el
   hotlink de sus imágenes originales, así que si el equipo tiene la foto exacta
   del evento puede subirla por nota desde /admin y reemplaza a la de aquí. */

export type Noticia = {
  id: string
  titulo: string
  /** Medio / fuente (ej. "Municipios Puebla") */
  fuente?: string
  /** ISO yyyy-mm-dd (opcional; si falta no se muestra fecha) */
  fecha?: string
  /** URL de la imagen real de la nota (opcional) */
  imagen?: string
  /** Enlace a la nota completa */
  url: string
}

export const NOTICIAS: Noticia[] = [
  {
    id: 'n1',
    fuente: 'Municipios Puebla',
    fecha: '2026-03-25',
    titulo: '«Sí al desarme, sí a la paz»: Marco Balseca encabeza el canje de armas',
    imagen: '/assets/portraits/marco-formal.webp',
    url: 'https://municipiospuebla.mx/nota/tehuacan/realizan-en-tehuacan-campana-de-canje-voluntario-de-armas',
  },
  {
    id: 'n2',
    fuente: 'Sedeño Noticias',
    titulo: 'Entrega Marco Balseca una alarma vecinal más en una junta auxiliar',
    imagen: '/assets/comunidad/comunidad-visita.webp',
    url: 'https://www.facebook.com/balseca',
  },
  {
    id: 'n3',
    fuente: 'Diario Primera Línea',
    titulo: 'Marco Balseca, delegado de la microrregión 25, invita a la comunidad',
    imagen: '/assets/portraits/marco-corazon-fondo.webp',
    url: 'https://www.facebook.com/DiarioPrimeraLineaTH/videos/2010567689555570/',
  },
  {
    id: 'n4',
    fuente: 'Diario Primera Línea',
    titulo: 'Entrevista con Marco Antonio Balseca Romero: el trabajo en territorio',
    imagen: '/assets/comunidad/comunidad-mercado.webp',
    url: 'https://www.facebook.com/61572253138907/videos/1287605396616409/',
  },
  {
    id: 'n5',
    fuente: 'Talavera Noticias',
    titulo: 'Marco Balseca en entrevista: el trabajo en la microrregión 25',
    imagen: '/assets/comunidad/comunidad-cancha.webp',
    url: 'https://www.facebook.com/talavera.noticias.tehuacan/videos/26120198540995756/',
  },
]
