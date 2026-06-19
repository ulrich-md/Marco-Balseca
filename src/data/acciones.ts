/* Acciones / Propuestas — tarjetas editoriales. PLACEHOLDERS.
   Ejes temáticos sugeridos para la agenda; el equipo ajusta el contenido real. */

export type Categoria =
  | 'Comunidad'
  | 'Raíces y cultura'
  | 'Economía local'
  | 'Juventud'
  | 'Seguridad'
  | 'Propuesta'

export type Accion = {
  slug: string
  categoria: Categoria
  titulo: string
  resumen: string
  // REEMPLAZAR: foto real de la acción/propuesta de @marcobalseca1
  // imagen: '/acciones/xxxx.jpg'
}

export const ACCIONES: Accion[] = [
  {
    slug: 'raices-y-cultura',
    categoria: 'Raíces y cultura',
    titulo: 'Raíces y cultura viva de Tehuacán',
    resumen:
      'Honrar la historia y las tradiciones de Tehuacán. // REEMPLAZAR: [propuesta] concreta de promoción cultural.',
  },
  {
    slug: 'cerca-de-la-gente',
    categoria: 'Comunidad',
    titulo: 'Cerca de la gente, en cada colonia',
    resumen:
      'Recorridos, escucha y soluciones de barrio. // REEMPLAZAR: [propuesta] de cercanía comunitaria.',
  },
  {
    slug: 'economia-local',
    categoria: 'Economía local',
    titulo: 'Impulso a la economía de Tehuacán',
    resumen:
      'Apoyo a comercio, oficio y emprendimiento local. // REEMPLAZAR: [propuesta] económica.',
  },
  {
    slug: 'juventud-recia',
    categoria: 'Juventud',
    titulo: 'Juventud recia: oportunidades reales',
    resumen:
      'Educación, deporte y primer empleo. // REEMPLAZAR: [propuesta] para juventudes.',
  },
  {
    slug: 'seguridad-y-paz',
    categoria: 'Seguridad',
    titulo: 'Seguridad con cercanía y prevención',
    resumen:
      'Paz que se construye en comunidad. // REEMPLAZAR: [propuesta] de seguridad y prevención.',
  },
  {
    slug: 'tierra-y-territorio',
    categoria: 'Propuesta',
    titulo: 'Por nuestra tierra: territorio y servicios',
    resumen:
      'Infraestructura, agua y servicios dignos. // REEMPLAZAR: [propuesta] territorial.',
  },
]
