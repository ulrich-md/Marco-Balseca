# Marco Balseca — Sitio personal y político

Sitio multipágina de **Marco Balseca**, figura política y comunitaria de
**Tehuacán, Puebla**. Identidad de campaña: paleta **guinda + blanco**, lema
náhuatl **«Tiui Chikavak» (Vámonos recio)** y orgullo por las raíces y las
lenguas maternas.

> Dirección de arte: editorial, cálida y cercana. Campo dominante claro
> (blanco/bone) para dar aire, con el **guinda como acento fuerte** (lema,
> retrato, etiquetas, CTA). Tipografía display gigante condensada.

## Stack

- **Vite + React + TypeScript**
- **Tailwind CSS v4** (tokens centralizados con `@theme` en `src/index.css`)
- **Framer Motion** (split-text, reveals, transiciones de página)
- **GSAP + ScrollTrigger** (parallax y línea de tiempo horizontal con pin)
- **Lenis** (smooth scroll ligero, sin secuestrar el scroll)
- **React Router** (ruteo multipágina real)

## Cómo correr

```bash
npm install
npm run dev      # desarrollo  -> http://localhost:5173
npm run build    # type-check + build de producción (dist/)
npm run preview  # sirve el build de producción
```

Requiere Node 18+ (probado con Node 22).

## Estructura

```
src/
├── data/            # Contenido editable (site, trayectoria, acciones, reels, agenda)
├── lib/             # SEO, smooth scroll, GSAP, parallax, variantes de motion
├── components/
│   ├── layout/      # Header, Footer, Layout, MobileMenu, PageHero, CtaBand
│   └── ui/          # SectionLabel, RevealText, Reveal, StatCounter, Marquee,
│                    # Button, ReelCard, Lightbox, TimelineItem, ActionCard, etc.
└── pages/           # Una carpeta/archivo por página (Home, Conoceme, Trayectoria,
                     # Acciones, Reels, Agenda, Contacto, NotFound)
```

Páginas: **Inicio · Conóceme · Trayectoria · Acciones · Reels · Agenda ·
Contacto**.

## Identidad / tokens

Definidos en `src/index.css` (`@theme`):

| Token            | Hex       | Uso |
|------------------|-----------|-----|
| `--color-guinda` | `#6E2233` | color de marca (acento dominante) |
| `--color-guinda-deep` | `#4E1722` | fondos oscuros (footer) |
| `--color-guinda-soft` | `#8A3145` | hover/detalles |
| `--color-bone`   | `#F4EFEA` | blanco cálido (fondo base) |
| `--color-white`  | `#FFFFFF` | secciones limpias |
| `--color-ink`    | `#1E1714` | texto sobre claro |
| `--color-mute`   | `#8A7E78` | secundarios / metadatos |
| `--color-sand`   | `#D9C7A8` | acento cálido fino |

Fuentes: **Anton** (display de cartel), **Oswald** (condensado), **Inter** (cuerpo).

## Cómo personalizar (placeholders)

El contenido específico (cargos, fechas, cifras, propuestas, citas) está como
**placeholder** y marcado con `// REEMPLAZAR` o `[texto]`. **No se inventaron
datos de la persona.**

- **Textos y datos:** edita los archivos en `src/data/`.
- **Retrato y fotos:** busca `// REEMPLAZAR: ... @marcobalseca1`. Coloca las
  imágenes en `public/` y sustituye los componentes `PortraitPlaceholder` por
  un `<img>`. Mientras tanto se muestran bloques de marca (nunca URLs rotas).
- **Reels:** edita `src/data/reels.ts`. Cada reel acepta `instagramUrl`
  (permalink), `youtubeId` o `src` (MP4 propio con autoplay en hover).
- **Cifras del hero:** en `src/data/site.ts` (`STATS`). Mientras el valor sea
  `0` se muestra `[N]`; al poner un número real, se activa el count-up.
- **Contacto:** actualiza WhatsApp, correo y redes en `SOCIAL` (`src/data/site.ts`).

## Accesibilidad

- HTML semántico, `alt`/`aria-label`, foco visible (doble anillo), skip-link.
- Contraste cuidado (texto de cuerpo en tinta, no en gris claro).
- Respeta `prefers-reduced-motion`: desactiva Lenis, parallax y el pin de la
  línea de tiempo, y muestra los textos sin animación.

## SEO

- `title`, `meta description` y Open Graph por página (`src/lib/Seo.tsx`).
- `public/sitemap.xml`, `public/robots.txt`, favicon e imagen OG (`public/`).
- Ajusta el dominio en `SITE.url` (`src/data/site.ts`) y en `sitemap.xml`.

## Despliegue (Vercel / Netlify)

Build SPA. El ruteo del cliente ya tiene fallback configurado:

- **Vercel:** `vercel.json` (rewrites a `/index.html`).
- **Netlify:** `public/_redirects` (`/* /index.html 200`).
- Comando de build: `npm run build` · carpeta de salida: `dist`.

---

**Tiui Chikavak — Vámonos recio.** Por nuestra tierra y nuestra gente.
