# Prompts de imágenes: assets generados

Cada imagen tiene una **ranura lista** en el sitio. Si el archivo no existe, la
ranura se oculta sola y queda el diseño de marca, así que nunca aparece una imagen
rota. Guarda cada archivo con el **nombre y la ruta exactos** y se activa solo.

> **Reglas para todas**
> - **No generes a Marco ni a personas reales.** Lo generado son lugares, texturas e
>   ilustraciones; las fotos de Marco y de la gente son reales.
> - Sin texto, letreros ni logotipos dentro de la imagen.
> - Paleta: blanco dominante, guinda `#711924` como único color de peso y dorado
>   institucional `#A57F2C` / `#E6D194` solo como acento.
> - Exporta en **WebP calidad 80–85** (ver conversión al final).

| # | Archivo | Dónde se ve | Formato |
|---|---|---|---|
| 1 | `public/assets/generated/testimonios/t1.webp` | Tarjeta de Doña Rosa (Mercado La Purísima) | 16:10, 1200×750 |
| 2 | `public/assets/generated/testimonios/t2.webp` | Tarjeta de Luis (cancha, Col. San Diego Chalma) | 16:10, 1200×750 |
| 3 | `public/assets/generated/testimonios/t3.webp` | Tarjeta de Mari (calle de la escuela, San Pablo Tepetzingo) | 16:10, 1200×750 |
| 4 | `public/assets/generated/testimonios/t4.webp` | Tarjeta de Don Chucho (Centro de Tehuacán) | 16:10, 1200×750 |
| 5 | `public/assets/generated/cta-atardecer-tehuacan.webp` | Arco blanco del cierre "Vamos juntos" | 4:5, 1200×1500 |
| 6 | `public/assets/generated/valle-tehuacan-lineal.webp` | Horizonte dibujado bajo la cita | 4:1, 2400×600, fondo blanco |

Los prompts completos (en inglés, que es como mejor responden los modelos) están en
el historial del chat donde se entregaron. Resumen de intención por ranura:

1. a 4. **Lugares de cada testimonio**, sin personas, luz cálida de tarde, el motivo en
   el tercio inferior (la parte de arriba se funde en blanco en la tarjeta).
5. **Portal colonial en clave alta**, muy luminoso (se mezcla por luminosidad con el arco blanco).
6. **Ilustración de una sola línea** del valle en guinda sobre blanco puro.

**Portadas de Reels:** no uses IA. Guarda un cuadro real del video (9:16, ~720×1280)
como `public/assets/reels/<id>.webp` (ej. `reel-1.webp`, el `id` está en
`src/data/reels.ts`).

## Conversión a WebP

```bash
cwebp -q 82 -resize 1200 0 t1.png -o public/assets/generated/testimonios/t1.webp
cwebp -q 82 -resize 1200 0 cta-atardecer-tehuacan.png -o public/assets/generated/cta-atardecer-tehuacan.webp
cwebp -q 85 -resize 2400 0 valle-tehuacan-lineal.png -o public/assets/generated/valle-tehuacan-lineal.webp
```
