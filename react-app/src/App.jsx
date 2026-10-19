// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import Placeholder from './components/common/Placeholder.jsx';

export default function App() {
  return (
    <>
      <Navbar />
      <main className="container my-4">
        <Routes>
          {/* Tienda (Integrante 2) */}
          <Route path="/" element={<Placeholder nombre="Home" />} />
          <Route path="/productos" element={<Placeholder nombre="Productos" />} />
          <Route path="/productos/:id" element={<Placeholder nombre="Detalle producto" />} />
          <Route path="/categorias" element={<Placeholder nombre="Categorías" />} />
          <Route path="/categorias/:slug" element={<Placeholder nombre="Categoría" />} />
          <Route path="/ofertas" element={<Placeholder nombre="Ofertas" />} />
          <Route path="/blog" element={<Placeholder nombre="Blog" />} />
          <Route path="/blog/:id" element={<Placeholder nombre="Detalle blog" />} />
          <Route path="/nosotros" element={<Placeholder nombre="Nosotros" />} />
          <Route path="/contacto" element={<Placeholder nombre="Contacto" />} />
          <Route path="/registro" element={<Placeholder nombre="Registro" />} />
          <Route path="/login" element={<Placeholder nombre="Iniciar sesión" />} />
          <Route path="/carrito" element={<Placeholder nombre="Carrito" />} />
          <Route path="/checkout" element={<Placeholder nombre="Checkout" />} />
          <Route path="/compra-exitosa/:orden" element={<Placeholder nombre="Compra exitosa" />} />
          <Route path="/pago-fallido/:orden" element={<Placeholder nombre="Pago fallido" />} />

          {/* Panel admin (Integrante 3) */}
          <Route path="/admin" element={<Placeholder nombre="Admin Dashboard" />} />
          <Route path="/admin/ordenes" element={<Placeholder nombre="Admin Órdenes" />} />
          <Route path="/admin/productos" element={<Placeholder nombre="Admin Productos" />} />
          <Route path="/admin/productos/nuevo" element={<Placeholder nombre="Nuevo producto" />} />
          <Route path="/admin/productos/:id" element={<Placeholder nombre="Mostrar producto" />} />
          <Route path="/admin/productos/:id/editar" element={<Placeholder nombre="Editar producto" />} />
          <Route path="/admin/productos/criticos" element={<Placeholder nombre="Productos críticos" />} />
          <Route path="/admin/categorias" element={<Placeholder nombre="Admin Categorías" />} />
          <Route path="/admin/usuarios" element={<Placeholder nombre="Admin Usuarios" />} />
          <Route path="/admin/usuarios/nuevo" element={<Placeholder nombre="Nuevo usuario" />} />
          <Route path="/admin/usuarios/:id" element={<Placeholder nombre="Mostrar usuario" />} />
          <Route path="/admin/usuarios/:id/editar" element={<Placeholder nombre="Editar usuario" />} />
          <Route path="/admin/usuarios/:id/historial" element={<Placeholder nombre="Historial de compras" />} />
          <Route path="/admin/reportes" element={<Placeholder nombre="Reportes" />} />
          <Route path="/admin/perfil" element={<Placeholder nombre="Perfil" />} />

          <Route path="*" element={<Placeholder nombre="Página no encontrada" />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}