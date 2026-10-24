// src/components/layout/Footer.jsx
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black text-light border-top border-secondary py-4 mt-auto">
      <div className="container">
        <div className="row g-4">
          <div className="col-12 col-md-4">
            <h6 className="text-success fw-bold">Omega Titanio · Steam Store</h6>
            <p className="small text-secondary mb-0">
              Plataforma de distribución digital de videojuegos desarrollada en React + Bootstrap
              para DSY1104.
            </p>
          </div>
          <div className="col-6 col-md-4">
            <h6 className="text-light fw-bold">Navegación</h6>
            <ul className="list-unstyled small mb-0">
              <li><Link to="/" className="text-secondary text-decoration-none">Home</Link></li>
              <li><Link to="/catalogo" className="text-secondary text-decoration-none">Catálogo de Productos</Link></li>
              <li><Link to="/categorias" className="text-secondary text-decoration-none">Categorías</Link></li>
              <li><Link to="/ofertas" className="text-secondary text-decoration-none">Ofertas</Link></li>
              <li><Link to="/noticias" className="text-secondary text-decoration-none">Noticias y Blog</Link></li>
            </ul>
          </div>
          <div className="col-6 col-md-4">
            <h6 className="text-light fw-bold">Soporte y Cuenta</h6>
            <ul className="list-unstyled small mb-0">
              <li><Link to="/nosotros" className="text-secondary text-decoration-none">Nosotros</Link></li>
              <li><Link to="/contacto" className="text-secondary text-decoration-none">Contacto</Link></li>
              <li><Link to="/mis-compras" className="text-secondary text-decoration-none">Mis Compras</Link></li>
              <li><Link to="/admin" className="text-secondary text-decoration-none">Panel Admin</Link></li>
            </ul>
          </div>
        </div>
        <hr className="border-secondary my-3" />
        <div className="text-center">
          <small className="text-secondary">© 2026 Omega Titanio · Todos los derechos reservados.</small>
        </div>
      </div>
    </footer>
  );
}
