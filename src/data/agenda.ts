/* Agenda / Eventos — fechas TENTATIVAS pendientes de confirmación del equipo. */

export type Evento = {
  id: string
  fechaISO: string // 'YYYY-MM-DD'
  titulo: string
  lugar: string
  descripcion: string
  cta?: { label: string; url: string }
}

export const AGENDA: Evento[] = [
  {
    id: 'ev-1',
    fechaISO: '2026-07-12',
    titulo: 'Recorrido comunitario',
    lugar: 'Colonia por confirmar, Tehuacán',
    descripcion:
      'Caminata y escucha vecinal con Marco Balseca. Sede y hora por confirmar.',
  },
  {
    id: 'ev-2',
    fechaISO: '2026-07-20',
    titulo: 'Encuentro con jóvenes',
    lugar: 'Tehuacán, Puebla',
    descripcion:
      'Diálogo sobre oportunidades y futuro para las juventudes de Tehuacán. Sede por confirmar.',
  },
  {
    id: 'ev-3',
    fechaISO: '2026-08-03',
    titulo: 'Jornada cultural',
    lugar: 'Tehuacán, Puebla',
    descripcion:
      'Celebración de identidad, tradición y comunidad. Sede por confirmar.',
  },
  {
    id: 'ev-4',
    fechaISO: '2026-08-17',
    titulo: 'Asamblea comunitaria',
    lugar: 'Tehuacán, Puebla',
    descripcion: 'Información y propuestas para vecinas y vecinos. Sede por confirmar.',
  },
]
