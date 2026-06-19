import { Link } from 'react-router-dom'
import type { Accion } from '../../data/acciones'

type Props = { accion: Accion; index: number }

/**
 * Tarjeta editorial de acción/propuesta. Imagen como bloque gris B&N
 * (placeholder). REEMPLAZAR: foto de @marcobalseca1. Rojo solo como acento.
 */
export function ActionCard({ accion, index }: Props) {
  return (
    <Link
      to={`/acciones#${accion.slug}`}
      id={accion.slug}
      className="group relative flex scroll-mt-28 flex-col overflow-hidden rounded-sm border border-ink/10 bg-white transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:border-ink/20 hover:shadow-[0_24px_50px_-24px_rgba(0,0,0,0.3)]"
    >
      {/* Imagen: foto real (data/acciones.ts -> imagen) o bloque gris B&N */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-b from-[#ededed] to-[#d4d4d4]">
        {accion.imagen ? (
          <img
            src={accion.imagen}
            alt={accion.titulo}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover grayscale transition-all duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105 group-hover:grayscale-0"
          />
        ) : (
          <span className="font-display absolute -bottom-4 -right-1 text-[7rem] leading-none text-ink/[0.07]">
            {String(index + 1).padStart(2, '0')}
          </span>
        )}
        <span className="eyebrow absolute left-5 top-5 text-accent">{accion.categoria}</span>
        {/* línea accent que se dibuja al hover (ref. ESPN/Yeezy) */}
        <span aria-hidden className="absolute bottom-0 left-0 z-10 h-0.5 w-0 bg-accent transition-all duration-500 ease-[var(--ease-out-expo)] group-hover:w-full" />
      </div>

      {/* Texto */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-condensed text-2xl font-semibold leading-tight text-ink transition-colors group-hover:text-accent">
          {accion.titulo}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/70">{accion.resumen}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-accent">
          Conocer más
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
  )
}
