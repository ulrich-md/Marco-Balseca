# Conectar Supabase (para que Marco edite la Agenda y los Reels desde `/admin`)

Esto se hace **una sola vez** y es gratis. Sigue los pasos en orden. No necesitas
saber programar.

---

## Paso 1 — Crear la cuenta y el proyecto

1. Entra a **https://supabase.com** y pulsa **Start your project** → inicia sesión
   con tu cuenta de GitHub o tu correo.
2. Pulsa **New project**.
   - **Name:** `marco-balseca` (o el que quieras).
   - **Database Password:** inventa una y **guárdala** (no la necesitarás a diario).
   - **Region:** elige una cercana (ej. *East US* o *Mexico/South America* si aparece).
3. Pulsa **Create new project** y espera 1–2 minutos a que se prepare.

---

## Paso 2 — Crear las tablas (copiar y pegar)

1. En el menú izquierdo abre **SQL Editor** → **New query**.
2. Pega **tal cual** este bloque y pulsa **Run** (abajo a la derecha):

```sql
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
create policy "eventos read"  on eventos for select using (true);
create policy "eventos write" on eventos for all using (true) with check (true);
create policy "reels read"    on reels   for select using (true);
create policy "reels write"   on reels   for all using (true) with check (true);
```

Debe decir **Success. No rows returned**. Listo: ya existen las tablas.

---

## Paso 3 — Copiar tus 2 llaves

1. En el menú izquierdo abre **Project Settings** (el engranaje) → **API**.
2. Verás dos datos que vas a copiar en el siguiente paso:
   - **Project URL** → algo como `https://abcdefgh.supabase.co`
   - **Project API keys → `anon` `public`** → un texto largo que empieza con `eyJ...`

> ⚠️ Usa solo la llave **anon / public**. **Nunca** compartas la `service_role`.

---

## Paso 4 — Pegar las llaves en Vercel

1. Entra a **vercel.com** → abre el proyecto **marco-balseca**.
2. **Settings** → **Environment Variables**.
3. Agrega estas **dos** (botón **Add**), una por una:

   | Name (Key)                 | Value                                  |
   | -------------------------- | -------------------------------------- |
   | `VITE_SUPABASE_URL`        | *(pega tu Project URL)*                |
   | `VITE_SUPABASE_ANON_KEY`   | *(pega tu llave anon public `eyJ...`)* |

   Deja marcados los entornos (Production, Preview, Development) y **Save**.
4. Ve a la pestaña **Deployments** → en el último, menú **⋯** → **Redeploy**
   (así toma las nuevas variables).

---

## Paso 5 — ¡Listo! Entrar al panel

1. Abre **tudominio.com/admin** (ej. `https://marco-balseca.vercel.app/admin`).
2. Si todo quedó bien, verás el panel con **Agenda** y **Reels**.
   - **Agenda:** llena fecha, título, lugar, etc. y pulsa **Agregar evento**.
   - **Reels:** pega el enlace del reel de Instagram y pulsa **Agregar**.
3. Los cambios aparecen solos en el sitio (recarga la página pública).

Si en vez del panel ves *"Falta conectar Supabase"*, revisa que las dos variables
estén bien escritas en Vercel y que hayas hecho **Redeploy**.

---

## (Opcional, recomendado) Para desarrollo local

Crea un archivo `.env` en la raíz del proyecto con:

```
VITE_SUPABASE_URL=https://TU-PROYECTO.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
```

(No subas `.env` a GitHub; ya está cubierto por buenas prácticas.)

---

## Seguridad — léelo

Por ahora el panel `/admin` **no pide contraseña**: cualquiera con el enlace puede
editar. Para producción conviene **agregar un login** (Supabase Auth o una
contraseña) y restringir las políticas de escritura. Cuando quieras, se hace.
