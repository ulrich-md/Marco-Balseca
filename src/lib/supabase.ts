/* =========================================================================
   Cliente mínimo de Supabase vía su API REST (PostgREST) con fetch — SIN SDK.
   Las credenciales se inyectan en build desde CUALQUIERA de estos nombres
   (ver vite.config.ts): VITE_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_URL /
   SUPABASE_URL (y sus equivalentes ANON_KEY). Así funciona tanto si las pones
   manualmente como si vienen de la integración de Supabase en Vercel.
   Si no hay credenciales, supabaseEnabled = false y el sitio usa datos locales.
   ========================================================================= */

declare const __SB_URL__: string
declare const __SB_KEY__: string

const env = import.meta.env as Record<string, string | undefined>
const SB_URL = __SB_URL__ || env.VITE_SUPABASE_URL || ''
const SB_KEY = __SB_KEY__ || env.VITE_SUPABASE_ANON_KEY || ''

export const supabaseEnabled = Boolean(SB_URL && SB_KEY)

/* -------------------------------------------------------------------------
   Sesión de administrador (Supabase Auth vía REST / GoTrue).
   Los tokens se guardan en localStorage. Las llamadas a datos usan el
   access_token del admin cuando hay sesión; si no, la anon key pública.
   Así las políticas RLS pueden exigir sesión para leer datos privados
   (p. ej. los mensajes de contacto) y para editar contenido.
   ------------------------------------------------------------------------- */
type Session = { access_token: string; refresh_token: string; expires_at: number; email?: string }
const SESSION_KEY = 'mb_sb_session'

function loadSession(): Session | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const s = JSON.parse(raw) as Session
    return s && s.access_token ? s : null
  } catch {
    return null
  }
}
let session: Session | null = loadSession()
function saveSession(s: Session | null) {
  session = s
  try {
    if (s) localStorage.setItem(SESSION_KEY, JSON.stringify(s))
    else localStorage.removeItem(SESSION_KEY)
  } catch {
    /* almacenamiento no disponible */
  }
}
const nowS = () => Math.floor(Date.now() / 1000)

export function sbAuthEmail(): string | null {
  return session?.email ?? null
}
export function sbHasSession(): boolean {
  return Boolean(session && session.expires_at > nowS() + 5)
}

function headers(extra: Record<string, string> = {}) {
  return {
    apikey: SB_KEY ?? '',
    Authorization: `Bearer ${session?.access_token || SB_KEY || ''}`,
    'Content-Type': 'application/json',
    ...extra,
  }
}

export async function sbSelect<T>(table: string, query = 'select=*'): Promise<T[]> {
  if (!supabaseEnabled) return []
  const res = await fetch(`${SB_URL}/rest/v1/${table}?${query}`, { headers: headers() })
  if (!res.ok) throw new Error(`Supabase ${res.status}`)
  return (await res.json()) as T[]
}

export async function sbInsert<T>(table: string, row: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${SB_URL}/rest/v1/${table}`, {
    method: 'POST',
    headers: headers({ Prefer: 'return=representation' }),
    body: JSON.stringify(row),
  })
  if (!res.ok) throw new Error(await res.text())
  const data = (await res.json()) as T[]
  return data[0]
}

export async function sbUpdate<T>(table: string, id: string, patch: Record<string, unknown>): Promise<T> {
  const res = await fetch(`${SB_URL}/rest/v1/${table}?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: headers({ Prefer: 'return=representation' }),
    body: JSON.stringify(patch),
  })
  if (!res.ok) throw new Error(await res.text())
  const data = (await res.json()) as T[]
  return data[0]
}

