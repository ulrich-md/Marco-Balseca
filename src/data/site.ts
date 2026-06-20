/* =========================================================================
   Constantes de marca y configuración del sitio — Marco Balseca
   Contenido REAL y verificado (positivo): Marco Antonio Balseca Romero,
   abogado y MBA, emprendedor de Tehuacán, Puebla; delegado de Gobernación
   de la microrregión 25. Voz en primera persona. Sin datos inventados.
   ========================================================================= */

export const SITE = {
  name: 'Marco Balseca',
  ciudad: 'Tehuacán',
  estado: 'Puebla',
  pais: 'México',
  /** Línea de apoyo, cercana y directa (sin lema/eslogan). */
  tagline: 'Cerca de la gente. Por nuestra tierra.',
  /** URL canónica de despliegue (ajustar al dominio real) */
  url: 'https://marcobalseca.mx',
  descripcion:
    'Marco Balseca, abogado y emprendedor de Tehuacán, Puebla. Delegado de Gobernación de la microrregión 25. Cerca de la gente, por nuestra tierra.',
} as const

/** Navegación principal (header + footer) */
export const NAV = [
  { label: 'Inicio', to: '/' },
  { label: 'Conóceme', to: '/conoceme' },
  { label: 'Trayectoria', to: '/trayectoria' },
  { label: 'Acciones', to: '/acciones' },
  { label: 'Reels', to: '/reels' },
  { label: 'Agenda', to: '/agenda' },
  { label: 'Contacto', to: '/contacto' },
] as const

/** Redes y contacto. */
export const SOCIAL = {
  instagram: {
    label: 'Instagram',
    handle: '@marcobalseca1',
    url: 'https://www.instagram.com/marcobalseca1/',
  },
  facebook: { label: 'Facebook', handle: 'Marco Balseca', url: 'https://www.facebook.com/balseca' },
  x: { label: 'X', handle: '@marcobalseca1', url: 'https://twitter.com/marcobalseca1' },
  linktree: { label: 'Linktree', handle: 'linktr.ee/balseca', url: 'https://linktr.ee/balseca' },
  // PENDIENTE: número oficial de WhatsApp del movimiento
  whatsapp: {
    label: 'WhatsApp',
    numero: '',
    url: '#',
  },
  // VALIDAR: confirmar que hola@marcobalseca.mx existe y recibe correo
  email: { label: 'Correo', value: 'hola@marcobalseca.mx' },
} as const

/** Cifras clave (count-up). Las verificables van exactas; la de colonias es
 *  un estimado honesto en formato "+ de" (Tehuacán tiene 200+ colonias).
 *  · +15 años: desde 2010, cuando di mi primer paso en la vida pública.
 *  · +100 colonias recorridas, casa por casa.
 *  · 12: juntas auxiliares en que se divide el municipio de Tehuacán. */
export const STATS = [
  { value: 15, suffix: '+', label: 'Años en la vida pública de Tehuacán', placeholder: '' },
  { value: 100, suffix: '+', label: 'Colonias recorridas, casa por casa', placeholder: '' },
  { value: 12, suffix: '', label: 'Juntas auxiliares que forman mi Tehuacán', placeholder: '' },
] as const

/** Datos territoriales de Tehuacán (para hero y sección Comunidad). */
export const JUNTAS_AUXILIARES = 12
export const MICRORREGION = 25
/** Estimado honesto "+ de" — Tehuacán tiene 200+ colonias. */
export const COLONIAS_RECORRIDAS = 100

/**
 * Galería humana (patrón Community Landing): momentos reales con la gente.
 * Pies honestos (sin inventar nombres de colonias). Fotos sin recortar (masonry).
 */
export type Simpatizante = { rol: string; colonia: string; foto?: string; w?: number; h?: number }

// w/h = dimensiones intrínsecas para reservar espacio (sin saltos de layout).
export const COMUNIDAD: Simpatizante[] = [
  { rol: 'En el mercado, con la gente', colonia: 'Centro de Tehuacán', foto: '/assets/comunidad/comunidad-mercado.jpg', w: 492, h: 638 },
  { rol: 'Casa por casa', colonia: 'Microrregión 25', foto: '/assets/comunidad/comunidad-visita.jpg', w: 827, h: 822 },
  { rol: 'En la cancha del barrio', colonia: 'Tehuacán, Puebla', foto: '/assets/comunidad/comunidad-cancha.jpg', w: 827, h: 537 },
  { rol: 'Con las familias', colonia: 'Colonias de Tehuacán', foto: '/assets/comunidad/comunidad-familia.jpg', w: 1159, h: 1500 },
]

/** Pilares / valores de identidad (Conóceme + teasers) — en primera persona */
export const PILARES = [
  {
    num: '01',
    titulo: 'Comunidad',
    texto:
      'Para mí, la fuerza de Tehuacán está en su gente. Por eso escucho de cerca —en la colonia, en la cancha y en la junta auxiliar— antes de decidir. Lo que sé de mi ciudad lo aprendí caminándola.',
  },
  {
    num: '02',
    titulo: 'Raíces e identidad',
    texto:
      'Vengo de una familia que ayudó a construir el Tehuacán del agua mineral y del servicio público. Llevo ese orgullo conmigo: nuestra historia y nuestras tradiciones se honran y se heredan.',
  },
  {
    num: '03',
    titulo: 'Trabajo',
    texto:
      'Crecí viendo lo que cuesta sacar adelante un proyecto. Por eso creo en los resultados antes que en el ruido: constancia, oficio y cercanía con cada familia.',
  },
  {
    num: '04',
    titulo: 'Cercanía',
    texto:
      'Hago las cosas de tú a tú, sin distancia. La política de verdad se hace en la calle, con nombre y apellido. Si tienes algo que decirme, aquí estoy: contigo.',
  },
] as const
