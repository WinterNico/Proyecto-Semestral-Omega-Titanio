import { useEffect, useState } from 'react';
import { apiFetch } from '../services/http.js';
import ProductCard from '../components/common/ProductCard.jsx';

export default function Ofertas() {
  const [enOferta, setEnOferta] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    apiFetch('/productos?oferta=true')
      .then(setEnOferta)
      .catch((e) => setError(e.message || 'Error al cargar las ofertas.'))
      .finally(() => setCargando(false));
  }, []);

  if (cargando) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-success" role="status" />
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 fw-bold text-success mb-1">Ofertas Especiales</h1>
          <p className="text-secondary mb-0">
            Aprovecha los descuentos por tiempo limitado en nuestro catálogo digital.
          </p>
        </div>
        <span className="badge bg-success fs-6">Descuentos Activos</span>
      </div>

      {enOferta.length === 0 ? (
        <div className="alert alert-secondary bg-dark text-light border-secondary text-center py-5">
          <h5>No hay ofertas activas en este momento</h5>
        </div>
      ) : (
        <div className="row g-4">
          {enOferta.map((prod) => (
            <div className="col-12 col-sm-6 col-lg-4" key={prod.id}>
              <ProductCard
                producto={prod}
                nombreCategoria={prod.categoriaNombre}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
