import { Suspense } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useLocation, useOutlet } from 'react-router-dom'
import { Header } from './Header'
import { Footer } from './Footer'
import { CornerGlyphs } from '../ui/CornerGlyphs'
import { pageTransition } from '../../lib/motion'

/** Estructura compartida: header fijo, transición de página y footer. */
export function Layout() {
  const location = useLocation()
  const outlet = useOutlet()
  const reduce = useReducedMotion()

  return (
    <div className="flex min-h-screen flex-col">
      <CornerGlyphs />
      <Header />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          id="contenido"
          key={location.pathname}
          className="flex-1"
          variants={reduce ? undefined : pageTransition}
          initial={reduce ? undefined : 'initial'}
          animate={reduce ? undefined : 'animate'}
          exit={reduce ? undefined : 'exit'}
        >
          <Suspense fallback={<div className="min-h-[70vh]" />}>{outlet}</Suspense>
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  )
}
