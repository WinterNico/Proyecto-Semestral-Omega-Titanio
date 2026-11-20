import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

/**
 * <RutaProtegida />                     → solo exige estar logueado
 * <RutaProtegida roles={['admin']} />   → además exige uno de esos roles
 */
export default function RutaProtegida({ roles }) {
  const { user, cargando } = useAuth();
  const location = useLocation();

  if (cargando) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-dark">
        <div className="spinner-border text-success" role="status" />
      </div>
    );
  }

  if (!user) {
    // Se guarda a dónde quería ir, para devolverlo ahí después del login
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (roles && !roles.includes(user.rol)) {
    // Sin permiso: el personal vuelve al panel y el cliente a la tienda
    return <Navigate to={user.rol === 'cliente' ? '/' : '/admin'} replace />;
  }

  return <Outlet />;
}
