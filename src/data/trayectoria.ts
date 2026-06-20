/* Hitos de trayectoria — reales y verificables, en primera persona.
   Anclas: 1943 (agua mineral Balseca), 1981–1984 (mi padre, presidente
   municipal de Tehuacán), 2010 (mi primer paso en la vida pública),
   2024 (delegado de Gobernación, microrregión 25) y el presente. */

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
    anio: '2010',
    titulo: 'Mi primer paso en la vida pública',
    texto:
      'Ya formado como abogado —con maestría en administración— y como emprendedor, di mi primer paso en la vida pública compitiendo por la presidencia municipal. Aprendí lo más importante: servir es, antes que nada, escuchar.',
    lugar: 'Tehuacán, Puebla',
  },
  {
    anio: '2024',
    titulo: 'Delegado de Gobernación · microrregión 25',
    texto:
      'Hoy soy delegado de Gobernación de la microrregión 25 de Tehuacán. Mi trabajo es de calle: recorro las colonias, escucho a vecinas y vecinos y acerco soluciones, una a una, donde de verdad se necesitan.',
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
