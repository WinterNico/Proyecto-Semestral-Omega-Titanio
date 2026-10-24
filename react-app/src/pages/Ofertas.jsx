import { db } from '../data/db.js';
import ProductCard from '../components/common/ProductCard.jsx';

export default function Ofertas() {
  const productos = db.productos.obtenerTodos();
  const categorias = db.categorias.obtenerTodos();
  const mapaCategorias = Object.fromEntries(categorias.map((c) => [c.id, c.nombre]));

  const enOferta = productos.filter((p) => p.oferta);

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

      <div className="row g-4">
        {enOferta.map((prod) => (
          <div className="col-12 col-sm-6 col-lg-4" key={prod.id}>
            <ProductCard
              producto={prod}
              nombreCategoria={mapaCategorias[prod.categoriaId]}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
