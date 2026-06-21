# (Opcional) Mostrar las 4 publicaciones de Facebook por separado

El sitio **ya muestra** las publicaciones recientes de Facebook con el muro
embebido (se actualiza solo, sin configurar nada).

Si quieres verlas como **4 publicaciones individuales** (más control), hay que
conectar la **API de Facebook**. Es un poco técnico; si no lo necesitas, puedes
ignorar esto: el muro en vivo funciona igual.

---

## Lo que necesitas obtener

Dos datos, que pondrás como variables de entorno en Vercel:

- `FB_PAGE_ID` — el ID numérico de la página **facebook.com/balseca**
- `FB_PAGE_TOKEN` — un **token de acceso de página** de larga duración

---

## Pasos

1. Entra a **https://developers.facebook.com** con la cuenta que administra la
   página → **My Apps** → **Create App** → tipo **Business** → ponle un nombre.
2. En el panel de la app, agrega el producto **Facebook Login** (o ve directo a
   **Tools → Graph API Explorer**).
3. En **Graph API Explorer**:
   - Selecciona tu app arriba a la derecha.
   - En **User or Page**, elige **Get Page Access Token** y autoriza tu página.
   - Marca permisos: `pages_read_engagement` y `pages_read_user_content`.
   - Copia el **token** que aparece (este es de corta duración).
4. Convierte el token a **larga duración** (dura ~60 días o permanente):
   - En el Explorer, junto al token, pulsa el ícono **ⓘ** → **Open in Access
     Token Tool** → **Extend Access Token**. Copia el token extendido.
   - (Para un token de página que no caduca, extiende primero el de usuario y
     luego vuelve a pedir el de página con ese token de usuario de larga vida.)
5. Obtén el **ID de la página**: en Graph API Explorer consulta `me?fields=id,name`
   con el token de página, o míralo en tu página → **Información**.
6. En **Vercel → tu proyecto → Settings → Environment Variables**, agrega:

   | Name            | Value                       |
   | --------------- | --------------------------- |
   | `FB_PAGE_ID`    | *(el ID numérico)*          |
   | `FB_PAGE_TOKEN` | *(el token de larga vida)*  |

7. **Redeploy** el proyecto en Vercel.

Listo: la sección "Publicaciones recientes" mostrará automáticamente los 4
últimos posts por separado. Si el token caduca, el sitio regresa solo al muro
embebido (no se rompe).

> Nota: los tokens de página pueden caducar. Si en el futuro deja de mostrar los
> 4 posts, regenera el token con los pasos 3–4 y actualiza `FB_PAGE_TOKEN`.
