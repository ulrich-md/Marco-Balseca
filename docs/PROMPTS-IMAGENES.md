# Prompts de imágenes: assets generados

El sitio ya tiene **ranuras listas** para estas imágenes. Si un archivo todavía no
existe, la ranura se oculta sola y se ve el fondo de marca (guinda/dorado + greca),
así que nunca aparece una imagen rota. Basta con guardar cada archivo con el
**nombre y la ruta exactos** de abajo y se activa sin tocar código.

> **Reglas para todas las imágenes**
> - **Nunca generes a Marco ni a personas reales.** Sus fotos son reales y así se
>   quedan. Lo generado son lugares, paisajes, texturas e ilustraciones.
> - Nada de marcas, logotipos ni texto dentro de la imagen (los modelos inventan letras).
> - Paleta de marca: guinda `#711924`, guinda oscuro `#5E1922`, dorado `#A57F2C`,
>   dorado claro `#E6D194`, crema `#F8F1E4`.
> - Los prompts van en inglés porque los modelos (Midjourney, Flux, Ideogram, GPT‑Image,
>   Higgsfield) responden mejor así. El *negative prompt* va aparte cuando la
>   herramienta lo permite.
> - Exporta en **WebP calidad 80–85** (ver conversión al final).

---

## 1. Fondo del arco del Hero ✅ conectado

| | |
|---|---|
| **Archivo** | `public/assets/generated/hero-valle-tehuacan.webp` |
| **Dónde se ve** | Dentro del arco guinda del Hero, detrás del recorte de Marco |
| **Formato** | Vertical **4:5**, 1200×1500 px |
| **Tratamiento en el sitio** | 45 % de opacidad, `mix-blend-luminosity` sobre el guinda: solo se aprovechan sus luces y sombras. Debe ser **suave y con poco detalle al centro** (ahí va el rostro). |

**Prompt**
```
Vertical 4:5 landscape photograph of the Tehuacán Valley in Puebla, Mexico at golden
hour: endless forests of tall columnar cacti (Cephalocereus / "cardones") on soft
rolling hills, the Sierra Madre Oriental fading into warm haze in the distance, low
sun behind the mountains creating gentle rim light. Calm, hopeful, dignified mood.
Large area of soft, out-of-focus sky in the upper-middle of the frame, subject matter
concentrated in the lower third. Shallow depth of field, cinematic, fine film grain,
warm muted palette of burgundy, ochre and cream. Shot on medium format, 50mm.
```
**Negative**
```
people, faces, text, letters, logos, buildings in foreground, cars, power lines,
oversaturated, HDR, harsh contrast, cartoon, illustration
```

---

## 2. Fondo del arco del CTA "Vamos juntos" ✅ conectado

| | |
|---|---|
| **Archivo** | `public/assets/generated/cta-atardecer-tehuacan.webp` |
| **Dónde se ve** | Dentro del arco dorado del cierre ("Vamos juntos") en todas las páginas, detrás de Marco con el chaleco guinda |
| **Formato** | Vertical **4:5**, 1200×1500 px |
| **Tratamiento en el sitio** | 45 % de opacidad + luminosidad sobre dorado: tiene que ser **muy luminosa y clara**, casi en clave alta |

**Prompt**
```
Vertical 4:5 high-key photograph of a colonial portico in Tehuacán, Puebla, Mexico:
a row of soft cream stone arches with warm late-afternoon sunlight pouring through,
long gentle shadows on a terracotta floor, pale golden haze, dust particles in the
light. Very bright and airy, low contrast, lots of soft empty space in the center.
Warm palette of cream, pale gold and sand. Architectural photography, 35mm,
shallow depth of field, subtle film grain.
```
**Negative**
```
people, text, signage, logos, dark shadows, night, neon, modern buildings, cars,
oversaturated, cartoon
```

---

## 3. Ilustración lineal del valle (cita "La fuerza de Tehuacán…") ✅ conectado

| | |
|---|---|
| **Archivo** | `public/assets/generated/valle-tehuacan-lineal.webp` (o `.png` con fondo blanco) |
| **Dónde se ve** | Al pie de la sección de la cita, como un horizonte dibujado |
| **Formato** | Panorámico **4:1**, 2400×600 px, **fondo blanco puro** |
| **Tratamiento en el sitio** | `mix-blend-multiply` al 50 %: el blanco desaparece y solo queda la línea. Por eso el fondo **tiene que ser blanco liso**. |

**Prompt**
```
Minimal single-line ink illustration of the Tehuacán Valley skyline in Puebla, Mexico,
panoramic 4:1: gentle mountain ridges, a few tall columnar cacti, the silhouette of a
colonial church dome and bell tower, small houses, all drawn with one continuous thin
line in deep burgundy (#711924) with a few accents in muted gold (#A57F2C). Elegant,
sparse, lots of negative space, editorial style. Pure flat white background, no
shading, no fill, no texture.
```
**Negative**
```
color fills, gradients, shading, background texture, people, text, letters, logos,
heavy strokes, 3D
```

---

## 4. Portadas para los Reels (opcional, alta prioridad de UX)

Hoy las tarjetas de video usan fotos reales de eventos como portada (el iframe de
Instagram solo carga al tocar play). **Lo ideal es la portada real de cada reel:**
toma una captura de un cuadro del video (9:16, unos 720×1280 px) y guárdala como
`public/assets/reels/<id>.webp`, donde `<id>` es el `id` del reel en
`src/data/reels.ts` (ej. `reel-1.webp`). El sitio la toma sola. **No uses IA aquí:**
las portadas tienen que mostrar lo que de verdad pasa en el video.

---

## 5. Imagen para compartir (Open Graph) ✅ ya creada

`public/og-image.jpg` (1200×630). La armé con los assets reales (recorte de Marco,
arco guinda, greca y las fuentes de marca) y ya está conectada en `index.html` y en
`Seo.tsx`. Sustituye al `og-image.svg`, que Facebook y WhatsApp no muestran.
Si quieres una versión con foto de fondo, usa el prompt 1 en formato **1.91:1**
(1200×630) y te la recompongo.

---

## Conversión a WebP

```bash
# Requiere: sudo apt install webp   (o brew install webp)
cwebp -q 82 -resize 1200 0 hero-valle-tehuacan.png -o public/assets/generated/hero-valle-tehuacan.webp
cwebp -q 82 -resize 1200 0 cta-atardecer-tehuacan.png -o public/assets/generated/cta-atardecer-tehuacan.webp
cwebp -q 85 -resize 2400 0 valle-tehuacan-lineal.png -o public/assets/generated/valle-tehuacan-lineal.webp
```

Peso objetivo: **menos de 180 KB** por imagen de arco y **menos de 120 KB** para la
ilustración lineal.
