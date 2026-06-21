import { useEffect, useState, type FormEvent } from 'react'
import { Seo } from '../lib/Seo'
import { supabaseEnabled, sbSelect, sbInsert, sbUpdate, sbDelete } from '../lib/supabase'
import { igEmbedSrc } from '../lib/instagram'

/* =========================================================================
   Panel oculto para que Marco edite la Agenda y los Reels desde la web.
   - Ruta: /admin (no aparece en el menú).
   - SIN contraseña por ahora (como se pidió). No compartas el enlace.
   - Pestañas separadas (Agenda / Reels) para que sea muy fácil de usar.
   ========================================================================= */

const SQL = `create extension if not exists pgcrypto;

create table if not exists eventos (
  id uuid primary key default gen_random_uuid(),
  fecha date not null, titulo text not null, lugar text, descripcion text,
  estado text default 'tentativa', cta_label text, cta_url text,
  created_at timestamptz default now());

create table if not exists reels (
  id uuid primary key default gen_random_uuid(),
  titulo text not null, instagram_url text not null, orden int default 0,
  created_at timestamptz default now());

alter table eventos enable row level security;
alter table reels enable row level security;
create policy "eventos read"  on eventos for select using (true);
create policy "eventos write" on eventos for all using (true) with check (true);
create policy "reels read"    on reels   for select using (true);
create policy "reels write"   on reels   for all using (true) with check (true);`

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
type ReelRow = { id: string; titulo: string; instagram_url: string; orden: number | null }

const label = 'mb-1.5 block text-sm font-medium text-ink'
const input =
  'w-full rounded-lg border border-ink/20 bg-white px-3.5 py-2.5 text-ink placeholder:text-mute/60 focus:border-accent focus:outline-none'
const btn =
  'inline-flex items-center justify-center gap-2 rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent-deep disabled:opacity-50'
const btnGhost =
  'inline-flex items-center gap-1.5 rounded-lg border border-ink/20 px-3 py-2 text-xs font-semibold text-ink transition-colors hover:border-accent hover:text-accent'
const btnDanger =
  'inline-flex items-center gap-1.5 rounded-lg border border-accent/30 px-3 py-2 text-xs font-semibold text-accent transition-colors hover:bg-accent hover:text-white'

const EMPTY_EV: Omit<EventoRow, 'id'> = {
  fecha: '',
  titulo: '',
  lugar: '',
  descripcion: '',
  estado: 'tentativa',
  cta_label: '',
  cta_url: '',
}

const CalIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <rect x="3" y="4.5" width="18" height="16" rx="2" />
    <path d="M3 9h18M8 3v3M16 3v3" strokeLinecap="round" />
  </svg>
)
const PlayIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
    <path d="M8 5v14l11-7z" />
  </svg>
)

function fmtFecha(iso: string) {
  try {
    return new Intl.DateTimeFormat('es-MX', { day: '2-digit', month: 'short', year: 'numeric' }).format(
      new Date(`${iso.slice(0, 10)}T00:00:00`),
    )
  } catch {
    return iso
  }
}

