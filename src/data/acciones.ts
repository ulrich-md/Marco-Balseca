/* Acciones / Propuestas — tarjetas editoriales.
   Ejes reales tomados de la actividad pública de @marcobalseca1. */

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
      'Activación deportiva en las colonias, aprovechando el ánimo del Mundial 2026 en Tehuacán y el Complejo Cultural El Carmen como punto de encuentro.',
    imagen: '/assets/acciones/accion-deporte-voleibol.jpg',
  },
  {
    slug: 'deporte-copa',
    categoria: 'Deporte',
    titulo: 'Torneos y copas para la comunidad',
    resumen:
      'Torneos que convocan a las familias y dan vida a las canchas del barrio.',
    imagen: '/assets/acciones/accion-deporte-copa.jpg',
  },
  {
    slug: 'educacion',
    categoria: 'Educación',
    titulo: 'Educación para nuestras juventudes',
    resumen:
      'Cercanía con estudiantes e instituciones de Tehuacán (TecNM-Tehuacán, Universidad Levi): escuchar a las juventudes y abrir oportunidades.',
    imagen: '/assets/acciones/accion-educacion.jpg',
  },
  {
    slug: 'obra-cancha',
    categoria: 'Comunidad',
    titulo: 'Obra cercana: espacios para la gente',
    resumen:
      'Rehabilitación y dignificación de espacios comunes en las colonias.',
    imagen: '/assets/acciones/accion-obra-cancha.jpg',
  },
  {
    slug: 'economia-local',
    categoria: 'Economía local',
    titulo: 'Impulso a la economía de Tehuacán',
    resumen:
      'Apoyo al comercio, al oficio y al emprendimiento local, con la mirada práctica de quien ha emprendido.',
  },
  {
    slug: 'seguridad-y-paz',
    categoria: 'Seguridad',
    titulo: 'Seguridad con cercanía y prevención',
    resumen:
      'Paz que se construye en comunidad, con prevención y trabajo de barrio.',
  },
]
