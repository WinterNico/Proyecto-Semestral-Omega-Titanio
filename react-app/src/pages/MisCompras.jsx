import { Link } from 'react-router-dom';
import { db } from '../data/db.js';
import { formatearMontoBoleta } from '../utils/validaciones.js';

export default function MisCompras() {
  const ordenes = db.ordenes.obtenerTodos();

  return (
    <div>
      <h1 className="h3 fw-bold text-success mb-4">Historial de Compras</h1>
      {ordenes.length === 0 ? (
        <div className="card bg-secondary bg-opacity-10 border-secondary text-light p-5 text-center">
          <h5>Aún no registras compras en el sistema</h5>
          <Link to="/catalogo" className="btn btn-success mt-3">
            Ir al Catálogo
          </Link>
        </div>
      ) : (
        <div className="d-flex flex-column gap-3">
          {ordenes.map((ord) => (
            <div
              key={ord.id}
              className="card bg-secondary bg-opacity-10 border-secondary text-light p-3"
            >
              <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
                <div>
                  <strong className="text-success">Orden #{ord.nroOrden}</strong> ·{' '}
                  <small className="text-secondary">{ord.fecha}</small>
                </div>
                <span
                  className={`badge ${
                    ord.estado === 'EXITOSO' ? 'bg-success' : 'bg-danger'
                  }`}
                >
                  {ord.estado}
                </span>
              </div>
              <div className="mt-2 small text-secondary">
                Cliente: {ord.cliente?.nombre} {ord.cliente?.apellidos} ({ord.cliente?.correo})
              </div>
              <div className="mt-2 fw-bold">
                Total: {formatearMontoBoleta(ord.total)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
