import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

type Variant = 'solid' | 'outline' | 'ghost'
type Tone = 'guinda' | 'bone'

type CommonProps = {
  children: ReactNode
  variant?: Variant
  tone?: Tone
  className?: string
  full?: boolean
}

const base =
  'group/btn inline-flex items-center justify-center gap-2.5 font-condensed font-semibold uppercase tracking-[0.12em] text-sm px-7 py-3.5 rounded-full transition-all duration-300 ease-[var(--ease-out-expo)] focus-visible:outline-offset-2'

function classes({ variant = 'solid', tone = 'guinda', full }: CommonProps) {
  const width = full ? 'w-full' : ''
  const map: Record<Tone, Record<Variant, string>> = {
    guinda: {
      solid:
        'bg-guinda text-bone hover:bg-guinda-soft hover:-translate-y-0.5 shadow-[0_10px_30px_-12px_rgba(110,34,51,0.6)]',
      outline: 'border border-guinda/40 text-guinda hover:bg-guinda hover:text-bone hover:-translate-y-0.5',
      ghost: 'text-guinda hover:bg-guinda/8',
    },
    bone: {
      solid: 'bg-bone text-guinda hover:bg-white hover:-translate-y-0.5 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.45)]',
      outline: 'border border-bone/45 text-bone hover:bg-bone hover:text-guinda hover:-translate-y-0.5',
      ghost: 'text-bone hover:bg-bone/10',
    },
  }
  return `${base} ${map[tone][variant]} ${width}`
}

const Arrow = () => (
  <span
    aria-hidden
    className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1"
  >
    →
  </span>
)

type LinkProps = CommonProps & { to: string; arrow?: boolean; onClick?: () => void }
export function ButtonLink({ to, arrow = true, onClick, ...p }: LinkProps) {
  return (
    <Link to={to} onClick={onClick} className={`${classes(p)} ${p.className ?? ''}`}>
      {p.children}
      {arrow && <Arrow />}
    </Link>
  )
}

type AnchorProps = CommonProps & { href: string; arrow?: boolean; external?: boolean }
export function ButtonAnchor({ href, arrow = false, external = true, ...p }: AnchorProps) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      className={`${classes(p)} ${p.className ?? ''}`}
    >
      {p.children}
      {arrow && <Arrow />}
    </a>
  )
}

type BtnProps = CommonProps & {
  onClick?: () => void
  type?: 'button' | 'submit'
  arrow?: boolean
  disabled?: boolean
}
export function Button({ onClick, type = 'button', arrow = false, disabled, ...p }: BtnProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${classes(p)} ${disabled ? 'opacity-60 pointer-events-none' : ''} ${p.className ?? ''}`}
    >
      {p.children}
      {arrow && <Arrow />}
    </button>
  )
}
