import { useSearchParams } from 'react-router-dom';
import { db } from '../data/db.js';
import ProductCard from '../components/common/ProductCard.jsx';

export default function Categorias() {
  const productos = db.productos.obtenerTodos();
  const categorias = db.categorias.obtenerTodos();
  const [searchParams, setSearchParams] = useSearchParams();

  const catActivaId = searchParams.get('cat') || '';
  const categoriaSeleccionada = categorias.find(
    (c) => String(c.id) === String(catActivaId) || c.slug === catActivaId
  );

  const productosMostrados = categoriaSeleccionada
    ? productos.filter((p) => String(p.categoriaId) === String(categoriaSeleccionada.id))
    : productos;

  const mapaCategorias = Object.fromEntries(categorias.map((c) => [c.id, c.nombre]));

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h1 className="h3 fw-bold text-success mb-1">Categorías de Videojuegos</h1>
          <p className="text-secondary mb-0">
            Selecciona una categoría para explorar sus títulos disponibles (Figura 4 Anexo EP2).
          </p>
        </div>
        {categoriaSeleccionada && (
          <button
            type="button"
            className="btn btn-sm btn-outline-light"
            onClick={() => setSearchParams({})}
          >
            Ver todas
          </button>
        )}
      </div>

      {/* Tarjetas de Categorías */}
      <div className="row g-3 mb-5">
        {categorias.map((cat) => {
          const activa = categoriaSeleccionada?.id === cat.id;
          const totalEnCat = productos.filter(
            (p) => String(p.categoriaId) === String(cat.id)
          ).length;

          return (
            <div className="col-6 col-md-3" key={cat.id}>
              <div
                role="button"
                onClick={() => setSearchParams({ cat: cat.id })}
                className={`card h-100 text-light bg-secondary bg-opacity-10 ${
                  activa ? 'border-success border-2 shadow' : 'border-secondary'
                }`}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={cat.imagen || '/assets/img/steamverde.jpg'}
                  alt={cat.nombre}
                  className="card-img-top"
                  style={{ height: '120px', objectFit: 'cover' }}
                />
                <div className="card-body text-center">
                  <h6 className="fw-bold text-success mb-1">{cat.nombre}</h6>
                  <span className="badge bg-dark border border-secondary">
                    {totalEnCat} juego(s)
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <h2 className="h4 fw-bold text-light mb-3">
        {categoriaSeleccionada ? categoriaSeleccionada.nombre : 'Todos los Juegos'}
      </h2>

      <div className="row g-4">
        {productosMostrados.map((prod) => (
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
