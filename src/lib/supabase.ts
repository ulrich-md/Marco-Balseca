/* =========================================================================
   Cliente mínimo de Supabase vía su API REST (PostgREST) con fetch — SIN SDK.
   Se activa solo si defines las variables de entorno (en Vercel y/o .env):
     VITE_SUPABASE_URL=https://xxxx.supabase.co
     VITE_SUPABASE_ANON_KEY=eyJ...
   Si no están, supabaseEnabled = false y el sitio usa los datos locales.
   ========================================================================= */

const env = import.meta.env as Record<string, string | undefined>
const SB_URL = env.VITE_SUPABASE_URL
const SB_KEY = env.VITE_SUPABASE_ANON_KEY

export const supabaseEnabled = Boolean(SB_URL && SB_KEY)

function headers(extra: Record<string, string> = {}) {
  return {
    apikey: SB_KEY ?? '',
    Authorization: `Bearer ${SB_KEY ?? ''}`,
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
