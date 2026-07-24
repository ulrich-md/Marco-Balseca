import { Link } from 'react-router-dom'
import { SITE } from '../../data/site'

type Props = {
  tone?: 'bone' | 'accent' | 'ink'
  /** Bicolor "MARCO" guinda / "BALSECA" tinta — ecoa el hero (cohesión). */
  split?: boolean
  className?: string
  onClick?: () => void
}

/** Wordmark "MARCO BALSECA" — sans condensado, bold, mayúsculas. */
export function Wordmark({ tone = 'ink', split = false, className = '', onClick }: Props) {
  const color = tone === 'bone' ? 'text-bone' : tone === 'ink' ? 'text-ink' : 'text-accent'
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label={`${SITE.name} — inicio`}
      className={`font-condensed group inline-flex items-baseline gap-2 font-bold uppercase leading-none tracking-tight ${split ? '' : color} ${className}`}
    >
      <span className={`text-xl md:text-[1.45rem] ${split ? 'text-accent' : ''}`}>Marco</span>
      <span className={`text-xl md:text-[1.45rem] ${split ? 'text-ink' : ''}`}>Balseca</span>
    </Link>
  )
}
