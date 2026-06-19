# Marco Balseca — Sitio personal y político

Sitio multipágina de **Marco Balseca**, figura política y comunitaria de
**Tehuacán, Puebla**. El **nombre es el protagonista** (no hay eslogan).

> Dirección de arte: **editorial Swiss / B&N de alto contraste** (ref. ESPN y
> Yeezy). Base **blanco + negro + gris neutro**; **rojo `#E1251B` como único
> acento**. Titulares negros gigantes (Anton), etiquetas técnicas en mono
> (JetBrains Mono), grid editorial. Capa **humana de comunidad** (rostros de
> simpatizantes + contador “ya se sumaron”) para que sea cercano y amigable.

> Sistema de diseño asistido por el skill **UI/UX Pro Max** (instalado en
> `.claude/skills/`): recomienda *Swiss Modernism 2.0 / Editorial Grid*, paleta
> B&N + un acento, y el patrón *Community Landing*.

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
| `--color-accent` | `#E1251B` | **rojo de acento** (único color del sistema) |
| `--color-accent-deep` | `#B81C12` | hover/pressed |
| `--color-accent-soft` | `#F23B2E` | acento más vivo |
| `--color-black`  | `#0B0B0B` | campos oscuros (footer, CTA, menú) |
| `--color-ink`    | `#161616` | texto sobre claro (negro neutro) |
| `--color-white`  | `#FFFFFF` | campo dominante |
| `--color-bone`   | `#F4F4F2` | casi-blanco neutro / texto inverso |
| `--color-mist`   | `#EAEAEA` | gris para bloques de foto |
| `--color-mute`   | `#5E5E5E` | secundarios / metadatos (AA) |

Fuentes: **Anton** (titular de cartel), **Oswald** (condensada), **Inter**
(cuerpo), **JetBrains Mono** (etiquetas técnicas tipo índice).

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
