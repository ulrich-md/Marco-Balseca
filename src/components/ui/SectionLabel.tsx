type Props = {
  /** número de índice, ej. "01" */
  num?: string
  children: React.ReactNode
  /** contexto: 'accent' = sobre claro · 'bone' = sobre oscuro */
  tone?: 'accent' | 'bone'
  className?: string
}

/**
 * Etiqueta tipo índice editorial: "01 — TRAYECTORIA".
 * B&N: texto en tinta/blanco según el fondo; el número y la regla en accent
 * (acento filoso, como el rojo de ESPN).
 */
export function SectionLabel({ num, children, tone = 'accent', className = '' }: Props) {
  const text = tone === 'accent' ? 'text-ink' : 'text-white'
  // Sobre oscuro usamos un rojo más vivo para cumplir contraste AA (4.5:1).
  const numCls = tone === 'accent' ? 'text-accent' : 'text-accent-soft'
  const ruleCls = tone === 'accent' ? 'bg-accent' : 'bg-accent-soft'
  return (
    <div className={`flex items-center gap-3 ${text} ${className}`}>
      {num && <span className={`eyebrow tabular-nums ${numCls}`}>{num}</span>}
      <span aria-hidden className={`h-px w-8 ${ruleCls}`} />
      <span className="eyebrow">{children}</span>
    </div>
  )
}
