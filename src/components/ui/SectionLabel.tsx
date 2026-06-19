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
  return (
    <div className={`flex items-center gap-3 ${text} ${className}`}>
      {num && <span className="eyebrow tabular-nums text-accent">{num}</span>}
      <span aria-hidden className="h-px w-8 bg-accent" />
      <span className="eyebrow">{children}</span>
    </div>
  )
}
