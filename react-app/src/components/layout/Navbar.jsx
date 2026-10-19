// src/components/layout/Navbar.jsx
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';

export default function Navbar() {
  const { total, cantidadItems } = useCart();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary border-bottom">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">Omega Titanio</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#menuPrincipal" aria-controls="menuPrincipal"
                aria-expanded="false" aria-label="Menú">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="menuPrincipal">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><NavLink className="nav-link" to="/">Home</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/categorias">Categorías</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/ofertas">Ofertas</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/nosotros">Nosotros</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/blog">Blog</NavLink></li>
            <li className="nav-item"><NavLink className="nav-link" to="/contacto">Contacto</NavLink></li>
          </ul>

          <div className="d-flex gap-2 align-items-center">
            <Link className="btn btn-outline-primary btn-sm" to="/login">Iniciar sesión</Link>
            <Link className="btn btn-primary btn-sm" to="/registro">Crear cuenta</Link>
            <Link className="btn btn-success btn-sm" to="/carrito">
              🛒 Carrito ${total} ({cantidadItems})
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}