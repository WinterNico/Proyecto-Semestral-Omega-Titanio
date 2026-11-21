import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../../services/http.js';
import { formatearCLP } from '../../utils/validaciones.js';

// Listado de órdenes desde el backend (GET /ordenes: solo admin y vendedor)
export default function AdminOrdenes() {
  const [ordenes, setOrdenes] = useState([]);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    apiFetch('/ordenes')
      .then(setOrdenes)
      .catch((e) => setError(e.message))
      .finally(() => setCargando(false));
  }, []);

  if (cargando) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-success" role="status" />
      </div>
    );
  }
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <h1 className="h3 mb-4">Órdenes de compra</h1>
      <div className="table-responsive shadow-sm rounded bg-black border border-secondary p-3">
        <table className="table table-dark table-hover align-middle">
          <thead>
            <tr>
              <th>N° orden</th>
              <th>Fecha</th>
              <th>Cliente</th>
              <th>Estado</th>
              <th className="text-end">Total</th>
              <th className="text-center">Detalle</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.map((o) => (
              <tr key={o.id}>
                <td><code>{o.nroOrden}</code></td>
                <td>{new Date(o.fecha).toLocaleString('es-CL')}</td>
                <td>
                  {o.cliente?.nombre} {o.cliente?.apellidos}
                  <br />
                  <small className="text-secondary">{o.cliente?.correo}</small>
                </td>
                <td>
                  <span className={`badge ${o.estado === 'EXITOSO' ? 'bg-success' : 'bg-secondary'}`}>
                    {o.estado}
                  </span>
                </td>
                <td className="text-end">{formatearCLP(o.total)}</td>
                <td className="text-center">
                  <Link to={`/admin/ordenes/${o.id}`} className="btn btn-sm btn-outline-info">
                    Ver
                  </Link>
                </td>
              </tr>
            ))}
            {ordenes.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center text-secondary py-4">Aún no hay órdenes</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
