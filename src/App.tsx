import { lazy } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { SmoothScroll, ScrollToTop } from './lib/SmoothScroll'

// Home eager (landing); el resto se carga por ruta (code-splitting) para
// aligerar el bundle inicial.
import Home from './pages/Home'
const Conoceme = lazy(() => import('./pages/Conoceme'))
const Trayectoria = lazy(() => import('./pages/Trayectoria'))
const Acciones = lazy(() => import('./pages/Acciones'))
const Reels = lazy(() => import('./pages/Reels'))
const Agenda = lazy(() => import('./pages/Agenda'))
const Contacto = lazy(() => import('./pages/Contacto'))
const NotFound = lazy(() => import('./pages/NotFound'))

export function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="conoceme" element={<Conoceme />} />
            <Route path="trayectoria" element={<Trayectoria />} />
            <Route path="acciones" element={<Acciones />} />
            <Route path="reels" element={<Reels />} />
            <Route path="agenda" element={<Agenda />} />
            <Route path="contacto" element={<Contacto />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </SmoothScroll>
    </BrowserRouter>
  )
}
