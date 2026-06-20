/* Acciones / ejes de trabajo — reales, tomados de mi actividad pública en
   Tehuacán (@marcobalseca1). Voz en primera persona, tono cálido. */

export type Categoria =
  | 'Deporte'
  | 'Educación'
  | 'Comunidad'
  | 'Economía local'
  | 'Seguridad'
  | 'Propuesta'

export type Accion = {
  slug: string
  categoria: Categoria
  titulo: string
  resumen: string
  imagen?: string
}

export const ACCIONES: Accion[] = [
  {
    slug: 'deporte-voleibol',
    categoria: 'Deporte',
    titulo: 'Deporte que une a la colonia',
    resumen:
      'El deporte es de los mejores pretextos para unirnos. Con el ánimo del Mundial 2026, llevo activaciones deportivas a las colonias y hago del Complejo Cultural El Carmen un punto de encuentro donde grandes y chicos se sienten en casa.',
    imagen: '/assets/acciones/accion-deporte-voleibol.jpg',
  },
  {
    slug: 'deporte-copa',
    categoria: 'Deporte',
    titulo: 'Torneos y copas para la comunidad',
    resumen:
      'Organizo torneos y copas que convocan a familias enteras y devuelven la vida a las canchas del barrio. Cuando una colonia juega junta, también se cuida y se organiza junta.',
    imagen: '/assets/acciones/accion-deporte-copa.jpg',
  },
  {
    slug: 'educacion',
    categoria: 'Educación',
    titulo: 'Educación para nuestras juventudes',
    resumen:
      'Camino de cerca con estudiantes e instituciones de Tehuacán —del TecNM-Tehuacán a la Universidad Levi—. Escucho a las juventudes, celebro a quienes se gradúan y busco abrirles puertas para que su futuro empiece aquí, en su tierra.',
    imagen: '/assets/acciones/accion-educacion.jpg',
  },
  {
    slug: 'obra-cancha',
    categoria: 'Comunidad',
    titulo: 'Obra cercana: espacios para la gente',
    resumen:
      'Impulso la rehabilitación y la dignificación de los espacios comunes: una cancha, un parque, una calle. Lo pequeño y cercano es lo que cambia el día a día de una familia.',
    imagen: '/assets/acciones/accion-obra-cancha.jpg',
  },
  {
    slug: 'economia-local',
    categoria: 'Economía local',
    titulo: 'Impulso a la economía de Tehuacán',
    resumen:
      'Como emprendedor sé lo que cuesta sacar adelante un negocio. Por eso acompaño al comercio, al oficio y al emprendimiento local: cuando a Tehuacán le va bien trabajando, a sus familias les va bien viviendo.',
  },
  {
    slug: 'seguridad-y-paz',
    categoria: 'Seguridad',
    titulo: 'Seguridad con cercanía y prevención',
    resumen:
      'Creo en una paz que se construye en comunidad: con prevención, con jornadas que acercan servicios y con un trabajo de barrio que conoce a su gente por su nombre. La confianza también se cuida.',
  },
]
