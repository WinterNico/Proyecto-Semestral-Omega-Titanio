import { Routes, Route, Outlet } from 'react-router-dom';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import RutaProtegida from './components/layout/RutaProtegida.jsx';

// Importaciones de la Tienda 
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

// Importaciones Panel Admin
import AdminLayout from './components/layout/AdminLayout.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
import AdminProductos from './pages/admin/AdminProductos.jsx';
import AdminUsuarios from './pages/admin/AdminUsuarios.jsx';
import AdminNuevoProducto from './pages/admin/AdminNuevoProducto.jsx';
import AdminNuevoUsuario from './pages/admin/AdminNuevoUsuario.jsx';

// Componente contenedor para proteger las vistas de la tienda
// Mantenemos todo general apartado del admin
const TiendaLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-dark text-light">
      <Navbar />
      <main className="container my-4 flex-grow-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <Routes>
      {/* ZONA ADMINISTRADOR (Protegida) */}
      <Route element={<RutaProtegida />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="productos" element={<AdminProductos />} />
        </Route>
      </Route>

      {/* ZONA ADMINISTRADOR */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="productos" element={<AdminProductos />} />
        <Route path="nuevo-producto" element={<AdminNuevoProducto />} />
        <Route path="editar-producto/:id" element={<AdminNuevoProducto />} />
        <Route path="usuarios" element={<AdminUsuarios />} />
        <Route path="nuevo-usuario" element={<AdminNuevoUsuario />} />
        <Route path="editar-usuario/:run" element={<AdminNuevoUsuario />} />
      </Route>

      {/* ZONA TIENDA PUBLICA (Usa el TiendaLayout con Navbar y Footer) */}
      <Route element={<TiendaLayout />}>
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

        {/* Flujo de Carrito, Checkout y Boletas */}
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/compra-exitosa" element={<CompraExitosa />} />
        <Route path="/pago-fallido" element={<PagoFallido />} />

        {/* Autenticacion y Cuenta */}
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/mis-compras" element={<MisCompras />} />

        {/* Ruta 404 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}