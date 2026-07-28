/* Hitos de trayectoria — en primera persona, tono profesional y verificable.
   Anclas: origen familiar (agua mineral de Tehuacán), el servicio público de
   familia, los primeros pasos en la vida pública, la etapa en Chiapas
   (campaña de Manuel Velasco e INAES / economía social) y hoy: delegado de
   Gobernación del Estado de Puebla, microrregión 25, con sede en Tehuacán. */

export type Hito = {
  anio: string
  titulo: string
  texto: string
  lugar?: string
}

export const TRAYECTORIA: Hito[] = [
  {
    anio: '1943',
    titulo: 'Raíces en Tehuacán',
    texto:
      'La familia Balseca formó parte de la industria del agua mineral que dio identidad y orgullo a Tehuacán, junto a casas como Peñafiel y Garci-Crespo. De ese origen heredé el valor del trabajo, del oficio y de la palabra cumplida.',
    lugar: 'Tehuacán, Puebla',
  },
  {
    anio: '1981',
    titulo: 'El servicio público, de familia',
    texto:
      'Mi padre, Marco Antonio Balseca Chávez, fue presidente municipal de Tehuacán (1981–1984). Crecí viendo que servir a la ciudad se ejerce con cercanía y responsabilidad; esa vocación marcó mi camino.',
    lugar: 'Tehuacán, Puebla',
  },
  {
    anio: 'Inicios',
    titulo: 'Primeros pasos en la vida pública',
    texto:
      'Comencé joven en la organización juvenil y comunitaria, al frente del Frente Juvenil Revolucionario en Puebla. Ahí aprendí lo esencial: la política se ejerce de cerca, escuchando a la gente y organizando causas comunes.',
    lugar: 'Puebla',
  },
  {
    anio: 'Formación',
    titulo: 'Abogado, maestro y emprendedor',
    texto:
      'Me formé como abogado y maestro en Administración, y desarrollé actividad empresarial en Tehuacán. Esa combinación —derecho, gestión y empresa— me dio un método claro para resolver: entender el problema a fondo y actuar con orden.',
    lugar: 'Tehuacán, Puebla',
  },
  {
    anio: 'Chiapas',
    titulo: 'Coordinación de campaña',
    texto:
      'Coordiné la campaña de Manuel Velasco en Chiapas. Fue una etapa de intenso trabajo territorial que reafirmó una convicción: los proyectos se sostienen con organización y con gente que cree en ellos.',
    lugar: 'Chiapas',
  },
  {
    anio: 'INAES',
    titulo: 'Economía social',
    texto:
      'En Chiapas coordiné el equipo de asesores del Gobierno del estado y asumí responsabilidades en el INAES (Instituto Nacional de la Economía Social). Trabajé de cerca con cooperativas, artesanos y productores, impulsando que los apoyos llegaran a quienes generan trabajo.',
    lugar: 'Chiapas',
  },
  {
    anio: 'Nacional',
    titulo: 'Planeación con visión de país',
    texto:
      'Participé en la planeación nacional del INAES, una responsabilidad que me dio una visión integral del país y confirmó una idea de fondo: las mejores políticas públicas nacen del territorio y del contacto directo con la gente.',
    lugar: 'Ciudad de México',
  },
  {
    anio: '2024',
    titulo: 'Delegado de Gobernación en Tehuacán',
    texto:
      'Regresé a casa como delegado de Gobernación del Estado de Puebla en la microrregión 25. Mi trabajo es territorial: en los mercados, en las juntas auxiliares y en las colonias, atendiendo y resolviendo de cerca las necesidades de las familias.',
    lugar: 'Tehuacán, Puebla',
  },
  {
    anio: 'Hoy',
    titulo: 'Cerca de la gente',
    texto:
      'Cerca de la gente, por nuestra tierra. Tehuacán es mi casa y mi compromiso, y seguiré trabajando en territorio, todos los días, al lado de sus familias.',
    lugar: 'Tehuacán, Puebla',
  },
]
