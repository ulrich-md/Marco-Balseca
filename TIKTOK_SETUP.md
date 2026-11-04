# Importar los TikToks en automático

El sitio ya está listo: con las variables en Vercel, **Inicio** y **Videos**
muestran solos los últimos TikToks de Marco con su **portada real**. Sin ellas,
se usan los TikToks de `/admin` o los locales: nunca se rompe.

Funciones: `api/tiktok-videos.js` (lista, cache 30 min) y `api/tiktok-auth.js`
(autorización de una sola vez).

## 1. Crear la app en TikTok for Developers (una vez)
1. Entra a **developers.tiktok.com** con la cuenta de TikTok de Marco → **Manage apps → Connect an app**.
2. Agrega los productos **Login Kit** y **Display API**.
3. Scopes: `user.info.basic` y `video.list`.
4. En **Login Kit → Redirect URI** registra exactamente:
   `https://TU-DOMINIO/api/tiktok-auth`
5. Copia el **Client key** y el **Client secret**.

> **Sandbox vs. producción:** para que la app pase a producción, TikTok la revisa
> (unos días). Mientras tanto, en modo **Sandbox** agrega la cuenta de Marco como
> *Target user*. Como solo se leen sus propios videos, el Sandbox es suficiente.

## 2. Variables en Vercel (Settings → Environment Variables)
| Name                   | Value                                              |
| ---------------------- | -------------------------------------------------- |
| `TIKTOK_CLIENT_KEY`    | Client key                                         |
| `TIKTOK_CLIENT_SECRET` | Client secret                                      |
| `TIKTOK_SETUP_KEY`     | una contraseña que tú inventes (ej. `tehuacan-2026`) |

Haz **Redeploy**.

## 3. Autorizar la cuenta (una vez)
1. Con la sesión de TikTok de Marco abierta, entra a:
   `https://TU-DOMINIO/api/tiktok-auth?key=TU_TIKTOK_SETUP_KEY`
2. Autoriza. La página te mostrará el **refresh token**.
3. Agrégalo en Vercel como `TIKTOK_REFRESH_TOKEN` y haz **Redeploy**.
4. (Opcional) Borra `TIKTOK_SETUP_KEY` para desactivar la página de autorización.

## Comprobar
Abre `https://TU-DOMINIO/api/tiktok-videos`:
- `"configured": false` → faltan variables.
- `"error": "..."` → el refresh token venció o faltan permisos: repite el paso 3.
- Lista de `videos` → funcionando.

## Mantenimiento
El refresh token dura **365 días**. Pon un recordatorio para repetir el paso 3
una vez al año (toma un minuto).
