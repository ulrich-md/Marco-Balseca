/* Acciones / Propuestas — tarjetas editoriales. PLACEHOLDERS.
   Ejes temáticos sugeridos para la agenda; el equipo ajusta el contenido real. */

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
  /** Foto real: sube a public/assets/acciones/ y pon su ruta aquí.
   *  Ej: imagen: '/assets/acciones/economia-local.jpg' */
  imagen?: string
}

export const ACCIONES: Accion[] = [
  // 4 tarjetas con foto real (categorías indicadas por el equipo).
  {
    slug: 'deporte-voleibol',
    categoria: 'Deporte',
    titulo: 'Deporte que une a la colonia',
    resumen: 'Activación deportiva con la comunidad. // REEMPLAZAR: [propuesta] concreta.',
    imagen: '/assets/acciones/accion-deporte-voleibol.jpg',
  },
  {
    slug: 'deporte-copa',
    categoria: 'Deporte',
    titulo: 'Torneos y copas para la comunidad',
    resumen: 'Torneos que convocan a las familias. // REEMPLAZAR: [propuesta] concreta.',
    imagen: '/assets/acciones/accion-deporte-copa.jpg',
  },
  {
    slug: 'educacion',
    categoria: 'Educación',
    titulo: 'Educación para nuestras juventudes',
    resumen: 'Apoyo a estudiantes y escuelas. // REEMPLAZAR: [propuesta] concreta.',
    imagen: '/assets/acciones/accion-educacion.jpg',
  },
  {
    slug: 'obra-cancha',
    categoria: 'Comunidad',
    titulo: 'Obra cercana: espacios para la gente',
    resumen: 'Rehabilitación de espacios comunes. // REEMPLAZAR: [propuesta] concreta.',
    imagen: '/assets/acciones/accion-obra-cancha.jpg',
  },
  // Tarjetas adicionales sin foto aún (fallback de color, no imagen rota).
  {
    slug: 'economia-local',
    categoria: 'Economía local',
    titulo: 'Impulso a la economía de Tehuacán',
    resumen:
      'Apoyo a comercio, oficio y emprendimiento local. // REEMPLAZAR: [propuesta] económica.',
  },
  {
    slug: 'seguridad-y-paz',
    categoria: 'Seguridad',
    titulo: 'Seguridad con cercanía y prevención',
    resumen:
      'Paz que se construye en comunidad. // REEMPLAZAR: [propuesta] de seguridad y prevención.',
  },
]
