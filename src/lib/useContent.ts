import { useCallback, useEffect, useState } from 'react'
import { supabaseEnabled, sbSelect } from './supabase'
import { AGENDA, type Evento } from '../data/agenda'
import { REELS, type Reel } from '../data/reels'
import { ACCIONES, type Accion } from '../data/acciones'
import { TESTIMONIOS, type Testimonio } from '../data/testimonios'
import { NOTICIAS, type Noticia } from '../data/noticias'

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
      .then((rows) => {
        // Si la tabla está vacía, conserva la lista local (no dejar la agenda en blanco).
        if (rows.length > 0) setEventos(sortByDate(rows.map(mapEvento)))
      })
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

type AccionRow = {
  id: string
  slug: string | null
  categoria: string | null
  titulo: string
  resumen: string | null
  detalle: string | null
  imagen: string | null
  orden?: number | null
}

function mapAccion(r: AccionRow): Accion {
  return {
    id: r.id,
    slug: r.slug || r.id,
    categoria: r.categoria ?? 'Propuesta',
    titulo: r.titulo,
    resumen: r.resumen ?? '',
    detalle: r.detalle ?? undefined,
    imagen: r.imagen ?? undefined,
  }
}

type NoticiaRow = {
  id: string
  titulo: string
  fecha: string | null
  imagen: string | null
  url: string | null
  orden?: number | null
}

function mapNoticia(r: NoticiaRow): Noticia {
  return {
    id: r.id,
    titulo: r.titulo,
    fecha: r.fecha ?? undefined,
    imagen: r.imagen ?? undefined,
    url: r.url ?? '#',
  }
}

export function useNoticias() {
  const [noticias, setNoticias] = useState<Noticia[]>(() => NOTICIAS)
  const [loading, setLoading] = useState(supabaseEnabled)

  const reload = useCallback(() => {
    if (!supabaseEnabled) return
    setLoading(true)
    sbSelect<NoticiaRow>('noticias', 'select=*&order=fecha.desc.nullslast,created_at.desc')
      .then((rows) => {
        if (rows.length > 0) setNoticias(rows.map(mapNoticia))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => reload(), [reload])
  return { noticias, loading, reload }
}

type TestimonioRow = {
  id: string
  nombre: string
  rol: string | null
  lugar: string | null
  texto: string
  foto: string | null
  orden?: number | null
}

function mapTestimonio(r: TestimonioRow): Testimonio {
  return {
    id: r.id,
    nombre: r.nombre,
    rol: r.rol ?? undefined,
    lugar: r.lugar ?? 'Tehuacán, Puebla',
    texto: r.texto,
    foto: r.foto ?? undefined,
  }
}

export function useTestimonios() {
  const [testimonios, setTestimonios] = useState<Testimonio[]>(() => TESTIMONIOS)
  const [loading, setLoading] = useState(supabaseEnabled)

  const reload = useCallback(() => {
    if (!supabaseEnabled) return
    setLoading(true)
    sbSelect<TestimonioRow>('testimonios', 'select=*&order=orden.asc,created_at.desc')
      .then((rows) => {
        if (rows.length > 0) setTestimonios(rows.map(mapTestimonio))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => reload(), [reload])
  return { testimonios, loading, reload }
}

export function useAcciones() {
  const [acciones, setAcciones] = useState<Accion[]>(() => ACCIONES)
  const [loading, setLoading] = useState(supabaseEnabled)

  const reload = useCallback(() => {
    if (!supabaseEnabled) return
    setLoading(true)
    sbSelect<AccionRow>('acciones', 'select=*&order=orden.asc,created_at.desc')
      .then((rows) => {
        if (rows.length > 0) setAcciones(rows.map(mapAccion))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => reload(), [reload])
  return { acciones, loading, reload }
}
