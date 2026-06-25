import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { Seo } from '../lib/Seo'
import {
  supabaseEnabled,
  sbSelect,
  sbInsert,
  sbUpdate,
  sbDelete,
  sbSignInWithGoogle,
  sbConsumeOAuthRedirect,
  sbIsAdmin,
  sbSignOut,
  sbEnsureSession,
  sbAuthEmail,
} from '../lib/supabase'
import { igEmbedSrc } from '../lib/instagram'
import { slugify } from '../data/acciones'

/* =========================================================================
   Panel oculto para que Marco edite Agenda, Reels y Acciones desde la web.
   - Ruta: /admin (no aparece en el menú).
   - SIN contraseña por ahora (como se pidió). No compartas el enlace.
   - Pestañas separadas para que sea muy fácil de usar.
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

create table if not exists acciones (
  id uuid primary key default gen_random_uuid(),
  slug text, categoria text, titulo text not null, resumen text, detalle text,
  imagen text, orden int default 0, created_at timestamptz default now());

-- Buzón de contacto. PRIVADO: el público solo puede ENVIAR (insert); leer y
-- gestionar requiere sesión de admin. Se ve en /admin -> Mensajes.
create table if not exists mensajes (
  id uuid primary key default gen_random_uuid(),
  nombre text not null, correo text, telefono text, lugar text,
  motivo text, mensaje text not null, leido boolean default false,
  created_at timestamptz default now());

alter table eventos  enable row level security;
alter table reels    enable row level security;
alter table acciones enable row level security;
alter table mensajes enable row level security;

-- Quién puede administrar el sitio (cuentas de Google que TÚ autorizas)
create table if not exists admins (email text primary key);
insert into admins (email) values ('solutions.umd@gmail.com') on conflict do nothing;
alter table admins enable row level security;

-- Función segura: ¿el usuario de la sesión está autorizado?
create or replace function public.is_admin() returns boolean
language sql security definer stable set search_path = public as $$
  select exists (select 1 from admins where email = auth.jwt() ->> 'email');
$$;
grant execute on function public.is_admin() to anon, authenticated;

-- Lectura pública del contenido del sitio
create policy "eventos read"  on eventos  for select using (true);
create policy "reels read"    on reels    for select using (true);
create policy "acciones read" on acciones for select using (true);

-- Escritura SOLO para cuentas autorizadas
create policy "eventos write"  on eventos  for all to authenticated using (is_admin()) with check (is_admin());
create policy "reels write"    on reels    for all to authenticated using (is_admin()) with check (is_admin());
create policy "acciones write" on acciones for all to authenticated using (is_admin()) with check (is_admin());

-- Mensajes: cualquiera ENVÍA; solo cuentas autorizadas leen y gestionan
create policy "mensajes insert" on mensajes for insert with check (true);
create policy "mensajes manage" on mensajes for all to authenticated using (is_admin()) with check (is_admin());`

// SQL solo para la tabla nueva (si Supabase ya estaba configurado antes).
const SQL_ACCIONES = `create table if not exists acciones (
  id uuid primary key default gen_random_uuid(),
  slug text, categoria text, titulo text not null, resumen text, detalle text,
  imagen text, orden int default 0, created_at timestamptz default now());
alter table acciones enable row level security;
create policy "acciones read"  on acciones for select using (true);
create policy "acciones write" on acciones for all using (true) with check (true);`

// SQL de migración para un proyecto que YA tenía Supabase (endurece el acceso
// y crea el buzón privado de mensajes). Se muestra en la pantalla de acceso.
const SQL_SECURE = `-- 1) Cuentas de Google autorizadas (TÚ decides quién entra)
create table if not exists admins (email text primary key);
insert into admins (email) values ('solutions.umd@gmail.com') on conflict do nothing;
alter table admins enable row level security;

-- 2) Función segura que valida al usuario de la sesión
create or replace function public.is_admin() returns boolean
language sql security definer stable set search_path = public as $$
  select exists (select 1 from admins where email = auth.jwt() ->> 'email');
$$;
grant execute on function public.is_admin() to anon, authenticated;

-- 3) Buzón privado de mensajes (si falta)
create table if not exists mensajes (
  id uuid primary key default gen_random_uuid(),
  nombre text not null, correo text, telefono text, lugar text,
  motivo text, mensaje text not null, leido boolean default false,
  created_at timestamptz default now());
alter table mensajes enable row level security;

-- 4) Editar el contenido: solo cuentas autorizadas
drop policy if exists "eventos write"  on eventos;
drop policy if exists "reels write"    on reels;
drop policy if exists "acciones write" on acciones;
create policy "eventos write"  on eventos  for all to authenticated using (is_admin()) with check (is_admin());
create policy "reels write"    on reels    for all to authenticated using (is_admin()) with check (is_admin());
create policy "acciones write" on acciones for all to authenticated using (is_admin()) with check (is_admin());

-- 5) Mensajes: cualquiera ENVÍA; solo cuentas autorizadas leen y gestionan
drop policy if exists "mensajes insert" on mensajes;
drop policy if exists "mensajes manage" on mensajes;
create policy "mensajes insert" on mensajes for insert with check (true);
create policy "mensajes manage" on mensajes for all to authenticated using (is_admin()) with check (is_admin());`

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
type AccionRow = {
  id: string
  slug: string | null
  categoria: string | null
  titulo: string
  resumen: string | null
  detalle: string | null
  imagen: string | null
  orden: number | null
}
type MensajeRow = {
  id: string
  nombre: string
  correo: string | null
  telefono: string | null
  lugar: string | null
  motivo: string | null
  mensaje: string
  leido: boolean | null
  created_at: string
}

const CATEGORIAS = ['Deporte', 'Educación', 'Comunidad', 'Economía local', 'Seguridad', 'Propuesta']

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
const EMPTY_AC = { categoria: 'Comunidad', titulo: '', resumen: '', detalle: '', imagen: '' }

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
const FlagIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M5 21V4m0 0c3-1.5 5 1.5 8 0s4-1.5 6 0v9c-2-1.5-3 .5-6 0s-5-1.5-8 0" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const InboxIcon = () => (
  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
    <path d="M4 13h4l2 3h4l2-3h4M4 13l2.5-7h11L20 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-5z" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
const GoogleGlyph = () => (
  <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden>
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35 24 35c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.3 5.1 29.4 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.4-.1-2.5-.4-3.5z" />
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.3 5.1 29.4 3 24 3 16 3 9.1 7.6 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 45c5.2 0 10-2 13.6-5.2l-6.3-5.3C29.2 35.9 26.7 37 24 37c-5.3 0-9.7-3.5-11.3-8.3l-6.5 5C9 41.3 16 45 24 45z" />
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4 5.5l6.3 5.3C41.6 36 45 30.6 45 24c0-1.4-.1-2.5-.4-3.5z" />
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

function fmtFechaHora(iso: string) {
  try {
    return new Intl.DateTimeFormat('es-MX', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date(iso))
  } catch {
    return iso
  }
}

export default function Admin() {
  const [tab, setTab] = useState<'agenda' | 'reels' | 'acciones' | 'mensajes'>('agenda')
  const [eventos, setEventos] = useState<EventoRow[]>([])
  const [reels, setReels] = useState<ReelRow[]>([])
  const [acciones, setAcciones] = useState<AccionRow[]>([])
  const [mensajes, setMensajes] = useState<MensajeRow[]>([])
  const [ev, setEv] = useState<Omit<EventoRow, 'id'> & { id?: string }>({ ...EMPTY_EV })
  const [reel, setReel] = useState({ titulo: '', instagram_url: '' })
  const [ac, setAc] = useState<typeof EMPTY_AC & { id?: string }>({ ...EMPTY_AC })
  const [msg, setMsg] = useState('')
  const [busy, setBusy] = useState(false)

  // Acceso con Google (autorizado por la lista de admins en Supabase)
  const [authed, setAuthed] = useState(false)
  const [checking, setChecking] = useState(true)
  const [denied, setDenied] = useState<string | null>(null)
  const [signinErr, setSigninErr] = useState('')

  const load = () => {
    if (!supabaseEnabled) return
    sbSelect<EventoRow>('eventos', 'select=*&order=fecha.asc').then(setEventos).catch(() => {})
    sbSelect<ReelRow>('reels', 'select=*&order=orden.asc,created_at.desc').then(setReels).catch(() => {})
    sbSelect<AccionRow>('acciones', 'select=*&order=orden.asc,created_at.desc').then(setAcciones).catch(() => {})
    sbSelect<MensajeRow>('mensajes', 'select=*&order=created_at.desc').then(setMensajes).catch(() => {})
  }

  useEffect(() => {
    let alive = true
    ;(async () => {
      const back = sbConsumeOAuthRedirect()
      if (back.error) setSigninErr(back.error)
      const ok = await sbEnsureSession()
      if (!alive) return
      if (!ok) {
        setChecking(false)
        return
      }
      const admin = await sbIsAdmin()
      if (!alive) return
      if (admin) {
        setAuthed(true)
        load()
      } else {
        setDenied(sbAuthEmail() || 'tu cuenta')
        await sbSignOut()
      }
      setChecking(false)
    })()
    return () => {
      alive = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const logout = async () => {
    await sbSignOut()
    setAuthed(false)
    setDenied(null)
  }

  const flash = (t: string) => {
    setMsg(t)
    window.setTimeout(() => setMsg(''), 3000)
  }
  const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

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

  const saveAccion = async (e: FormEvent) => {
    e.preventDefault()
    setBusy(true)
    try {
      const { id, ...rest } = ac
      const payload = { ...rest, slug: slugify(rest.titulo) }
      if (id) await sbUpdate('acciones', id, payload)
      else
        await sbInsert('acciones', {
          ...payload,
          orden: (acciones[acciones.length - 1]?.orden ?? acciones.length) + 1,
        })
      setAc({ ...EMPTY_AC })
      flash(id ? 'Cambios guardados ✓' : 'Acción agregada ✓')
      load()
    } catch (err) {
      flash('Error: ' + (err as Error).message)
    } finally {
      setBusy(false)
    }
  }

  const del = async (table: 'eventos' | 'reels' | 'acciones' | 'mensajes', id: string, what: string) => {
    if (!window.confirm(`¿Eliminar ${what}? No se puede deshacer.`)) return
    try {
      await sbDelete(table, id)
      flash('Eliminado ✓')
      load()
    } catch (err) {
      flash('Error: ' + (err as Error).message)
    }
  }

  const marcarLeido = async (id: string, leido: boolean) => {
    setMensajes((prev) => prev.map((m) => (m.id === id ? { ...m, leido } : m))) // optimista
    try {
      await sbUpdate('mensajes', id, { leido })
    } catch (err) {
      flash('Error: ' + (err as Error).message)
      load()
    }
  }

  const noLeidos = mensajes.filter((m) => !m.leido).length

  const tabBtn = (id: typeof tab, icon: ReactNode, txt: string, count: number) => (
    <button
      type="button"
      onClick={() => setTab(id)}
      className={`flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold transition-colors ${
        tab === id ? 'bg-accent text-white' : 'text-ink hover:bg-ink/5'
      }`}
    >
      {icon} {txt}
      <span className={`text-xs ${tab === id ? 'text-white/80' : 'text-mute'}`}>({count})</span>
    </button>
  )

  if (!supabaseEnabled) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bone px-4 py-10 text-ink">
        <Seo title="Panel de edición" path="/admin" description="Panel privado." noindex />
        <div className="w-full max-w-xl rounded-2xl border border-accent/30 bg-white p-7">
          <h1 className="font-display text-3xl text-ink">Panel de Marco</h1>
          <h2 className="font-condensed mt-4 text-xl font-semibold text-accent">Falta conectar Supabase</h2>
          <p className="mt-2 text-sm text-ink/80">
            Ejecuta este SQL en el SQL Editor de Supabase y agrega{' '}
            <code className="rounded bg-ink/5 px-1">VITE_SUPABASE_URL</code> y{' '}
            <code className="rounded bg-ink/5 px-1">VITE_SUPABASE_ANON_KEY</code> en Vercel.
          </p>
          <pre className="mt-4 max-h-72 overflow-auto rounded-lg bg-ink p-4 text-xs leading-relaxed text-bone">
            {SQL}
          </pre>
        </div>
      </div>
    )
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bone text-mute">
        <Seo title="Panel de edición" path="/admin" description="Panel privado." noindex />
        <p className="text-sm">Verificando acceso…</p>
      </div>
    )
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bone px-4 py-10 text-ink">
        <Seo title="Panel de edición" path="/admin" description="Panel privado." noindex />
        <div className="w-full max-w-sm">
          <div className="rounded-2xl border border-ink/12 bg-white p-8 text-center shadow-[0_18px_40px_-28px_rgba(0,0,0,0.45)]">
            <h1 className="font-display text-3xl text-ink">Panel de Marco</h1>
            <p className="mt-2 text-sm text-mute">
              Acceso restringido. Entra con una cuenta de Google autorizada.
            </p>

            {denied && (
              <p
                role="alert"
                className="mt-5 rounded-lg border border-accent/25 bg-accent/5 px-4 py-3 text-sm text-accent"
              >
                La cuenta <strong>{denied}</strong> no está autorizada. Pide acceso al administrador.
              </p>
            )}
            {signinErr && !denied && (
              <p
                role="alert"
                className="mt-5 rounded-lg border border-accent/25 bg-accent/5 px-4 py-3 text-sm text-accent"
              >
                {signinErr}
              </p>
            )}

            <button
              type="button"
              onClick={() => sbSignInWithGoogle()}
              className="mt-6 flex w-full items-center justify-center gap-3 rounded-lg border border-ink/20 bg-white px-5 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent hover:bg-ink/[0.03]"
            >
              <GoogleGlyph />
              {denied ? 'Probar con otra cuenta' : 'Entrar con Google'}
            </button>
          </div>

          <details className="mt-4 rounded-xl border border-ink/12 bg-white/70 p-4 text-sm text-ink/80">
            <summary className="cursor-pointer font-semibold text-ink">
              Configurar el acceso (una sola vez)
            </summary>
            <ol className="mt-3 list-decimal space-y-2 pl-5">
              <li>
                Activa Google en Supabase → <strong>Authentication → Providers → Google</strong> (pega
                el Client ID y Secret creados en Google Cloud).
              </li>
              <li>
                En Supabase → <strong>Authentication → URL Configuration</strong>, agrega la URL del
                sitio en <strong>Redirect URLs</strong> (p. ej.{' '}
                <code className="rounded bg-ink/5 px-1">https://tu-dominio/admin</code>).
              </li>
              <li>
                En Supabase → <strong>SQL Editor</strong>, corre este SQL una vez (crea la lista de
                cuentas autorizadas y el buzón de mensajes):
              </li>
            </ol>
            <pre className="mt-3 max-h-64 overflow-auto rounded-lg bg-ink p-3 text-[11px] leading-relaxed text-bone">
              {SQL_SECURE}
            </pre>
          </details>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bone px-4 py-10 text-ink md:px-8">
      <Seo title="Panel de edición" path="/admin" description="Panel privado de edición." noindex />
      <div className="mx-auto max-w-3xl">
        <div className="mb-2 flex items-center justify-end gap-3">
          {sbAuthEmail() && <span className="text-xs text-mute">{sbAuthEmail()}</span>}
          <button
            type="button"
            onClick={logout}
            className="eyebrow text-mute transition-colors hover:text-accent"
          >
            Salir
          </button>
        </div>
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
              Ejecuta este SQL en el SQL Editor de Supabase y agrega las variables{' '}
              <code className="rounded bg-ink/5 px-1">VITE_SUPABASE_URL</code> y{' '}
              <code className="rounded bg-ink/5 px-1">VITE_SUPABASE_ANON_KEY</code> en Vercel.
            </p>
            <pre className="mt-4 overflow-x-auto rounded-lg bg-ink p-4 text-xs leading-relaxed text-bone">
              {SQL}
            </pre>
          </div>
        ) : (
          <>
            <div className="mt-8 grid grid-cols-2 gap-2 rounded-xl border border-ink/12 bg-white p-1.5 sm:grid-cols-4">
              {tabBtn('agenda', <CalIcon />, 'Agenda', eventos.length)}
              {tabBtn('reels', <PlayIcon />, 'Reels', reels.length)}
              {tabBtn('acciones', <FlagIcon />, 'Acciones', acciones.length)}
              {tabBtn('mensajes', <InboxIcon />, 'Mensajes', mensajes.length)}
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
                    Aparecerá en la página <strong>Agenda</strong>, ordenado por fecha.
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
                              toTop()
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
                      Toca <strong>compartir</strong> (el avioncito) → <strong>Copiar enlace</strong>.
                    </li>
                    <li>Pega el enlace aquí y ponle un título.</li>
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

            {/* ============ ACCIONES ============ */}
            {tab === 'acciones' && (
              <div className="mt-6 space-y-6">
                <div className="rounded-xl border border-ink/12 bg-white p-6">
                  <h2 className="font-condensed text-xl font-semibold uppercase tracking-wide text-ink">
                    {ac.id ? 'Editar acción' : 'Agregar una acción o propuesta'}
                  </h2>
                  <p className="mt-1 text-sm text-mute">
                    Aparece en <strong>Inicio</strong> y en la página <strong>Acciones</strong>. El
                    botón "Conocer más" abre su página con el texto completo.
                  </p>
                  <form onSubmit={saveAccion} className="mt-5 grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className={label}>Título</label>
                      <input
                        required
                        className={input}
                        placeholder="Ej. Deporte que une a la colonia"
                        value={ac.titulo}
                        onChange={(e) => setAc({ ...ac, titulo: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className={label}>Categoría</label>
                      <select
                        className={input}
                        value={ac.categoria}
                        onChange={(e) => setAc({ ...ac, categoria: e.target.value })}
                      >
                        {CATEGORIAS.map((c) => (
                          <option key={c} value={c}>
                            {c}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className={label}>Imagen (opcional)</label>
                      <input
                        className={input}
                        placeholder="Enlace a una imagen (https://...)"
                        value={ac.imagen}
                        onChange={(e) => setAc({ ...ac, imagen: e.target.value })}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={label}>Resumen (lo que se ve en la tarjeta)</label>
                      <textarea
                        required
                        className={input}
                        rows={2}
                        placeholder="Una o dos frases que resuman la acción."
                        value={ac.resumen}
                        onChange={(e) => setAc({ ...ac, resumen: e.target.value })}
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className={label}>Texto completo (página "Conocer más")</label>
                      <textarea
                        className={input}
                        rows={5}
                        placeholder="Explica con calma de qué trata. Deja una línea en blanco para separar párrafos."
                        value={ac.detalle}
                        onChange={(e) => setAc({ ...ac, detalle: e.target.value })}
                      />
                    </div>
                    <div className="flex items-center gap-3 sm:col-span-2">
                      <button type="submit" className={btn} disabled={busy}>
                        {ac.id ? 'Guardar cambios' : 'Agregar acción'}
                      </button>
                      {ac.id && (
                        <button type="button" className={btnGhost} onClick={() => setAc({ ...EMPTY_AC })}>
                          Cancelar
                        </button>
                      )}
                    </div>
                  </form>
                </div>

                <div className="rounded-xl border border-ink/12 bg-white">
                  <p className="border-b border-ink/10 px-6 py-4 font-condensed text-lg font-semibold uppercase tracking-wide text-ink">
                    Acciones publicadas ({acciones.length})
                  </p>
                  <ul className="divide-y divide-ink/10">
                    {acciones.map((a) => (
                      <li key={a.id} className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-ink">{a.titulo}</p>
                          <p className="text-xs text-mute">{a.categoria}</p>
                        </div>
                        <div className="flex shrink-0 gap-2">
                          <button
                            className={btnGhost}
                            onClick={() => {
                              setAc({
                                id: a.id,
                                categoria: a.categoria ?? 'Comunidad',
                                titulo: a.titulo,
                                resumen: a.resumen ?? '',
                                detalle: a.detalle ?? '',
                                imagen: a.imagen ?? '',
                              })
                              toTop()
                            }}
                          >
                            Editar
                          </button>
                          <button className={btnDanger} onClick={() => del('acciones', a.id, 'esta acción')}>
                            Eliminar
                          </button>
                        </div>
                      </li>
                    ))}
                    {acciones.length === 0 && (
                      <li className="px-6 py-6 text-sm text-mute">
                        <p className="text-center">Aún no hay acciones en la base de datos.</p>
                        <p className="mt-3 text-xs">
                          Si es la primera vez, crea la tabla: pega este SQL en Supabase → SQL Editor:
                        </p>
                        <pre className="mt-2 overflow-x-auto rounded-lg bg-ink p-3 text-[11px] leading-relaxed text-bone">
                          {SQL_ACCIONES}
                        </pre>
                      </li>
                    )}
                  </ul>
                </div>
              </div>
            )}

            {/* ============ MENSAJES ============ */}
            {tab === 'mensajes' && (
              <div className="mt-6 space-y-4">
                <div className="rounded-xl border border-ink/12 bg-white">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-ink/10 px-6 py-4">
                    <p className="font-condensed text-lg font-semibold uppercase tracking-wide text-ink">
                      Mensajes recibidos ({mensajes.length})
                    </p>
                    {noLeidos > 0 && (
                      <span className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">
                        {noLeidos} sin leer
                      </span>
                    )}
                  </div>
                  <ul className="divide-y divide-ink/10">
                    {mensajes.map((m) => (
                      <li key={m.id} className={`px-6 py-5 ${m.leido ? '' : 'bg-accent/[0.04]'}`}>
                        <div className="min-w-0">
                          <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-ink">
                            {!m.leido && (
                              <span className="h-2 w-2 shrink-0 rounded-full bg-accent" aria-label="nuevo" />
                            )}
                            {m.nombre}
                            {m.motivo && (
                              <span className="rounded-full bg-ink/5 px-2 py-0.5 text-xs font-medium text-mute">
                                {m.motivo}
                              </span>
                            )}
                          </p>
                          <p className="mt-0.5 text-xs text-mute">
                            {fmtFechaHora(m.created_at)}
                            {m.lugar ? ` · ${m.lugar}` : ''}
                          </p>
                        </div>
                        <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-ink/90">{m.mensaje}</p>
                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          {m.correo && (
                            <a
                              className={btnGhost}
                              href={`mailto:${m.correo}?subject=${encodeURIComponent('Re: tu mensaje a Marco Balseca')}`}
                            >
                              Responder por correo
                            </a>
                          )}
                          {m.telefono && (
                            <a className={btnGhost} href={`tel:${m.telefono.replace(/\s/g, '')}`}>
                              {m.telefono}
                            </a>
                          )}
                          <button className={btnGhost} onClick={() => marcarLeido(m.id, !m.leido)}>
                            {m.leido ? 'Marcar como no leído' : 'Marcar como leído'}
                          </button>
                          <button className={btnDanger} onClick={() => del('mensajes', m.id, 'este mensaje')}>
                            Eliminar
                          </button>
                        </div>
                      </li>
                    ))}
                    {mensajes.length === 0 && (
                      <li className="px-6 py-8 text-center text-sm text-mute">
                        Aún no hay mensajes. Cuando alguien escriba desde la página de{' '}
                        <strong>Contacto</strong>, aparecerá aquí.
                      </li>
                    )}
                  </ul>
                </div>
                <p className="px-1 text-xs text-mute">
                  Los mensajes son privados: solo se ven aquí, con tu sesión iniciada.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
