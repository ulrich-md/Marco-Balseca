/* Hitos de trayectoria — contenido EXACTO proporcionado por el equipo de
   Marco Balseca (documento oficial mb_info). Voz en primera persona.
   Sólo se corrigieron erratas evidentes de acentuación y ortografía. */

export type Hito = {
  anio: string
  titulo: string
  texto: string
  lugar?: string
}

export const TRAYECTORIA: Hito[] = [
  {
    anio: '1995',
    titulo: 'Líder juvenil en el Valle de Tehuacán',
    texto:
      'Líder juvenil en el Valle de Tehuacán, mi región, que empecé a caminar desde los quince años de edad.',
    lugar: 'Tehuacán, Puebla',
  },
  {
    anio: '2001–2011',
    titulo: 'Una década de fomento deportivo',
    texto:
      'Emprendimos un programa de fomento deportivo de 10 años con carreras atléticas, patrocinios a deportistas locales y de la Federación Mexicana de Atletismo; así como las jornadas municipales de la salud y el deporte.',
    lugar: 'Tehuacán, Puebla',
  },
  {
    anio: '2006',
    titulo: 'Nace FUBA, Fundación Balseca',
    texto:
      'Inicia FUBA (Fundación Balseca), por medio de la cual atendimos causas sociales a través de los ejes de educación, cultura y deporte.',
    lugar: 'Tehuacán, Puebla',
  },
  {
    anio: '2009',
    titulo: 'Presidente de Coparmex Tehuacán',
    texto: 'Me desempeñé como presidente de Coparmex Tehuacán.',
    lugar: 'Tehuacán, Puebla',
  },
  {
    anio: '2012',
    titulo: 'Coordinación de Asesores en Chiapas',
    texto:
      'Participé en el Gobierno del Estado de Chiapas, encabezado por Manuel Velasco Coello, como parte de la Coordinación de Asesores, atendiendo asuntos de índole social, comunidades indígenas y de derechos humanos.',
    lugar: 'Chiapas',
  },
  {
    anio: '2013',
    titulo: 'Delegado Federal del INAES en Chiapas',
    texto:
      'Fui nombrado Delegado Federal del INAES (Instituto Nacional de la Economía Social) en el estado de Chiapas, a través del cual transformamos la vida de miles de chiapanecos. Fuimos 1er. lugar en proyectos productivos para mujeres, jóvenes y comunidades indígenas.',
    lugar: 'Chiapas',
  },
  {
    anio: '2016',
    titulo: 'Director general de MOG Selections México',
    texto:
      'Me desempeño como director general de MOG Selections México S.A. de C.V., a través de la cual desarrollamos proyectos de alimentos y bebidas.',
    lugar: 'México',
  },
  {
    anio: '2018',
    titulo: 'Director nacional de Planeación y Análisis del INAES',
    texto:
      'Fui designado Director de Planeación y Análisis a nivel nacional del INAES (Instituto Nacional de la Economía Social).',
    lugar: 'Nacional',
  },
  {
    anio: '2026',
    titulo: 'Delegado de Gobernación en Tehuacán',
    texto:
      'Delegado de la Secretaría de Gobernación del Gobierno del Estado de Puebla en Tehuacán.',
    lugar: 'Tehuacán, Puebla',
  },
]
