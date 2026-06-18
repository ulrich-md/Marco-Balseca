/* Agenda / Eventos — array local fácil de actualizar. PLACEHOLDERS.
   Formato de fecha ISO para ordenar; el equipo edita con eventos reales. */

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
    titulo: '[Recorrido comunitario]',
    lugar: 'Colonia [nombre], Tehuacán',
    descripcion:
      'Caminata y escucha vecinal. // REEMPLAZAR: detalle real del evento.',
  },
  {
    id: 'ev-2',
    fechaISO: '2026-07-20',
    titulo: '[Encuentro con jóvenes]',
    lugar: '[Sede], Tehuacán, Puebla',
    descripcion:
      'Diálogo sobre oportunidades y futuro. // REEMPLAZAR: detalle real.',
  },
  {
    id: 'ev-3',
    fechaISO: '2026-08-03',
    titulo: '[Jornada cultural náhuatl]',
    lugar: '[Sede], Tehuacán, Puebla',
    descripcion:
      'Celebración de lenguas maternas y tradición. // REEMPLAZAR: detalle real.',
  },
  {
    id: 'ev-4',
    fechaISO: '2026-08-17',
    titulo: '[Asamblea informativa]',
    lugar: '[Sede], Tehuacán, Puebla',
    descripcion: 'Rendición de cuentas y propuestas. // REEMPLAZAR: detalle real.',
  },
]
