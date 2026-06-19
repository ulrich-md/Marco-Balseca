# 📸 Fotos reales — `public/assets/`

Las fotos ya están **conectadas** al sitio. Todo lo que está en `public/` se
publica con la misma ruta: `public/assets/portraits/marco-hero.png` →
`/assets/portraits/marco-hero.png`.

> **Fotos a COLOR.** El layout es editorial (blanco/negro/rojo), pero las fotos
> van a todo color para que el sitio se sienta vivo y cercano. Los cutouts
> claros (camisas claras) llevan sombra/halo para separarse del fondo.

> **Sin imágenes rotas:** cada `<img>` tiene un fallback. Si un archivo falta,
> se oculta la imagen y queda el bloque de color (gris/negro). Nunca aparece el
> ícono de imagen rota.

## Optimización aplicada
Las subidas originales pesaban ~22 MB (PNG 2–3 MB c/u). Se redimensionaron y
convirtieron (fotos opacas → JPEG q82; recortes transparentes → PNG con alfa).
Total actual: **~4.7 MB**. Todas las `<img>` usan `loading="lazy"` y
`decoding="async"`.

## Dónde está conectada cada foto
| Archivo | Lugar en el sitio |
|---|---|
| `portraits/marco-hero.png` | Hero (caja derecha) · sombra + parallax |
| `portraits/marco-formal.jpg` | Conóceme — retrato principal |
| `portraits/marco-corazon-fondo.jpg` | Conóceme — frase ancla (apoyo) |
| `portraits/marco-sumate.png` | CTA final "Vamos juntos" |
| `portraits/marco-fuerza.png` | Contacto — acento junto al título |
| `portraits/marco-corazon.png` | Contacto — columna lateral |
| `comunidad/comunidad-*.jpg` | Home — sección Comunidad (masonry, sin recortar) |
| `acciones/accion-*.jpg` | Acciones — 4 tarjetas (Deporte/Educación/Comunidad) |
| `social/social-purotehuacan.jpg` | Home — franja "Momentos · #PuroTehuacán" |

Reels: **pendientes** (placeholders), a la espera de miniaturas + links de
@marcobalseca1 (`src/data/reels.ts`).

## Fondos — decisiones de diseñador (por qué cada caso)
- **`backgrounds/bg-guinda-arco.jpg` → NO se usa.** Reintroduce el guinda y
  rompe el sistema B&N + rojo que definimos. Se conserva el archivo por si se
  quiere una variante "guinda" en el futuro.
- **`backgrounds/bg-claro.jpg` → NO se usa** como fondo de sección. Una textura
  fotográfica compite con el blanco limpio (Swiss) y baja la legibilidad del
  texto. La legibilidad manda.
- **`backgrounds/pattern-nahuatl.png` → SÍ, muy sutil.** Solo en el CTA final, al
  **7%** y en grayscale (`mix-blend-luminosity`), como textura cultural que no
  compite con el texto. Limitado a una sola carga por peso (≈400 KB).
- **`backgrounds/grain.png` → SÍ (4 KB).** Grano de película al **5%** en el CTA,
  el footer y la franja social, para dar un acabado editorial impreso.

## Para cambiar/añadir fotos después
- Sube el archivo a la subcarpeta y, si es nuevo, pon su ruta en los datos
  (`src/data/site.ts` para comunidad, `src/data/acciones.ts` para acciones) o en
  el componente (Hero/Conóceme/CTA/Contacto).
- Recomendado: `.jpg`/`.webp`, ~1400–1800 px del lado largo, comprimidas.
- Fotos de personas: **solo con su consentimiento**.
