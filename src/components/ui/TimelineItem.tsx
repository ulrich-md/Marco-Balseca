import type { Hito } from '../../data/trayectoria'

type Props = {
  hito: Hito
  index: number
  orientation: 'horizontal' | 'vertical'
}

/** Tarjeta de hito de la línea de tiempo. Reutilizable horizontal/vertical. */
export function TimelineItem({ hito, index, orientation }: Props) {
  const isH = orientation === 'horizontal'
  return (
    <article
      className={
        isH
          ? 'relative w-[80vw] shrink-0 sm:w-[26rem]'
          : 'relative'
      }
    >
      {/* Punto sobre el riel */}
      <span
        aria-hidden
        className={
          isH
            ? 'absolute -top-[2.45rem] left-0 h-3.5 w-3.5 rounded-full bg-guinda ring-4 ring-bone'
            : 'absolute -left-[1.95rem] top-1.5 h-3.5 w-3.5 rounded-full bg-guinda ring-4 ring-bone'
        }
      />
      <div className="rounded-2xl border border-ink/10 bg-white p-7 md:p-8">
        <div className="flex items-baseline justify-between gap-4">
          <span className="font-display text-4xl leading-none text-guinda md:text-5xl">
            {hito.anio}
          </span>
          <span className="font-display text-3xl leading-none text-guinda/20">
            {String(index + 1).padStart(2, '0')}
          </span>
        </div>
        <h3 className="font-condensed mt-4 text-2xl font-semibold leading-tight text-ink">
          {hito.titulo}
        </h3>
        <p className="mt-3 leading-relaxed text-ink/70">{hito.texto}</p>
        {hito.lugar && (
          <p className="eyebrow mt-5 text-guinda/70">{hito.lugar}</p>
        )}
      </div>
    </article>
  )
}
