import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { SmoothScroll, ScrollToTop } from './lib/SmoothScroll'

import Home from './pages/Home'
import Conoceme from './pages/Conoceme'
import Trayectoria from './pages/Trayectoria'
import Acciones from './pages/Acciones'
import Reels from './pages/Reels'
import Agenda from './pages/Agenda'
import Contacto from './pages/Contacto'
import NotFound from './pages/NotFound'

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
