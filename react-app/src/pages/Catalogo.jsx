import { useSearchParams } from 'react-router-dom';
import { db } from '../data/db.js';
import ProductCard from '../components/common/ProductCard.jsx';
import { calcularPrecioFinal } from '../utils/validaciones.js';

export default function Catalogo() {
  const productos = db.productos.obtenerTodos();
  const categorias = db.categorias.obtenerTodos();
  const [searchParams, setSearchParams] = useSearchParams();

  const q = searchParams.get('q') || '';
  const catId = searchParams.get('categoria') || '';
  const orden = searchParams.get('orden') || 'default';

  const mapaCategorias = Object.fromEntries(categorias.map((c) => [c.id, c.nombre]));

  const cambiarParam = (clave, valor) => {
    const copia = new URLSearchParams(searchParams);
    if (valor) {
      copia.set(clave, valor);
    } else {
      copia.delete(clave);
    }
    setSearchParams(copia);
  };

  const filtrados = productos
    .filter((p) => {
      const coincideTexto =
        !q || p.nombre.toLowerCase().includes(q.toLowerCase());
      const coincideCat =
        !catId || String(p.categoriaId) === String(catId);
      return coincideTexto && coincideCat;
    })
    .sort((a, b) => {
      if (orden === 'precio-asc') return calcularPrecioFinal(a) - calcularPrecioFinal(b);
      if (orden === 'precio-desc') return calcularPrecioFinal(b) - calcularPrecioFinal(a);
      if (orden === 'nombre') return a.nombre.localeCompare(b.nombre);
      return 0;
    });

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
        <div>
          <h1 className="h3 fw-bold text-success mb-1">Catálogo de Productos</h1>
          <p className="text-secondary mb-0">
            Mostrando {filtrados.length} de {productos.length} videojuegos disponibles.
          </p>
        </div>
      </div>

      {/* Filtros sincronizados con URL (useSearchParams) */}
      <div className="card bg-secondary bg-opacity-10 border-secondary p-3 mb-4">
        <div className="row g-3 align-items-end">
          <div className="col-12 col-md-5">
            <label className="form-label small text-light">Buscar videojuego</label>
            <input
              type="text"
              className="form-control bg-dark text-light border-secondary"
              placeholder="Ej: Monster Hunter, Cyberpunk, Marvel..."
              value={q}
              onChange={(e) => cambiarParam('q', e.target.value)}
            />
          </div>

          <div className="col-6 col-md-3">
            <label className="form-label small text-light">Categoría</label>
            <select
              className="form-select bg-dark text-light border-secondary"
              value={catId}
              onChange={(e) => cambiarParam('categoria', e.target.value)}
            >
              <option value="">Todas las categorías</option>
              {categorias.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="col-6 col-md-2">
            <label className="form-label small text-light">Ordenar por</label>
            <select
              className="form-select bg-dark text-light border-secondary"
              value={orden}
              onChange={(e) => cambiarParam('orden', e.target.value)}
            >
              <option value="default">Por defecto</option>
              <option value="precio-asc">Menor precio</option>
              <option value="precio-desc">Mayor precio</option>
              <option value="nombre">Nombre (A-Z)</option>
            </select>
          </div>

          <div className="col-12 col-md-2">
            <button
              type="button"
              className="btn btn-outline-light w-100"
              onClick={() => setSearchParams({})}
            >
              Limpiar
            </button>
          </div>
        </div>
      </div>

      {filtrados.length === 0 ? (
        <div className="alert alert-secondary bg-dark text-light border-secondary text-center py-5">
          <h5>No encontramos juegos con esos criterios</h5>
          <button
            type="button"
            className="btn btn-success mt-2"
            onClick={() => setSearchParams({})}
          >
            Mostrar todo el catálogo
          </button>
        </div>
      ) : (
        <div className="row g-4">
          {filtrados.map((prod) => (
            <div className="col-12 col-sm-6 col-lg-4" key={prod.id}>
              <ProductCard
                producto={prod}
                nombreCategoria={mapaCategorias[prod.categoriaId]}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
