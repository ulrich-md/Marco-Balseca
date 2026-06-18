import { Link } from 'react-router-dom'
import type { Accion } from '../../data/acciones'

type Props = { accion: Accion; index: number }

/**
 * Tarjeta editorial de acción/propuesta.
 * Imagen como bloque de marca (placeholder). REEMPLAZAR: foto de @marcobalseca1.
 * Enlaza a /acciones (listo para añadir ruta de detalle por slug).
 */
export function ActionCard({ accion, index }: Props) {
  return (
    <Link
      to={`/acciones#${accion.slug}`}
      id={accion.slug}
      className="group relative flex scroll-mt-28 flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white transition-all duration-500 ease-[var(--ease-out-expo)] hover:-translate-y-1.5 hover:shadow-[0_24px_50px_-24px_rgba(110,34,51,0.35)]"
    >
      {/* Imagen placeholder */}
      <div className="relative aspect-[4/3] overflow-hidden bg-guinda-deep">
        <div className="bg-grain absolute inset-0" />
        <div
          className="absolute inset-0 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105"
          style={{
            background: 'radial-gradient(120% 90% at 80% 10%, rgba(217,199,168,0.16), transparent 55%)',
          }}
        />
        <span className="font-display absolute -bottom-4 -right-1 text-[7rem] leading-none text-guinda-soft/25">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="eyebrow absolute left-5 top-5 text-sand">{accion.categoria}</span>
      </div>

      {/* Texto */}
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-condensed text-2xl font-semibold leading-tight text-ink transition-colors group-hover:text-guinda">
          {accion.titulo}
        </h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/70">{accion.resumen}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em] text-guinda">
          Conocer más
          <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </Link>
  )
}
