/* Hitos de trayectoria — datos reales verificados.
   Años 01-03 pendientes de confirmación por el equipo ([VALIDAR]). */

export type Hito = {
  anio: string
  titulo: string
  texto: string
  lugar?: string
}

export const TRAYECTORIA: Hito[] = [
  {
    anio: '[VALIDAR]',
    titulo: 'Origen y arraigo',
    texto:
      'Raíces en Tehuacán; familia ligada a la tradición empresarial del agua mineral y a la vida pública de la ciudad.',
    lugar: 'Tehuacán, Puebla',
  },
  {
    anio: '[VALIDAR]',
    titulo: 'Formación',
    texto:
      'Abogado con maestría en administración (MBA). Una mirada práctica: escuchar primero, resolver después.',
    lugar: 'Tehuacán, Puebla',
  },
  {
    anio: '[VALIDAR]',
    titulo: 'Emprendedor',
    texto:
      'Continuidad de la tradición del agua mineral y el emprendimiento en Tehuacán.',
    lugar: 'Tehuacán, Puebla',
  },
  {
    anio: '2010',
    titulo: 'Vida pública',
    texto:
      'Candidato a la presidencia municipal de Tehuacán. Primer paso formal en la arena política.',
    lugar: 'Tehuacán, Puebla',
  },
  {
    anio: '2024–2026',
    titulo: 'Delegado de Gobernación · microrregión 25',
    texto:
      'Trabajo territorial y de comunidad: recorridos por colonias, deporte, juventud y jornadas de servicio.',
    lugar: 'Tehuacán, Puebla',
  },
  {
    anio: 'Hoy',
    titulo: 'El movimiento sigue',
    texto:
      'Cerca de la gente, por nuestra tierra y nuestra gente, todos los días.',
    lugar: 'Tehuacán, Puebla',
  },
]
