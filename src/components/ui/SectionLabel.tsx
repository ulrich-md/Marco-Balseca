type Props = {
  /** número de índice, ej. "01" */
  num?: string
  children: React.ReactNode
  /** color del texto/regla (sobre claro u oscuro) */
  tone?: 'guinda' | 'bone'
  className?: string
}

/** Etiqueta tipo índice editorial: "01 — TRAYECTORIA". */
export function SectionLabel({ num, children, tone = 'guinda', className = '' }: Props) {
  const color = tone === 'guinda' ? 'text-guinda' : 'text-bone'
  return (
    <div className={`flex items-center gap-3 ${color} ${className}`}>
      {num && <span className="eyebrow tabular-nums opacity-90">{num}</span>}
      <span aria-hidden className="h-px w-8 bg-current opacity-40" />
      <span className="eyebrow">{children}</span>
    </div>
  )
}
