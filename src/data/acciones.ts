/* Acciones / ejes de trabajo — reales, tomados de mi actividad pública en
   Tehuacán (@marcobalseca1). Voz en primera persona, tono cálido.
   Editables desde /admin (Supabase). Esta lista es el respaldo local. */

export type Categoria =
  | 'Deporte'
  | 'Educación'
  | 'Comunidad'
  | 'Economía local'
  | 'Seguridad'
  | 'Propuesta'

export type Accion = {
  id: string
  slug: string
  categoria: Categoria | string
  titulo: string
  resumen: string
  /** Texto largo para la página de detalle (/acciones/:slug). */
  detalle?: string
  imagen?: string
}

/** Convierte un texto en slug para URL (sin acentos, minúsculas, guiones). */
export function slugify(s: string): string {
  return (
    s
      .toLowerCase()
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || 'accion'
  )
}

export const ACCIONES: Accion[] = [
  {
    id: 'deporte-voleibol',
    slug: 'deporte-voleibol',
    categoria: 'Deporte',
    titulo: 'Deporte que une a la colonia',
    resumen:
      'El deporte es de los mejores pretextos para unirnos. Con el ánimo del Mundial 2026, llevo activaciones deportivas a las colonias y hago del Complejo Cultural El Carmen un punto de encuentro donde grandes y chicos se sienten en casa.',
    detalle:
      'El deporte es de los mejores pretextos para unirnos. Con el ánimo del Mundial 2026, llevo activaciones deportivas a las colonias de Tehuacán: voleibol, fútbol y retas que sacan a las familias a la calle.\n\nHago del Complejo Cultural El Carmen un punto de encuentro donde grandes y chicos se sienten en casa. Donde hay cancha y compañía, hay comunidad: por eso el deporte es de las primeras cosas que impulso, colonia por colonia.',
    imagen: '/assets/acciones/accion-deporte-voleibol.jpg',
  },
  {
    id: 'deporte-copa',
    slug: 'deporte-copa',
    categoria: 'Deporte',
    titulo: 'Torneos y copas para la comunidad',
    resumen:
      'Organizo torneos y copas que convocan a familias enteras y devuelven la vida a las canchas del barrio. Cuando una colonia juega junta, también se cuida y se organiza junta.',
    detalle:
      'Organizo torneos y copas que convocan a familias enteras y devuelven la vida a las canchas del barrio. No se trata solo de jugar: es un pretexto para que los vecinos se conozcan, se organicen y cuiden su espacio.\n\nCuando una colonia juega junta, también se cuida y se organiza junta. Esa es la idea: usar el deporte como semilla de comunidad.',
    imagen: '/assets/acciones/accion-deporte-copa.jpg',
  },
  {
    id: 'educacion',
    slug: 'educacion',
    categoria: 'Educación',
    titulo: 'Educación para nuestras juventudes',
    resumen:
      'Camino de cerca con estudiantes e instituciones de Tehuacán —del TecNM-Tehuacán a la Universidad Levi—. Escucho a las juventudes, celebro a quienes se gradúan y busco abrirles puertas para que su futuro empiece aquí, en su tierra.',
    detalle:
      'Camino de cerca con estudiantes e instituciones de Tehuacán —del TecNM-Tehuacán a la Universidad Levi (Unilevi)—. Visito a las juventudes, escucho lo que necesitan y celebro a quienes se gradúan.\n\nQuiero abrirles puertas para que su futuro empiece aquí, en su tierra, sin tener que irse para salir adelante. Apostar por la educación es apostar por el Tehuacán de los próximos años.',
    imagen: '/assets/acciones/accion-educacion.jpg',
  },
  {
    id: 'obra-cancha',
    slug: 'obra-cancha',
    categoria: 'Comunidad',
    titulo: 'Obra cercana: espacios para la gente',
    resumen:
      'Impulso la rehabilitación y la dignificación de los espacios comunes: una cancha, un parque, una calle. Lo pequeño y cercano es lo que cambia el día a día de una familia.',
    detalle:
      'Impulso la rehabilitación y la dignificación de los espacios comunes: una cancha, un parque, una calle. La obra que cambia la vida no siempre es la más grande: es la más cercana.\n\nLo pequeño y cercano es lo que cambia el día a día de una familia. Por eso priorizo lo que la gente usa todos los días, en su propia colonia.',
    imagen: '/assets/acciones/accion-obra-cancha.jpg',
  },
  {
    id: 'economia-local',
    slug: 'economia-local',
    categoria: 'Economía local',
    titulo: 'Impulso a la economía de Tehuacán',
    resumen:
      'Como emprendedor sé lo que cuesta sacar adelante un negocio. Por eso acompaño al comercio, al oficio y al emprendimiento local: cuando a Tehuacán le va bien trabajando, a sus familias les va bien viviendo.',
    detalle:
      'Como emprendedor sé lo que cuesta sacar adelante un negocio: las desveladas, los riesgos, el esfuerzo de la familia. Por eso acompaño al comercio, al oficio y al emprendimiento local.\n\nCuando a Tehuacán le va bien trabajando, a sus familias les va bien viviendo. Apoyar a quien produce y emplea aquí es apoyar a toda la ciudad.',
  },
  {
    id: 'seguridad-y-paz',
    slug: 'seguridad-y-paz',
    categoria: 'Seguridad',
    titulo: 'Seguridad con cercanía y prevención',
    resumen:
      'Creo en una paz que se construye en comunidad: con prevención, con jornadas que acercan servicios y con un trabajo de barrio que conoce a su gente por su nombre. La confianza también se cuida.',
    detalle:
      'Creo en una paz que se construye en comunidad: con prevención, con jornadas que acercan servicios y con un trabajo de barrio que conoce a su gente por su nombre. La seguridad no es solo vigilancia: es confianza entre vecinos.\n\nImpulso herramientas que unen a la colonia —como las alarmas vecinales y los comités— y el desarme voluntario, porque la tranquilidad de las familias se cuida todos los días.',
  },
]
