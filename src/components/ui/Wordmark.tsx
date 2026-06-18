import { Link } from 'react-router-dom'
import { SITE } from '../../data/site'

type Props = {
  tone?: 'bone' | 'guinda' | 'ink'
  className?: string
  onClick?: () => void
}

/** Wordmark "MARCO BALSECA" — sans condensado, bold, mayúsculas. */
export function Wordmark({ tone = 'ink', className = '', onClick }: Props) {
  const color = tone === 'bone' ? 'text-bone' : tone === 'ink' ? 'text-ink' : 'text-guinda'
  return (
    <Link
      to="/"
      onClick={onClick}
      aria-label={`${SITE.name} — inicio`}
      className={`font-condensed inline-flex items-baseline gap-2 font-bold uppercase leading-none tracking-tight ${color} ${className}`}
    >
      <span className="text-xl md:text-[1.45rem]">Marco</span>
      <span className="text-xl md:text-[1.45rem]">Balseca</span>
    </Link>
  )
}
