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
    titulo: 'El chamaco del Frente Juvenil',
    texto:
      'Tenía 15 años cuando me tocó encabezar el Frente Juvenil Revolucionario en Puebla. Era un chamaco pegando carteles y organizando asambleas, pero ahí se me metió algo que nunca se me quitó: la política se hace caminando y escuchando. De eso ya pasaron 30 años y sigo en las mismas.',
    lugar: 'Puebla',
  },
  {
    anio: '2010',
    titulo: 'La campaña que me enseñó a escuchar',
    texto:
      'Ya era abogado, maestro en Administración, tenía mi negocio… y me animé a competir por la presidencia municipal de mi ciudad. De esa campaña me llevé lo más valioso que tengo hasta hoy: la costumbre de tocar la puerta, sentarme y escuchar de frente, sin prisa.',
    lugar: 'Tehuacán, Puebla',
  },
  {
    anio: '2012',
    titulo: 'La llamada que lo cambió todo',
    texto:
      'Manuel Velasco me confió la coordinación de su campaña. Fueron meses de dormir poco y recorrer Chiapas entero, y una lección que no se me olvida: las campañas no las ganan los carteles, las gana la gente que cree en algo.',
    lugar: 'Chiapas',
  },
  {
    anio: '2013',
    titulo: 'Aprender a que el apoyo sí llegue',
    texto:
      'El Gobernador me pidió coordinar a su equipo de asesores y ese mismo año tomé la delegación del INAES en Chiapas. Conocí de cerca la economía social: cooperativas, artesanas, productores. Gente que no pide limosna — pide una oportunidad. Mi trabajo era que el apoyo le llegara a quien trabaja, no a quien tramita.',
    lugar: 'Chiapas',
  },
  {
    anio: '2017',
    titulo: 'Ver el país completo',
    texto:
      'Me tocó dirigir la planeación nacional del INAES. Vi México entero desde los números y las oficinas… y solo me confirmó lo que ya sabía desde Tehuacán: los buenos planes nacen en el territorio, no en el escritorio.',
    lugar: 'Ciudad de México',
  },
  {
    anio: '2024',
    titulo: 'De vuelta en casa',
    texto:
      'Volví a casa con la encomienda de Gobernación del Estado de Puebla en la microrregión 25. Mi oficina está en territorio: en el mercado, en la junta auxiliar, en la puerta de tu casa. Ahí es donde se resuelven las cosas, una por una.',
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
