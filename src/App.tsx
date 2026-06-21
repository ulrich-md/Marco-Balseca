import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { SmoothScroll, ScrollToTop } from './lib/SmoothScroll'

// Home eager (landing); el resto se carga por ruta (code-splitting) para
// aligerar el bundle inicial.
import Home from './pages/Home'
const Conoceme = lazy(() => import('./pages/Conoceme'))
const Trayectoria = lazy(() => import('./pages/Trayectoria'))
const Acciones = lazy(() => import('./pages/Acciones'))
const AccionDetalle = lazy(() => import('./pages/AccionDetalle'))
const Reels = lazy(() => import('./pages/Reels'))
const Agenda = lazy(() => import('./pages/Agenda'))
const Contacto = lazy(() => import('./pages/Contacto'))
const NotFound = lazy(() => import('./pages/NotFound'))
// Panel oculto (no en el menú): Marco edita Agenda y Reels.
const Admin = lazy(() => import('./pages/Admin'))

export function App() {
  return (
    <BrowserRouter>
      <SmoothScroll>
        <ScrollToTop />
        <Routes>
          {/* Panel oculto, fuera del layout público (sin header/footer) */}
          <Route
            path="admin"
            element={
              <Suspense fallback={<div className="min-h-screen bg-bone" />}>
                <Admin />
              </Suspense>
            }
          />
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="conoceme" element={<Conoceme />} />
            <Route path="trayectoria" element={<Trayectoria />} />
            <Route path="acciones" element={<Acciones />} />
            <Route path="acciones/:slug" element={<AccionDetalle />} />
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
