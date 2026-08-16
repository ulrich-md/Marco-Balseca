/* Testimonios — "Recogiendo los sentimientos de Tehuacán".
   REEMPLAZAR: los testimonios de abajo son PLACEHOLDER creíbles para maquetar.
   Sustituir por voces reales (nombre, colonia y cita textual, con permiso). */

export type Testimonio = {
  id: string
  nombre: string
  lugar: string
  texto: string
  rol?: string
  /** URL de foto (opcional); sin foto se muestran las iniciales */
  foto?: string
}

export const TESTIMONIOS: Testimonio[] = [
  {
    id: 't1',
    nombre: 'Doña Rosa',
    rol: 'Comerciante',
    lugar: 'Mercado La Purísima',
    texto:
      'Marco no llega con cámaras, llega a preguntar cómo estamos. Se sentó, escuchó y a la semana ya había respuesta. Eso aquí no se veía.',
  },
  {
    id: 't2',
    nombre: 'Luis',
    rol: 'Entrenador de barrio',
    lugar: 'Col. San Diego Chalma',
    texto:
      'Con las retas y los torneos, los muchachos volvieron a la cancha en lugar de la esquina. Él estuvo aquí, en territorio, echando porras como uno más.',
  },
  {
    id: 't3',
    nombre: 'Mari',
    rol: 'Madre de familia',
    lugar: 'Junta auxiliar San Pablo Tepetzingo',
    texto:
      'Le dije lo del alumbrado de la calle de la escuela y no me pidió papeleo: me pidió la ubicación. A los días quedó. Así, sin rollo.',
  },
  {
    id: 't4',
    nombre: 'Don Chucho',
    rol: 'Jubilado',
    lugar: 'Centro de Tehuacán',
    texto:
      'A Marco lo conozco de hace años, de aquí de Tehuacán. Es de palabra. Y la palabra, en política, es todo.',
  },
]
