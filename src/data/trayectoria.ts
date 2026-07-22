/* Hitos de trayectoria — reales y verificables, en primera persona.
   Anclas: 1943 (agua mineral Balseca), 1981–1984 (mi padre, presidente
   municipal de Tehuacán), el Frente Juvenil a los 15 años (primer paso
   público, 30 años en la vida pública), la etapa nacional (2012–2018:
   campaña de Manuel Velasco, asesores del Gobernador, INAES) y hoy:
   delegado de Gobernación del Estado de Puebla, microrregión 25. */

export type Hito = {
  anio: string
  titulo: string
  texto: string
  lugar?: string
}

export const TRAYECTORIA: Hito[] = [
  {
    anio: '1943',
    titulo: 'Raíces que saben a Tehuacán',
    texto:
      'Vengo de la familia Balseca, una de las casas que hicieron del agua mineral el orgullo de Tehuacán, junto a nombres como Peñafiel y Garci-Crespo. Crecí entendiendo el valor del trabajo, del oficio y de la palabra dada.',
    lugar: 'Tehuacán, Puebla',
  },
  {
    anio: '1981',
    titulo: 'El servicio, herencia de mi casa',
    texto:
      'Mi padre, Marco Antonio Balseca Chávez, fue presidente municipal de Tehuacán (1981–1984); de su gestión es el mural emblemático de la ciudad. De él aprendí que servir a Tehuacán no es un cargo: es una forma de vivir.',
    lugar: 'Tehuacán, Puebla',
  },
  {
    anio: 'A los 15',
    titulo: 'Mi primer paso público',
    texto:
      'A los 15 años fui líder del Frente Juvenil Revolucionario en el estado de Puebla. Ahí empezó todo: aprender a organizar, a caminar el territorio y a escuchar. Son ya 30 años en la vida pública y no he dejado de hacerlo.',
    lugar: 'Puebla',
  },
  {
    anio: '2010',
    titulo: 'La lección de escuchar',
    texto:
      'Ya formado como abogado —y maestro en administración— y como emprendedor, competí por la presidencia municipal de Tehuacán. Aprendí lo más importante: servir es, antes que nada, escuchar.',
    lugar: 'Tehuacán, Puebla',
  },
  {
    anio: '2012',
    titulo: 'Primera encomienda',
    texto:
      'Fui coordinador de campaña de Manuel Velasco Coello. Una escuela intensa de organización, territorio y resultados que me abrió la etapa nacional de mi carrera.',
    lugar: 'Chiapas',
  },
  {
    anio: '2013',
    titulo: 'Del gabinete al territorio',
    texto:
      'Coordinador de asesores del Gobernador y, ese mismo año, nombrado delegado del INAES en Chiapas: economía social para que el apoyo llegara a quien trabaja, no a quien tramita.',
    lugar: 'Chiapas',
  },
  {
    anio: '2017',
    titulo: 'Director Nacional de Planeación del INAES',
    texto:
      'De 2017 a 2018 dirigí la planeación nacional del INAES: planear a escala de país me confirmó que las soluciones de verdad se diseñan desde el territorio, no desde el escritorio.',
    lugar: 'Ciudad de México',
  },
  {
    anio: '2024',
    titulo: 'Delegado de Gobernación · microrregión 25',
    texto:
      'Hoy soy delegado de Gobernación del Estado de Puebla en la microrregión 25. Mi trabajo es en territorio: recorro las colonias, escucho a vecinas y vecinos y acerco soluciones, una a una, donde de verdad se necesitan.',
    lugar: 'Tehuacán, Puebla',
  },
  {
    anio: '2026',
    titulo: 'La fiesta que nos une',
    texto:
      'Con el ánimo del Mundial 2026, impulso el deporte que une a las colonias y las jornadas que acercan servicios a las familias: torneos de barrio, encuentros con las juventudes y la fiesta del futbol en el Complejo Cultural El Carmen.',
    lugar: 'Tehuacán, Puebla',
  },
  {
    anio: 'Hoy',
    titulo: 'Sigo caminando contigo',
    texto:
      'Cerca de la gente, por nuestra tierra y nuestra gente, todos los días. Tehuacán es mi casa y mi causa, y mientras pueda caminarla seguiré haciéndolo a tu lado.',
    lugar: 'Tehuacán, Puebla',
  },
]
