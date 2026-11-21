import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiFetch } from '../../services/http.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { formatearCLP } from '../../utils/validaciones.js';

// Detalle de un producto dentro del panel (GET /productos/{id}): admin y vendedor
export default function AdminProductoDetalle() {
  const { id } = useParams();
  const { esAdmin } = useAuth();
  const [producto, setProducto] = useState(null);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    apiFetch(`/productos/${id}`)
      .then(setProducto)
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
    <Link to="/admin/productos" className="btn btn-outline-secondary">
      ← Volver al inventario
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

  const p = producto;
  const critico = p.stock <= (p.stockCritico ?? 5);
  const precioFinal = p.oferta && p.descuento ? Math.round(p.precio * (1 - p.descuento / 100)) : p.precio;
  const dato = (etiqueta, valor) => (
    <div className="col-6 col-md-4">
      <small className="text-secondary d-block">{etiqueta}</small>
      <strong>{valor}</strong>
    </div>
  );

  return (
    <div>
      <header className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
        <div>
          <h1 className="h3 mb-1">{p.nombre}</h1>
          <code>{p.codigo}</code> <span className="text-secondary">· {p.categoriaNombre}</span>
        </div>
        <div className="d-flex gap-2">
          {/* Editar: solo admin */}
          {esAdmin && (
            <Link to={`/admin/editar-producto/${p.id}`} className="btn btn-outline-light">
              Editar
            </Link>
          )}
          {volver}
        </div>
      </header>

      <div className="row g-4">
        <div className="col-12 col-lg-5">
          <img src={p.imagen} alt={p.nombre} className="img-fluid rounded border border-secondary w-100" />
          {p.capturas?.length > 0 && (
            <div className="d-flex gap-2 mt-2 flex-wrap">
              {p.capturas.map((url) => (
                <img
                  key={url}
                  src={url}
                  alt={`Captura de ${p.nombre}`}
                  className="rounded border border-secondary"
                  style={{ width: '90px', height: '55px', objectFit: 'cover' }}
                />
              ))}
            </div>
          )}
        </div>
        <div className="col-12 col-lg-7">
          <div className="card bg-black border-secondary">
            <div className="card-body">
              <div className="row g-3 mb-3">
                {dato('Precio', p.precio === 0 ? 'Free-to-Play' : formatearCLP(p.precio))}
                {dato('Oferta', p.oferta ? `Sí, ${p.descuento}% → ${formatearCLP(precioFinal)}` : 'No')}
                {dato('Categoría', p.categoriaNombre)}
                {dato('Stock', p.stock)}
                {dato('Stock crítico', p.stockCritico)}
                <div className="col-6 col-md-4">
                  <small className="text-secondary d-block">Estado del stock</small>
                  <span className={`badge ${critico ? 'bg-warning text-dark' : 'bg-success'}`}>
                    {critico ? 'Stock Crítico' : 'Normal'}
                  </span>
                </div>
              </div>
              <h2 className="h6 text-success">Descripción</h2>
              <p className="mb-3">{p.descripcion || 'Sin descripción.'}</p>
              <Link to={`/juego/${p.id}`} target="_blank" className="btn btn-sm btn-outline-success">
                Ver en la tienda ↗
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
