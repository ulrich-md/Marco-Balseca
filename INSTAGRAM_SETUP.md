# Importar los Reels de Instagram en automático

El sitio ya está listo: en cuanto haya un token en Vercel, **Inicio** y **Videos**
muestran solos los últimos reels de @marcobalseca1 con su **portada real**, sin
cargarlos a mano. Sin token, se siguen usando los reels de `/admin` o los locales.
Los TikToks también se importan solos: ver `TIKTOK_SETUP.md`.

La función está en `api/ig-reels.js` (cache de 30 min en Vercel).

## Requisitos
1. La cuenta **@marcobalseca1** debe ser **profesional** (Creador o Empresa).
   En la app: Configuración → Tipo de cuenta y herramientas.
2. Vincúlala a la página de Facebook **facebook.com/balseca** (Centro de cuentas).

## Opción A (recomendada): con la misma app de Meta de Facebook
Es la que no caduca. Usa la app que ya describe `FACEBOOK_SETUP.md`.

1. En **developers.facebook.com → Graph API Explorer**, con tu app seleccionada:
   - Pide un **token de usuario** con permisos `instagram_basic`,
     `pages_show_list` y `pages_read_engagement`.
   - Extiéndelo a **larga duración** (ícono ⓘ → *Open in Access Token Tool* →
     *Extend Access Token*).
2. Con ese token de usuario consulta `me/accounts` y copia el `access_token` de la
   página **balseca** (ese token de página no caduca).
3. Consulta `{id-de-la-página}?fields=instagram_business_account` y copia el `id`.
   Ese es el **IG_USER_ID**.
4. En **Vercel → Settings → Environment Variables** agrega:

   | Name         | Value                                  |
   | ------------ | -------------------------------------- |
   | `IG_TOKEN`   | token de página del paso 2             |
   | `IG_USER_ID` | id de `instagram_business_account`     |

5. **Redeploy**.

## Opción B: Instagram Login (sin página de Facebook)
1. En tu app de Meta agrega el producto **Instagram → API setup with Instagram login**.
2. Genera el token de la cuenta @marcobalseca1 (permiso `instagram_business_basic`).
3. En Vercel agrega solo `IG_TOKEN` (sin `IG_USER_ID`) y redeploy.
4. Ese token dura ~60 días. Renuévalo antes de que venza con:
   `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=TOKEN`

## Comprobar
Abre `https://TU-DOMINIO/api/ig-reels`:
- `"configured": false` → falta `IG_TOKEN`.
- `"error": "..."` → el token expiró o le faltan permisos.
- Lista de `reels` → funcionando.
