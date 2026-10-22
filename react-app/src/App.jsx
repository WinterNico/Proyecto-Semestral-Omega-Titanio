// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Placeholder from './components/common/Placeholder.jsx';

import Home from './pages/Home.jsx';
import Catalogo from './pages/Catalogo.jsx';
import DetalleJuego from './pages/DetalleJuego.jsx';
import Categorias from './pages/Categorias.jsx';
import Ofertas from './pages/Ofertas.jsx';
import Noticias from './pages/Noticias.jsx';
import NoticiaDetalle from './pages/NoticiaDetalle.jsx';
import Nosotros from './pages/Nosotros.jsx';
import Contacto from './pages/Contacto.jsx';
import Carrito from './pages/Carrito.jsx';
import Checkout from './pages/Checkout.jsx';
import CompraExitosa from './pages/CompraExitosa.jsx';
import PagoFallido from './pages/PagoFallido.jsx';
import Login from './pages/Login.jsx';
import Registro from './pages/Registro.jsx';
import Perfil from './pages/Perfil.jsx';
import MisCompras from './pages/MisCompras.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-light">
      <Navbar />

      <main className="container my-4 flex-grow-1">
        <Routes>
          {/* Vistas de Tienda (Integrante 2) */}
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/productos" element={<Catalogo />} />
          <Route path="/juego/:id" element={<DetalleJuego />} />
          <Route path="/producto/:id" element={<DetalleJuego />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/noticias" element={<Noticias />} />
          <Route path="/noticias/:id" element={<NoticiaDetalle />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />

          {/* Flujo de Carrito, Checkout y Boletas (Integrante 2) */}
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/compra-exitosa" element={<CompraExitosa />} />
          <Route path="/pago-fallido" element={<PagoFallido />} />

          {/* Autenticación y Cuenta (Integrante 2) */}
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/mis-compras" element={<MisCompras />} />

          {/* Vistas del Panel Admin (Pendientes para Integrante 3) */}
          <Route path="/admin" element={<Placeholder nombre="Panel Admin - Dashboard" />} />
          <Route path="/admin/juegos" element={<Placeholder nombre="Panel Admin - Gestión Juegos" />} />
          <Route path="/admin/usuarios" element={<Placeholder nombre="Panel Admin - Gestión Usuarios" />} />

          {/* Ruta 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
