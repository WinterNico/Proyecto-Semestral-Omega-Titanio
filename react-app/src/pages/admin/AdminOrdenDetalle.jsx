import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiFetch } from '../../services/http.js';
import { formatearCLP } from '../../utils/validaciones.js';

// Detalle de una orden (GET /ordenes/{id}): admin y vendedor, solo lectura
export default function AdminOrdenDetalle() {
  const { id } = useParams();
  const [orden, setOrden] = useState(null);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    apiFetch(`/ordenes/${id}`)
      .then(setOrden)
      .catch((e) => setError(e.message))
      .finally(() => setCargando(false));
  }, [id]);

  if (cargando) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-success" role="status" />
      </div>
    );
  }

  const volver = (
    <Link to="/admin/ordenes" className="btn btn-outline-secondary">
      ← Volver a órdenes
    </Link>
  );

  if (error) {
    return (
      <div>
        <div className="alert alert-danger">{error}</div>
        {volver}
      </div>
    );
  }

  const c = orden.cliente || {};
  const exitosa = orden.estado === 'EXITOSO';

  return (
    <div>
      <header className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
        <div>
          <h1 className="h3 mb-1">
            Orden <code>#{orden.nroOrden}</code>
          </h1>
          <span className="text-secondary">
            {new Date(orden.fecha).toLocaleString('es-CL')} · Código {orden.codigoOrden}
          </span>
        </div>
        <div className="d-flex align-items-center gap-3">
          <span className={`badge fs-6 ${exitosa ? 'bg-success' : 'bg-secondary'}`}>{orden.estado}</span>
          {volver}
        </div>
      </header>

      <div className="row g-3 mb-4">
        <div className="col-12 col-lg-6">
          <div className="card bg-black border-secondary h-100">
            <div className="card-body">
              <h2 className="h6 text-success mb-3">Cliente</h2>
              <p className="mb-1"><strong>{c.nombre} {c.apellidos}</strong></p>
              <p className="mb-1 text-secondary">{c.correo}</p>
              <p className="mb-0 small text-secondary">ID de usuario: {orden.usuarioId ?? '—'}</p>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-6">
          <div className="card bg-black border-secondary h-100">
            <div className="card-body">
              <h2 className="h6 text-success mb-3">Dirección de entrega</h2>
              <p className="mb-1">
                {c.calle}
                {c.departamento ? `, ${c.departamento}` : ''}
              </p>
              <p className="mb-1 text-secondary">{c.comuna}, {c.region}</p>
              {c.indicaciones && <p className="mb-0 small">Indicaciones: {c.indicaciones}</p>}
            </div>
          </div>
        </div>
      </div>

      <div className="table-responsive shadow-sm rounded bg-black border border-secondary p-3">
        <table className="table table-dark table-hover align-middle mb-0">
          <thead>
            <tr>
              <th>Producto</th>
              <th className="text-end">Precio unitario</th>
              <th className="text-center">Cantidad</th>
              <th className="text-end">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {orden.items.map((item) => (
              <tr key={item.id}>
                <td>
                  <div className="d-flex align-items-center gap-2">
                    <img
                      src={item.imagen}
                      alt={item.nombre}
                      className="rounded border"
                      style={{ width: '50px', height: '30px', objectFit: 'cover' }}
                    />
                    <Link to={`/admin/productos/${item.id}`} className="text-light">
                      {item.nombre}
                    </Link>
                  </div>
                </td>
                <td className="text-end">{formatearCLP(item.precioUnitario)}</td>
                <td className="text-center">{item.quantity}</td>
                <td className="text-end">{formatearCLP(item.subtotal)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th colSpan="3" className="text-end">Total</th>
              <th className="text-end fs-5 text-success">{formatearCLP(orden.total)}</th>
            </tr>
          </tfoot>
        </table>
      </div>
      {!exitosa && (
        <p className="text-secondary small mt-3">
          El pago de esta orden fue rechazado: no se descontó stock.
        </p>
      )}
    </div>
  );
}