export default function Admin() {
  const [tab, setTab] = useState<'agenda' | 'reels'>('agenda')
  const [eventos, setEventos] = useState<EventoRow[]>([])
  const [reels, setReels] = useState<ReelRow[]>([])
  const [ev, setEv] = useState<Omit<EventoRow, 'id'> & { id?: string }>({ ...EMPTY_EV })
  const [reel, setReel] = useState({ titulo: '', instagram_url: '' })
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)

  const load = () => {
    if (!supabaseEnabled) return
    sbSelect<EventoRow>('eventos', 'select=*&order=fecha.asc').then(setEventos).catch(() => {})
    sbSelect<ReelRow>('reels', 'select=*&order=orden.asc,created_at.desc').then(setReels).catch(() => {})
  }
  useEffect(load, [])

  const flash = (t: string) => {
    setMsg(t)
    window.setTimeout(() => setMsg(''), 2800)
  }

  const saveEvento = async (e: FormEvent) => {
    e.preventDefault()
    setBusy(true)
    try {
      const { id, ...payload } = ev
      if (id) await sbUpdate('eventos', id, payload)
      else await sbInsert('eventos', payload)
      setEv({ ...EMPTY_EV })
      flash(id ? 'Cambios guardados ✓' : 'Evento agregado ✓')
      load()
    } catch (err) {
      flash('Error: ' + (err as Error).message)
    } finally {
      setBusy(false)
    }
  }

  const saveReel = async (e: FormEvent) => {
    e.preventDefault()
    if (!igEmbedSrc(reel.instagram_url)) {
      flash('Ese enlace no parece un reel de Instagram. Revisa que sea como instagram.com/reel/...')
      return
    }
    setBusy(true)
    try {
      const orden = (reels[reels.length - 1]?.orden ?? reels.length) + 1
      await sbInsert('reels', { ...reel, orden })
      setReel({ titulo: '', instagram_url: '' })
      flash('Reel agregado ✓')
      load()
    } catch (err) {
      flash('Error: ' + (err as Error).message)
    } finally {
      setBusy(false)
    }
  }

  const del = async (table: 'eventos' | 'reels', id: string, what: string) => {
    if (!window.confirm(`¿Eliminar ${what}? No se puede deshacer.`)) return
    try {
      await sbDelete(table, id)
      flash('Eliminado ✓')
      load()
    } catch (err) {
      flash('Error: ' + (err as Error).message)
    }
  }

  return (
    <div className="min-h-screen bg-bone px-4 py-10 text-ink md:px-8">
      <Seo title="Panel de edición" path="/admin" description="Panel privado de edición." noindex />
      <div className="mx-auto max-w-3xl">
        {/* Cabecera */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="font-display text-4xl leading-none text-ink">Panel de Marco</h1>
            <p className="mt-2 text-sm text-mute">
              Edita lo que aparece en el sitio. Los cambios se publican al instante.
            </p>
          </div>
          <a href="/" className={btnGhost}>
            Ver el sitio ↗
          </a>
        </div>

        {!supabaseEnabled ? (
          <div className="mt-8 rounded-xl border border-accent/30 bg-white p-6">
            <h2 className="font-condensed text-2xl font-semibold text-accent">Falta conectar Supabase</h2>
            <p className="mt-3 text-sm text-ink/80">
              Crea un proyecto en supabase.com, ejecuta este SQL en el SQL Editor, y agrega las
              variables <code className="rounded bg-ink/5 px-1">VITE_SUPABASE_URL</code> y{' '}
              <code className="rounded bg-ink/5 px-1">VITE_SUPABASE_ANON_KEY</code> en Vercel.
            </p>
            <pre className="mt-4 overflow-x-auto rounded-lg bg-ink p-4 text-xs leading-relaxed text-bone">
              {SQL}
            </pre>
          </div>
        ) : (
          <>
            {/* Pestañas */}
            <div className="mt-8 grid grid-cols-2 gap-2 rounded-xl border border-ink/12 bg-white p-1.5">
              <button
                type="button"
                onClick={() => setTab('agenda')}
                className={`flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold transition-colors ${
                  tab === 'agenda' ? 'bg-accent text-white' : 'text-ink hover:bg-ink/5'
                }`}
              >
                <CalIcon /> Agenda
                <span className={`text-xs ${tab === 'agenda' ? 'text-white/80' : 'text-mute'}`}>
                  ({eventos.length})
                </span>
              </button>
              <button
                type="button"
                onClick={() => setTab('reels')}
                className={`flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold transition-colors ${
                  tab === 'reels' ? 'bg-accent text-white' : 'text-ink hover:bg-ink/5'
                }`}
              >
                <PlayIcon /> Reels
                <span className={`text-xs ${tab === 'reels' ? 'text-white/80' : 'text-mute'}`}>
                  ({reels.length})
                </span>
              </button>
            </div>

            {msg && (
              <p className="mt-4 rounded-lg bg-ink px-4 py-3 text-sm font-medium text-bone" role="status">
                {msg}
              </p>
            )}

            {/* ============ AGENDA ============ */}
            {tab === 'agenda' && (
              <div className="mt-6 space-y-6">
                <div className="rounded-xl border border-ink/12 bg-white p-6">
                  <h2 className="font-condensed text-xl font-semibold uppercase tracking-wide text-ink">
                    {ev.id ? 'Editar evento' : 'Agregar un evento'}
                  </h2>
                  <p className="mt-1 text-sm text-mute">
                    Aparecerá en la página <strong>Agenda</strong> del sitio, ordenado por fecha.
                  </p>
                  <form onSubmit={saveEvento} className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className={label}>Fecha</label>
                      <input
                        type="date"
                        required
                        className={input}
                        value={ev.fecha?.slice(0, 10) ?? ''}
                        onChange={(e) => setEv({ ...ev, fecha: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className={label}>¿Confirmado o tentativo?</label>
                      <select
                        className={input}
                        value={ev.estado ?? 'tentativa'}
                        onChange={(e) => setEv({ ...ev, estado: e.target.value })}
                      >
                        <option value="tentativa">Tentativa (por confirmar)</option>
                        <option value="confirmado">Confirmado</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className={label}>Título del evento</label>
                      <input
                        required
                        className={input}
                        placeholder="Ej. Recorrido por la colonia San Diego"
                        value={ev.titulo}
                        onChange={(e) => setEv({ ...ev, titulo: e.target.value })}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={label}>Lugar</label>
                      <input
                        className={input}
                        placeholder="Ej. Parque principal, Tehuacán"
                        value={ev.lugar ?? ''}
                        onChange={(e) => setEv({ ...ev, lugar: e.target.value })}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={label}>Descripción</label>
                      <textarea
                        className={input}
                        rows={2}
                        placeholder="¿De qué trata? ¿A qué hora?"
                        value={ev.descripcion ?? ''}
                        onChange={(e) => setEv({ ...ev, descripcion: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className={label}>Texto del botón (opcional)</label>
                      <input
                        className={input}
                        placeholder="Ej. Quiero ir"
                        value={ev.cta_label ?? ''}
                        onChange={(e) => setEv({ ...ev, cta_label: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className={label}>Link del botón (opcional)</label>
                      <input
                        className={input}
                        placeholder="https://..."
                        value={ev.cta_url ?? ''}
                        onChange={(e) => setEv({ ...ev, cta_url: e.target.value })}
                      />
                    </div>
                    <div className="flex items-center gap-3 sm:col-span-2">
                      <button type="submit" className={btn} disabled={busy}>
                        {ev.id ? 'Guardar cambios' : 'Agregar evento'}
                      </button>
                      {ev.id && (
                        <button type="button" className={btnGhost} onClick={() => setEv({ ...EMPTY_EV })}>
                          Cancelar
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                <div className="rounded-xl border border-ink/12 bg-white">
                  <p className="border-b border-ink/10 px-6 py-4 font-condensed text-lg font-semibold uppercase tracking-wide text-ink">
                    Eventos publicados ({eventos.length})
                  </p>
                  <ul className="divide-y divide-ink/10">
                    {eventos.map((e) => (
                      <li key={e.id} className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-ink">{e.titulo}</p>
                          <p className="text-xs text-mute">
                            {fmtFecha(e.fecha)} · {e.estado === 'confirmado' ? 'Confirmado' : 'Tentativa'}
                            {e.lugar ? ` · ${e.lugar}` : ''}
                          </p>
                        </div>
                        <div className="flex shrink-0 gap-2">
                          <button
                            className={btnGhost}
                            onClick={() => {
                              setEv({ ...e, fecha: e.fecha?.slice(0, 10) })
                              window.scrollTo({ top: 0, behavior: 'smooth' })
                            }}
                          >
                            Editar
                          </button>
                          <button className={btnDanger} onClick={() => del('eventos', e.id, 'este evento')}>
                            Eliminar
                          </button>
                        </div>
                      </li>
                    ))}
                    {eventos.length === 0 && (
                      <li className="px-6 py-6 text-center text-sm text-mute">
                        Aún no hay eventos. Agrega el primero con el formulario de arriba.
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            )}

            {/* ============ REELS ============ */}
            {tab === 'reels' && (
              <div className="mt-6 space-y-6">
                <div className="rounded-xl border border-ink/12 bg-white p-6">
                  <h2 className="font-condensed text-xl font-semibold uppercase tracking-wide text-ink">
                    Agregar un reel
                  </h2>
                  <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-mute">
                    <li>En Instagram, abre el reel.</li>
                    <li>
                      Toca el ícono de <strong>compartir</strong> (el avioncito) → <strong>Copiar enlace</strong>.
                    </li>
                    <li>Pega el enlace aquí abajo y ponle un título.</li>
                  </ol>
                  <form onSubmit={saveReel} className="mt-5 grid gap-4">
                    <div>
                      <label className={label}>Título del reel</label>
                      <input
                        required
                        className={input}
                        placeholder="Ej. Jornada de salud en la colonia"
                        value={reel.titulo}
                        onChange={(e) => setReel({ ...reel, titulo: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className={label}>Enlace del reel</label>
                      <input
                        required
                        className={input}
                        placeholder="https://www.instagram.com/reel/..."
                        value={reel.instagram_url}
                        onChange={(e) => setReel({ ...reel, instagram_url: e.target.value })}
                      />
                    </div>
                    <div>
                      <button type="submit" className={btn} disabled={busy}>
                        Agregar reel
                      </button>
                    </div>
                  </form>
                </div>

                <div className="rounded-xl border border-ink/12 bg-white">
                  <p className="border-b border-ink/10 px-6 py-4 font-condensed text-lg font-semibold uppercase tracking-wide text-ink">
                    Reels publicados ({reels.length})
                  </p>
                  <ul className="divide-y divide-ink/10">
                    {reels.map((r) => (
                      <li key={r.id} className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-ink">{r.titulo}</p>
                          <a
                            href={r.instagram_url}
                            target="_blank"
                            rel="noreferrer"
                            className="truncate text-xs text-accent hover:underline"
                          >
                            {r.instagram_url}
                          </a>
                        </div>
                        <button className={btnDanger} onClick={() => del('reels', r.id, 'este reel')}>
                          Eliminar
                        </button>
                      </li>
                    ))}
                    {reels.length === 0 && (
                      <li className="px-6 py-6 text-center text-sm text-mute">
                        Aún no hay reels. Pega el primer enlace con el formulario de arriba.
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
