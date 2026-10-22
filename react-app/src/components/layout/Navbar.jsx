// src/components/layout/Navbar.jsx
import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import { formatearMontoBoleta } from '../../utils/validaciones.js';

export default function Navbar() {
  const { totalItems, totalPrice, user, logout } = useCart();
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();

  const manejarBusqueda = (e) => {
    e.preventDefault();
    const q = busqueda.trim();
    if (q) {
      navigate(`/catalogo?q=${encodeURIComponent(q)}`);
    } else {
      navigate('/catalogo');
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black border-bottom border-success sticky-top">
      <div className="container">
        <Link className="navbar-brand fw-bold d-flex align-items-center gap-2 text-success" to="/">
          <img
            src="/assets/img/logo.png"
            alt="Logo"
            width="36"
            height="36"
            className="d-inline-block align-text-top"
          />
          Omega Titanio
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navContent"
          aria-controls="navContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/" end>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/catalogo">
                Productos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/categorias">
                Categorías
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/ofertas">
                Ofertas
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/nosotros">
                Nosotros
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/noticias">
                Blog
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contacto">
                Contacto
              </NavLink>
            </li>
          </ul>

          <form className="d-flex me-lg-3 my-2 my-lg-0" onSubmit={manejarBusqueda}>
            <input
              type="search"
              className="form-control form-control-sm bg-dark text-light border-secondary me-2"
              placeholder="Buscar juego..."
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
            />
            <button type="submit" className="btn btn-sm btn-outline-success">
              Buscar
            </button>
          </form>

          <div className="d-flex align-items-center gap-2 flex-wrap">
            <Link to="/carrito" className="btn btn-success btn-sm position-relative">
              🛒 Carrito {formatearMontoBoleta(totalPrice)}
              {totalItems > 0 && (
                <span className="ms-2 badge rounded-pill bg-dark text-light">
                  {totalItems}
                </span>
              )}
            </Link>

            {user ? (
              <div className="d-flex align-items-center gap-2">
                <Link to="/perfil" className="btn btn-sm btn-outline-info">
                  👤 {user.nombre}
                </Link>
                {user.rol === 'admin' && (
                  <Link to="/admin" className="btn btn-sm btn-warning">
                    Admin
                  </Link>
                )}
                <button
                  type="button"
                  onClick={logout}
                  className="btn btn-sm btn-outline-danger"
                >
                  Salir
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="btn btn-sm btn-outline-light">
                  Iniciar Sesión
                </Link>
                <Link to="/registro" className="btn btn-sm btn-primary">
                  Crear Cuenta
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
