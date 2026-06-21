import { useEffect, useState, type FormEvent } from 'react'
import { Seo } from '../lib/Seo'
import { supabaseEnabled, sbSelect, sbInsert, sbUpdate, sbDelete } from '../lib/supabase'

/* =========================================================================
   Panel oculto para que Marco edite Agenda y Reels desde la web.
   - Ruta: /admin  (no aparece en el menú).
   - SIN autenticación por ahora (como se pidió). Cualquiera con el enlace puede
     editar: cámbiale la ruta y/o añade login cuando quieras.
   - Datos en Supabase (tablas `eventos` y `reels`). Si no está configurado,
     muestra los pasos de instalación.
   ========================================================================= */

const SQL = `-- Pega esto en Supabase → SQL Editor → Run
create extension if not exists pgcrypto;

create table if not exists eventos (
  id uuid primary key default gen_random_uuid(),
  fecha date not null,
  titulo text not null,
  lugar text,
  descripcion text,
  estado text default 'tentativa',
  cta_label text,
  cta_url text,
  created_at timestamptz default now()
);

create table if not exists reels (
  id uuid primary key default gen_random_uuid(),
  titulo text not null,
  instagram_url text not null,
  orden int default 0,
  created_at timestamptz default now()
);

alter table eventos enable row level security;
alter table reels enable row level security;
-- Lectura y escritura públicas (SIN auth). Restringe cuando agregues login.
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

const input =
  'w-full rounded-md border border-ink/20 bg-white px-3 py-2 text-sm text-ink focus:border-accent focus:outline-none'
const btn =
  'rounded-md bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-deep disabled:opacity-50'
const btnGhost =
  'rounded-md border border-ink/20 px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:border-accent hover:text-accent'

const EMPTY_EV: Omit<EventoRow, 'id'> = {
  fecha: '',
  titulo: '',
  lugar: '',
  descripcion: '',
  estado: 'tentativa',
  cta_label: '',
  cta_url: '',
}

export default function Admin() {
  const [eventos, setEventos] = useState<EventoRow[]>([])
  const [reels, setReels] = useState<ReelRow[]>([])
  const [ev, setEv] = useState<Omit<EventoRow, 'id'> & { id?: string }>({ ...EMPTY_EV })
  const [reel, setReel] = useState({ titulo: '', instagram_url: '', orden: 0 })
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
    window.setTimeout(() => setMsg(''), 2500)
  }

  const saveEvento = async (e: FormEvent) => {
    e.preventDefault()
    setBusy(true)
    try {
      const { id, ...payload } = ev
      if (id) await sbUpdate('eventos', id, payload)
      else await sbInsert('eventos', payload)
      setEv({ ...EMPTY_EV })
      flash('Evento guardado ✓')
      load()
    } catch (err) {
      flash('Error: ' + (err as Error).message)
    } finally {
      setBusy(false)
    }
  }

  const saveReel = async (e: FormEvent) => {
    e.preventDefault()
    setBusy(true)
    try {
      await sbInsert('reels', reel)
      setReel({ titulo: '', instagram_url: '', orden: 0 })
      flash('Reel agregado ✓')
      load()
    } catch (err) {
      flash('Error: ' + (err as Error).message)
    } finally {
      setBusy(false)
    }
  }

  const del = async (table: 'eventos' | 'reels', id: string) => {
    if (!window.confirm('¿Eliminar?')) return
    try {
      await sbDelete(table, id)
      flash('Eliminado ✓')
      load()
    } catch (err) {
      flash('Error: ' + (err as Error).message)
    }
  }

  return (
    <div className="min-h-screen bg-bone px-4 py-10 text-ink md:px-10">
      <Seo title="Panel de edición" path="/admin" description="Panel privado de edición." noindex />
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-4xl text-ink">Panel de Marco</h1>
        <p className="mt-2 text-sm text-mute">
          Edita la <strong>Agenda</strong> y los <strong>Reels</strong>. Los cambios se publican solos
          en el sitio. (Sin contraseña por ahora: no compartas este enlace.)
        </p>

        {!supabaseEnabled ? (
          <div className="mt-8 rounded-lg border border-accent/30 bg-white p-6">
            <h2 className="font-condensed text-2xl font-semibold text-accent">Falta conectar Supabase</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-ink/80">
              <li>
                Crea un proyecto gratis en <strong>supabase.com</strong>.
              </li>
              <li>
                En <strong>SQL Editor</strong>, pega y ejecuta el SQL de abajo (crea las tablas).
              </li>
              <li>
                En Vercel → Settings → Environment Variables, añade{' '}
                <code className="rounded bg-ink/5 px-1">VITE_SUPABASE_URL</code> y{' '}
                <code className="rounded bg-ink/5 px-1">VITE_SUPABASE_ANON_KEY</code> (Project Settings
                → API en Supabase) y vuelve a desplegar.
              </li>
            </ol>
            <pre className="mt-4 overflow-x-auto rounded-md bg-ink p-4 text-xs leading-relaxed text-bone">
              {SQL}
            </pre>
          </div>
        ) : (
          <div className="mt-8 space-y-12">
            {msg && (
              <p className="rounded-md bg-ink px-4 py-2 text-sm text-bone" role="status">
                {msg}
              </p>
            )}

            {/* ---- Eventos ---- */}
            <section>
              <h2 className="font-condensed text-2xl font-semibold uppercase tracking-wide text-ink">
                Agenda · eventos
              </h2>
              <form onSubmit={saveEvento} className="mt-4 grid gap-3 rounded-lg border border-ink/12 bg-white p-5 sm:grid-cols-2">
                <label className="text-sm">
                  Fecha
                  <input type="date" required className={input} value={ev.fecha} onChange={(e) => setEv({ ...ev, fecha: e.target.value })} />
                </label>
                <label className="text-sm">
                  Estado
                  <select className={input} value={ev.estado ?? 'tentativa'} onChange={(e) => setEv({ ...ev, estado: e.target.value })}>
                    <option value="tentativa">Tentativa</option>
                    <option value="confirmado">Confirmado</option>
                  </select>
                </label>
                <label className="text-sm sm:col-span-2">
                  Título
                  <input required className={input} value={ev.titulo} onChange={(e) => setEv({ ...ev, titulo: e.target.value })} />
                </label>
                <label className="text-sm sm:col-span-2">
                  Lugar
                  <input className={input} value={ev.lugar ?? ''} onChange={(e) => setEv({ ...ev, lugar: e.target.value })} />
                </label>
                <label className="text-sm sm:col-span-2">
                  Descripción
                  <textarea className={input} rows={2} value={ev.descripcion ?? ''} onChange={(e) => setEv({ ...ev, descripcion: e.target.value })} />
                </label>
                <label className="text-sm">
                  Texto del botón (opcional)
                  <input className={input} value={ev.cta_label ?? ''} onChange={(e) => setEv({ ...ev, cta_label: e.target.value })} />
                </label>
                <label className="text-sm">
                  Link del botón (opcional)
                  <input className={input} value={ev.cta_url ?? ''} onChange={(e) => setEv({ ...ev, cta_url: e.target.value })} />
                </label>
                <div className="flex items-center gap-3 sm:col-span-2">
                  <button type="submit" className={btn} disabled={busy}>
                    {ev.id ? 'Guardar cambios' : 'Agregar evento'}
                  </button>
                  {ev.id && (
                    <button type="button" className={btnGhost} onClick={() => setEv({ ...EMPTY_EV })}>
                      Cancelar edición
                    </button>
                  )}
                </div>
              </form>

              <ul className="mt-4 divide-y divide-ink/10 rounded-lg border border-ink/12 bg-white">
                {eventos.map((e) => (
                  <li key={e.id} className="flex items-center justify-between gap-3 px-4 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink">
                        {e.fecha} · {e.titulo}
                      </p>
                      <p className="truncate text-xs text-mute">
                        {e.estado} · {e.lugar}
                      </p>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <button className={btnGhost} onClick={() => setEv({ ...e, fecha: e.fecha?.slice(0, 10) })}>
                        Editar
                      </button>
                      <button className={btnGhost} onClick={() => del('eventos', e.id)}>
                        Borrar
                      </button>
                    </div>
                  </li>
                ))}
                {eventos.length === 0 && <li className="px-4 py-3 text-sm text-mute">Sin eventos aún.</li>}
              </ul>
            </section>

            {/* ---- Reels ---- */}
            <section>
              <h2 className="font-condensed text-2xl font-semibold uppercase tracking-wide text-ink">
                Reels de Instagram
              </h2>
              <p className="mt-1 text-sm text-mute">
                Pega el enlace del reel (ej. https://www.instagram.com/reel/XXXX/). Aparece solo en el
                sitio.
              </p>
              <form onSubmit={saveReel} className="mt-4 grid gap-3 rounded-lg border border-ink/12 bg-white p-5 sm:grid-cols-[1fr_1fr_auto]">
                <input required placeholder="Título" className={input} value={reel.titulo} onChange={(e) => setReel({ ...reel, titulo: e.target.value })} />
                <input required placeholder="URL del reel" className={input} value={reel.instagram_url} onChange={(e) => setReel({ ...reel, instagram_url: e.target.value })} />
                <button type="submit" className={btn} disabled={busy}>
                  Agregar
                </button>
              </form>

              <ul className="mt-4 divide-y divide-ink/10 rounded-lg border border-ink/12 bg-white">
                {reels.map((r) => (
                  <li key={r.id} className="flex items-center justify-between gap-3 px-4 py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-ink">{r.titulo}</p>
                      <p className="truncate text-xs text-mute">{r.instagram_url}</p>
                    </div>
                    <button className={btnGhost} onClick={() => del('reels', r.id)}>
                      Borrar
                    </button>
                  </li>
                ))}
                {reels.length === 0 && <li className="px-4 py-3 text-sm text-mute">Sin reels aún.</li>}
              </ul>
            </section>
          </div>
        )}
      </div>
    </div>
  )
}
