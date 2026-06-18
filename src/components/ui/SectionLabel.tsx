type Props = {
  /** número de índice, ej. "01" */
  num?: string
  children: React.ReactNode
  /** contexto: 'guinda' = sobre claro · 'bone' = sobre oscuro */
  tone?: 'guinda' | 'bone'
  className?: string
}

/**
 * Etiqueta tipo índice editorial: "01 — TRAYECTORIA".
 * B&N: texto en tinta/blanco según el fondo; el número y la regla en guinda
 * (acento filoso, como el rojo de ESPN).
 */
export function SectionLabel({ num, children, tone = 'guinda', className = '' }: Props) {
  const text = tone === 'guinda' ? 'text-ink' : 'text-white'
  return (
    <div className={`flex items-center gap-3 ${text} ${className}`}>
      {num && <span className="eyebrow tabular-nums text-guinda">{num}</span>}
      <span aria-hidden className="h-px w-8 bg-guinda" />
      <span className="eyebrow">{children}</span>
    </div>
  )
}