export async function sbDelete(table: string, id: string): Promise<void> {
  const res = await fetch(`${SB_URL}/rest/v1/${table}?id=eq.${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: headers(),
  })
  if (!res.ok) throw new Error(await res.text())
}

/* ---- Autenticación (GoTrue REST) ---------------------------------------- */
type TokenResp = {
  access_token: string
  refresh_token: string
  expires_in?: number
  user?: { email?: string }
}
function authHeaders() {
  return { apikey: SB_KEY ?? '', 'Content-Type': 'application/json' }
}
/** Saca el email del payload de un JWT (el access_token de Supabase lo incluye). */
function emailFromJwt(token: string): string | undefined {
  try {
    const b64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')
    const pad = b64.length % 4 ? b64 + '='.repeat(4 - (b64.length % 4)) : b64
    const data = JSON.parse(atob(pad)) as { email?: string }
    return data.email
  } catch {
    return undefined
  }
}
function persist(d: TokenResp, fallbackEmail?: string) {
  saveSession({
    access_token: d.access_token,
    refresh_token: d.refresh_token,
    expires_at: nowS() + (d.expires_in ?? 3600),
    email: d.user?.email ?? emailFromJwt(d.access_token) ?? fallbackEmail,
  })
}

/** Redirige a Google para iniciar sesión (vía Supabase como broker OAuth). */
export function sbSignInWithGoogle(redirectPath = '/admin') {
  const redirectTo = `${window.location.origin}${redirectPath}`
  window.location.href =
    `${SB_URL}/auth/v1/authorize?provider=google&redirect_to=${encodeURIComponent(redirectTo)}`
}

/** Al volver de Google, lee los tokens del fragmento (#) de la URL y los guarda.
    Devuelve si quedó una sesión y, en su caso, un mensaje de error legible. */
export function sbConsumeOAuthRedirect(): { ok: boolean; error?: string } {
  if (typeof window === 'undefined') return { ok: false }
  const hash = window.location.hash || ''
  const clean = () => history.replaceState(null, '', window.location.pathname + window.location.search)
  if (hash.includes('error')) {
    const p = new URLSearchParams(hash.slice(1))
    clean()
    return { ok: false, error: p.get('error_description') || p.get('error') || 'No se pudo iniciar sesión con Google.' }
  }
  if (!hash.includes('access_token=')) return { ok: false }
  const p = new URLSearchParams(hash.slice(1))
  const access_token = p.get('access_token')
  if (!access_token) return { ok: false }
  persist({
    access_token,
    refresh_token: p.get('refresh_token') ?? '',
    expires_in: Number(p.get('expires_in') ?? '3600'),
  })
  clean()
  return { ok: true }
}

/** Pregunta al servidor si el usuario actual está en la lista de admins. */
export async function sbIsAdmin(): Promise<boolean> {
  if (!sbHasSession()) return false
  try {
    const res = await fetch(`${SB_URL}/rest/v1/rpc/is_admin`, {
      method: 'POST',
      headers: headers(),
      body: '{}',
    })
    if (!res.ok) return false
    return (await res.json()) === true
  } catch {
    return false
  }
}

/** Renueva el access_token con el refresh_token. Devuelve false si ya no es válido. */
export async function sbRefresh(): Promise<boolean> {
  if (!session?.refresh_token) return false
  try {
    const res = await fetch(`${SB_URL}/auth/v1/token?grant_type=refresh_token`, {
      method: 'POST',
      headers: authHeaders(),
      body: JSON.stringify({ refresh_token: session.refresh_token }),
    })
    if (!res.ok) {
      saveSession(null)
      return false
    }
    persist((await res.json()) as TokenResp, session.email)
    return true
  } catch {
    return false
  }
}

/** Garantiza una sesión válida (refresca si está por expirar). */
export async function sbEnsureSession(): Promise<boolean> {
  if (!session) return false
  if (session.expires_at > nowS() + 30) return true
  return sbRefresh()
}

/** Cierra la sesión (revoca en el servidor y limpia el almacenamiento). */
export async function sbSignOut(): Promise<void> {
  try {
    if (session) {
      await fetch(`${SB_URL}/auth/v1/logout`, {
        method: 'POST',
        headers: { ...authHeaders(), Authorization: `Bearer ${session.access_token}` },
      })
    }
  } catch {
    /* ignore */
  }
  saveSession(null)
}
