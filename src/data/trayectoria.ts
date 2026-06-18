/* Hitos de trayectoria — TODOS PLACEHOLDER.
   No inventar fechas ni cargos: el equipo llena [año] y [hito] con datos reales. */

export type Hito = {
  anio: string
  titulo: string
  texto: string
  lugar?: string
}

export const TRAYECTORIA: Hito[] = [
  {
    anio: '[año]',
    titulo: '[Origen y formación]',
    texto:
      'Raíces en Tehuacán; formación como abogado y emprendedor. // REEMPLAZAR: hito real de origen.',
    lugar: 'Tehuacán, Puebla',
  },
  {
    anio: '[año]',
    titulo: '[Primer proyecto comunitario]',
    texto:
      'Inicio del trabajo cercano con la comunidad. // REEMPLAZAR: descripción del hito.',
    lugar: 'Tehuacán, Puebla',
  },
  {
    anio: '[año]',
    titulo: '[Iniciativa / causa]',
    texto:
      'Impulso a una causa de impacto local. // REEMPLAZAR: detalle verificable.',
  },
  {
    anio: '[año]',
    titulo: '[Reconocimiento o logro]',
    texto: '// REEMPLAZAR: logro real, sin exagerar cifras.',
  },
  {
    anio: '[año]',
    titulo: '[Acción política-comunitaria actual]',
    texto:
      'Etapa actual: acciones políticas y de comunidad. // REEMPLAZAR: foco presente.',
    lugar: 'Tehuacán, Puebla',
  },
  {
    anio: 'Hoy',
    titulo: 'Tiui Chikavak',
    texto:
      'El movimiento sigue. Vámonos recio, por nuestra tierra y nuestra gente.',
    lugar: 'Tehuacán, Puebla',
  },
]
