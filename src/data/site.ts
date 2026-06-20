/* =========================================================================
   Constantes de marca y configuración del sitio — Marco Balseca
   IDENTIDAD REAL (usar tal cual): nombre, Tehuacán/Puebla, Instagram
   @marcobalseca1. Sistema editorial B&N con un único acento rojo.
   TODO lo específico (cargos, cifras, fechas, propuestas, nombres) es PLACEHOLDER.
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

/** Cifras clave — PLACEHOLDERS con count-up (mientras valen 0 muestran [N]). */
export const STATS = [
  // REEMPLAZAR: cifras reales (años de servicio, comunidades, etc.)
  { value: 0, suffix: '', label: 'Años caminando Tehuacán', placeholder: '[N]' },
  { value: 0, suffix: '', label: 'Colonias y juntas visitadas', placeholder: '[N]' },
  { value: 0, suffix: '', label: 'Acciones comunitarias', placeholder: '[N]' },
] as const

/** Contador de comunidad para el bloque "ya se sumaron". */
// REEMPLAZAR: número real de personas sumadas. 0 muestra el placeholder [N].
export const COMUNIDAD_COUNT = 0

/**
 * Comunidad / simpatizantes para la galería humana (patrón Community Landing).
 * Usamos ROLES (no nombres inventados) para humanizar con honestidad.
 * Para mostrar la foto real: sube el archivo a public/assets/comunidad/ y
 * pon su ruta en `foto` (ej. '/assets/comunidad/persona-1.jpg').
 * REEMPLAZAR: fotos y nombres reales de simpatizantes, con su consentimiento.
 */
export type Simpatizante = { rol: string; colonia: string; foto?: string; w?: number; h?: number }

// Fotos reales (momentos con la gente). Se usan tal cual, sin recortar (masonry).
// w/h = dimensiones intrínsecas para reservar espacio (sin saltos de layout).
// REEMPLAZAR: textos de colonia con datos reales.
export const COMUNIDAD: Simpatizante[] = [
  { rol: 'En el mercado', colonia: 'Centro, Tehuacán', foto: '/assets/comunidad/comunidad-mercado.jpg', w: 492, h: 638 },
  { rol: 'Visita en la colonia', colonia: 'Col. [nombre]', foto: '/assets/comunidad/comunidad-visita.jpg', w: 827, h: 822 },
  { rol: 'En la cancha', colonia: 'Col. [nombre]', foto: '/assets/comunidad/comunidad-cancha.jpg', w: 827, h: 537 },
  { rol: 'Con las familias', colonia: 'Col. [nombre]', foto: '/assets/comunidad/comunidad-familia.jpg', w: 1159, h: 1500 },
]

/** Pilares / valores de identidad (Conóceme + teasers) */
export const PILARES = [
  {
    num: '01',
    titulo: 'Comunidad',
    texto:
      'La fuerza está en la gente. Escuchar de cerca, en la colonia y en la junta, antes de decidir.',
  },
  {
    num: '02',
    titulo: 'Raíces e identidad',
    texto:
      'Orgullo por Tehuacán, su historia y sus tradiciones. Una identidad que se honra y se hereda.',
  },
  {
    num: '03',
    titulo: 'Trabajo',
    texto:
      'Resultados antes que ruido. Constancia, oficio y cercanía con cada familia.',
  },
  {
    num: '04',
    titulo: 'Cercanía',
    texto:
      'De tú a tú, sin distancia. La política se hace en la calle, con nombre y apellido: contigo.',
  },
] as const
