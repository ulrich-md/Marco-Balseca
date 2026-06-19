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
  // REEMPLAZAR: descripción oficial aprobada por el equipo de Marco
  descripcion:
    'Marco Balseca, figura política y comunitaria de Tehuacán, Puebla. Cerca de la gente, por nuestra tierra. Súmate al movimiento.',
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

/** Redes y contacto. Solo @marcobalseca1 es dato real verificado. */
export const SOCIAL = {
  instagram: {
    label: 'Instagram',
    handle: '@marcobalseca1',
    url: 'https://www.instagram.com/marcobalseca1/',
  },
  // REEMPLAZAR: enlaces oficiales si existen
  facebook: { label: 'Facebook', handle: 'Marco Balseca', url: '#' },
  x: { label: 'X', handle: '@marcobalseca1', url: '#' },
  // REEMPLAZAR: número oficial de WhatsApp del movimiento
  whatsapp: {
    label: 'WhatsApp',
    numero: '52 200 000 0000',
    url: 'https://wa.me/522000000000',
  },
  // REEMPLAZAR: correo oficial de contacto
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
export type Simpatizante = { rol: string; colonia: string; foto?: string }

export const COMUNIDAD: Simpatizante[] = [
  { rol: 'Vecina', colonia: 'Col. [nombre]' },
  { rol: 'Comerciante', colonia: 'Centro, Tehuacán' },
  { rol: 'Estudiante', colonia: 'Col. [nombre]' },
  { rol: 'Productor', colonia: 'Junta [nombre]' },
  { rol: 'Maestra', colonia: 'Col. [nombre]' },
  { rol: 'Joven', colonia: 'Col. [nombre]' },
  { rol: 'Comerciante', colonia: 'Mercado [nombre]' },
  { rol: 'Vecino', colonia: 'Col. [nombre]' },
]

/** Pilares / valores de identidad (Conóceme + teasers) */
export const PILARES = [
  {
    num: '01',
    titulo: 'Comunidad',
    texto:
      'La fuerza está en la gente. Escuchar de cerca, en la colonia y en la junta, antes de decidir. // REEMPLAZAR: enfoque comunitario real.',
  },
  {
    num: '02',
    titulo: 'Raíces e identidad',
    texto:
      'Orgullo por Tehuacán, su historia y sus tradiciones. Una identidad que se honra y se hereda, con respeto a todas sus raíces.',
  },
  {
    num: '03',
    titulo: 'Trabajo',
    texto:
      'Resultados antes que ruido. Constancia, oficio y cuentas claras. // REEMPLAZAR: ejemplos concretos de trabajo.',
  },
  {
    num: '04',
    titulo: 'Cercanía',
    texto:
      'De tú a tú, sin distancia. La política se hace en la calle, con nombre y apellido: contigo.',
  },
] as const
