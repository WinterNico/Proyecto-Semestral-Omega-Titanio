import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="card bg-secondary bg-opacity-10 border-secondary text-light p-5 text-center">
      <span className="badge bg-warning text-dark mx-auto mb-2">ERROR 404</span>
      <h1 className="h3 fw-bold text-success mb-3">Página No Encontrada</h1>
      <p className="text-secondary mb-4">
        La ruta que intentas visitar no existe dentro de Omega Titanio.
      </p>
      <div>
        <Link to="/" className="btn btn-success">
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
}
