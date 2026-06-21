/* Agenda / Eventos.
   Marco puede editar la agenda SIN tocar código desde una Hoja de Google:
   escribe el evento (fecha, título, lugar, etc.) y el sitio lo lee solo.
   Mientras no haya hoja configurada (o falle la red), se usa esta lista local.

   ── Cómo activarlo (una sola vez) ───────────────────────────────────────────
   1. Crea una Hoja de Google con esta primera fila (encabezados, en este orden):
        fecha | titulo | lugar | descripcion | estado | cta_label | cta_url
      · fecha: AAAA-MM-DD (ej. 2026-07-12) o DD/MM/AAAA.
      · estado: "confirmado" o "tentativa" (vacío = tentativa).
      · cta_label / cta_url: opcionales (botón del evento).
   2. Archivo → Compartir → Publicar en la web (o "Cualquiera con el enlace: lector").
   3. Copia el ID de la hoja (lo que va entre /d/ y /edit en la URL) y pégalo
      abajo en SHEET_ID. (O pega la URL CSV completa en AGENDA_SHEET_CSV_URL.)
   Listo: Marco edita la hoja y la agenda del sitio se actualiza sola.
   ──────────────────────────────────────────────────────────────────────────── */

export type Evento = {
  id: string
  fechaISO: string // 'YYYY-MM-DD'
  titulo: string
  lugar: string
  descripcion: string
  estado?: 'confirmado' | 'tentativa'
  cta?: { label: string; url: string }
}

// PEGA AQUÍ el ID de la Hoja de Google de Marco (entre /d/ y /edit). Vacío = lista local.
const SHEET_ID = ''
// Nombre de la pestaña/hoja dentro del documento.
const SHEET_NAME = 'Agenda'

/** URL CSV (gviz, accesible desde el navegador). Se arma desde SHEET_ID. */
export const AGENDA_SHEET_CSV_URL = SHEET_ID
  ? `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&sheet=${encodeURIComponent(SHEET_NAME)}`
  : ''

/** Lista local de respaldo (fechas TENTATIVAS hasta confirmar). */
export const AGENDA: Evento[] = [
  {
    id: 'ev-1',
    fechaISO: '2026-07-12',
    titulo: 'Recorrido comunitario',
    lugar: 'Colonia por confirmar, Tehuacán',
    descripcion: 'Caminata y escucha vecinal con Marco Balseca. Sede y hora por confirmar.',
    estado: 'tentativa',
  },
  {
    id: 'ev-2',
    fechaISO: '2026-07-20',
    titulo: 'Encuentro con jóvenes',
    lugar: 'Tehuacán, Puebla',
    descripcion:
      'Diálogo sobre oportunidades y futuro para las juventudes de Tehuacán. Sede por confirmar.',
    estado: 'tentativa',
  },
  {
    id: 'ev-3',
    fechaISO: '2026-08-03',
    titulo: 'Jornada cultural',
    lugar: 'Tehuacán, Puebla',
    descripcion: 'Celebración de identidad, tradición y comunidad. Sede por confirmar.',
    estado: 'tentativa',
  },
  {
    id: 'ev-4',
    fechaISO: '2026-08-17',
    titulo: 'Asamblea comunitaria',
    lugar: 'Tehuacán, Puebla',
    descripcion: 'Información y propuestas para vecinas y vecinos. Sede por confirmar.',
    estado: 'tentativa',
  },
]

/** Parser CSV mínimo (maneja comillas y comas dentro de campos). */
function parseCSV(text: string): string[][] {
  const rows: string[][] = []
  let row: string[] = []
  let field = ''
  let inQuotes = false
  for (let i = 0; i < text.length; i++) {
    const c = text[i]
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"'
          i++
        } else inQuotes = false
      } else field += c
    } else if (c === '"') inQuotes = true
    else if (c === ',') {
      row.push(field)
      field = ''
    } else if (c === '\n') {
      row.push(field)
      rows.push(row)
      row = []
      field = ''
    } else if (c !== '\r') field += c
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field)
    rows.push(row)
  }
  return rows
}

/** Normaliza fecha a 'YYYY-MM-DD' (acepta DD/MM/AAAA). */
function normalizeDate(raw: string): string {
  const s = raw.trim()
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s
  const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
  if (m) return `${m[3]}-${m[2].padStart(2, '0')}-${m[1].padStart(2, '0')}`
  return s
}

/** Convierte el CSV de la Hoja de Google en eventos. Devuelve [] si no hay datos. */
export function parseAgendaCSV(text: string): Evento[] {
  const rows = parseCSV(text).filter((r) => r.some((c) => c.trim() !== ''))
  if (rows.length < 2) return []
  const header = rows[0].map((h) => h.trim().toLowerCase())
  const idx = (name: string) => header.indexOf(name)
  const iFecha = idx('fecha')
  const iTitulo = idx('titulo') === -1 ? idx('título') : idx('titulo')
  const iLugar = idx('lugar')
  const iDesc = idx('descripcion') === -1 ? idx('descripción') : idx('descripcion')
  const iEstado = idx('estado')
  const iCtaLabel = idx('cta_label')
  const iCtaUrl = idx('cta_url')

  const out: Evento[] = []
  for (let r = 1; r < rows.length; r++) {
    const row = rows[r]
    const titulo = (iTitulo >= 0 ? row[iTitulo] : '')?.trim()
    const fecha = (iFecha >= 0 ? row[iFecha] : '')?.trim()
    if (!titulo || !fecha) continue
    const ctaLabel = iCtaLabel >= 0 ? row[iCtaLabel]?.trim() : ''
    const ctaUrl = iCtaUrl >= 0 ? row[iCtaUrl]?.trim() : ''
    const estadoRaw = (iEstado >= 0 ? row[iEstado] : '')?.trim().toLowerCase()
    out.push({
      id: `sheet-${r}`,
      fechaISO: normalizeDate(fecha),
      titulo,
      lugar: (iLugar >= 0 ? row[iLugar] : '')?.trim() || 'Tehuacán, Puebla',
      descripcion: (iDesc >= 0 ? row[iDesc] : '')?.trim() || '',
      estado: estadoRaw === 'confirmado' ? 'confirmado' : 'tentativa',
      cta: ctaLabel && ctaUrl ? { label: ctaLabel, url: ctaUrl } : undefined,
    })
  }
  return out
}
