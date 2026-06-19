# 📸 Fotos reales — `public/assets/`

Sube aquí las **fotos reales** de Marco y de la comunidad. Todo lo que esté en
`public/` se publica en la web con la misma ruta: un archivo en
`public/assets/retrato/marco-hero.jpg` queda disponible en **`/assets/retrato/marco-hero.jpg`**.

> El diseño es **blanco y negro**: las fotos se muestran en escala de grises
> automáticamente (`grayscale`). No tienes que editarlas a B&N — el sitio lo hace.
> Si alguna la quieres a color, avísame y te digo qué `prop` quitar.

## Cómo subir desde GitHub (sin terminal)
1. Entra a la carpeta (p. ej. `public/assets/retrato`).
2. Botón **Add file → Upload files**.
3. Arrastra la(s) foto(s) y haz **Commit changes**.

## Recomendaciones de archivo
- Formato: **.jpg** (fotos) o **.webp** (más ligero). PNG solo si necesitas transparencia.
- Tamaño: ~**1600 px** del lado largo. Comprime (TinyPNG/Squoosh) para que cargue rápido.
- Nombres en minúsculas y sin espacios: `marco-hero.jpg`, `persona-1.jpg`.

---

## Dónde va cada foto y cómo conectarla

### 1) `retrato/` — Retrato principal y de apoyo
- **Hero (portada).** Sube `retrato/marco-hero.jpg` y edita
  `src/pages/Home/Hero.tsx` → en `<PortraitPlaceholder ... />` agrega
  `src="/assets/retrato/marco-hero.jpg"`:
  ```tsx
  <PortraitPlaceholder src="/assets/retrato/marco-hero.jpg" alt="Marco Balseca" frame className="aspect-[4/5] w-full" />
  ```
- **Conóceme (retrato de apoyo).** Sube `retrato/marco-conoceme.jpg` y haz lo
  mismo en `src/pages/Conoceme.tsx`.

> Sin `src`, se muestra una silueta gris (placeholder). Con `src`, la foto real.
> Nunca quedan imágenes rotas.

### 2) `comunidad/` — Rostros de simpatizantes
Sube `comunidad/persona-1.jpg`, `persona-2.jpg`, … y en
`src/data/site.ts` (arreglo `COMUNIDAD`) agrega la ruta en `foto`:
```ts
{ rol: 'Vecina', colonia: 'Col. Centro', foto: '/assets/comunidad/persona-1.jpg' },
```
⚠️ Sube fotos de personas **solo con su consentimiento**.

### 3) `acciones/` — Fotos de propuestas / causas / eventos
Sube `acciones/economia-local.jpg`, etc. y en `src/data/acciones.ts` agrega
`imagen` a la tarjeta correspondiente:
```ts
{ slug: 'economia-local', categoria: 'Economía local', titulo: '…', resumen: '…',
  imagen: '/assets/acciones/economia-local.jpg' },
```

### 4) `reels/` — Reels (video propio)
- **Opción recomendada:** enlaza el reel de Instagram/YouTube en
  `src/data/reels.ts` (`instagramUrl` o `youtubeId`) — no necesitas subir video.
- **Video propio:** sube `reels/reel-1.mp4` y pon `src: '/assets/reels/reel-1.mp4'`
  (con `kind: 'mp4'`). Reproduce en hover y en el lightbox.

---

¿Dudas? Sube las fotos y dime; yo dejo las rutas conectadas en el código.
