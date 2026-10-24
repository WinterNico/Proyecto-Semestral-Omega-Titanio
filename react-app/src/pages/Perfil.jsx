import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

export default function Perfil() {
  const { user, logout } = useCart();

  if (!user) {
    return (
      <div className="card bg-secondary bg-opacity-10 border-secondary text-light p-5 text-center">
        <h3>No has iniciado sesión</h3>
        <p className="text-secondary">Inicia sesión para ver y gestionar tu perfil.</p>
        <div>
          <Link to="/login" className="btn btn-success">
            Ir a Iniciar Sesión
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-secondary bg-opacity-10 border-secondary text-light p-4">
      <h1 className="h4 fw-bold text-success mb-3">Mi Perfil</h1>
      <div className="row g-3">
        <div className="col-12 col-md-6">
          <small className="text-secondary d-block">Nombre Completo</small>
          <strong>{user.nombre} {user.apellidos}</strong>
        </div>
        <div className="col-12 col-md-6">
          <small className="text-secondary d-block">Correo</small>
          <strong>{user.correo || user.email}</strong>
        </div>
        <div className="col-12 col-md-6">
          <small className="text-secondary d-block">RUN</small>
          <strong>{user.run || 'No registrado'}</strong>
        </div>
        <div className="col-12 col-md-6">
          <small className="text-secondary d-block">Dirección predeterminada</small>
          <strong>{user.calle || 'Sin dirección'} · {user.comuna || ''}</strong>
        </div>
      </div>
      <div className="d-flex gap-2 mt-4">
        <Link to="/mis-compras" className="btn btn-outline-success">
          Ver Historial de Compras
        </Link>
        <button type="button" className="btn btn-outline-danger" onClick={logout}>
          Cerrar Sesión
        </button>
      </div>
    </div>
  );
}
