import { useCallback, useEffect, useState } from 'react'
import { supabaseEnabled, sbSelect } from './supabase'
import { AGENDA, type Evento } from '../data/agenda'
import { REELS, type Reel } from '../data/reels'

/* Hooks de contenido: leen de Supabase si está configurado; si no (o si falla),
   usan los datos locales. Así el sitio nunca se rompe. El panel /admin escribe
   en Supabase y estas vistas se actualizan al recargar. */

const sortByDate = (l: Evento[]) => [...l].sort((a, b) => a.fechaISO.localeCompare(b.fechaISO))

type EventoRow = {
  id: string
  fecha: string
  titulo: string
  lugar: string | null
  descripcion: string | null
  estado: string | null
  cta_label: string | null
  cta_url: string | null
}

function mapEvento(r: EventoRow): Evento {
  return {
    id: r.id,
    fechaISO: (r.fecha ?? '').slice(0, 10),
    titulo: r.titulo,
    lugar: r.lugar ?? 'Tehuacán, Puebla',
    descripcion: r.descripcion ?? '',
    estado: r.estado === 'confirmado' ? 'confirmado' : 'tentativa',
    cta: r.cta_label && r.cta_url ? { label: r.cta_label, url: r.cta_url } : undefined,
  }
}

export function useEventos() {
  const [eventos, setEventos] = useState<Evento[]>(() => sortByDate(AGENDA))
  const [loading, setLoading] = useState(supabaseEnabled)

  const reload = useCallback(() => {
    if (!supabaseEnabled) return
    setLoading(true)
    sbSelect<EventoRow>('eventos', 'select=*&order=fecha.asc')
      .then((rows) => setEventos(sortByDate(rows.map(mapEvento))))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => reload(), [reload])
  return { eventos, loading, reload }
}

type ReelRow = {
  id: string
  titulo: string
  instagram_url: string
  orden?: number | null
}

function mapReel(r: ReelRow): Reel {
  return {
    id: r.id,
    titulo: r.titulo,
    kind: 'instagram',
    instagramUrl: r.instagram_url,
  }
}

export function useReels() {
  const [reels, setReels] = useState<Reel[]>(() => REELS)
  const [loading, setLoading] = useState(supabaseEnabled)

  const reload = useCallback(() => {
    if (!supabaseEnabled) return
    setLoading(true)
    sbSelect<ReelRow>('reels', 'select=*&order=orden.asc,created_at.desc')
      .then((rows) => {
        if (rows.length > 0) setReels(rows.map(mapReel))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => reload(), [reload])
  return { reels, loading, reload }
}
