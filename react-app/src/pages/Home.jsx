import { Link } from 'react-router-dom';
import { db } from '../data/db.js';
import { useCart } from '../context/CartContext.jsx';
import ProductCard from '../components/common/ProductCard.jsx';
import { calcularPrecioFinal, formatearCLP } from '../utils/validaciones.js';

export default function Home() {
  const { addToCart } = useCart();
  const productos = db.productos.obtenerTodos();
  const categorias = db.categorias.obtenerTodos();

  const destacado = productos[0];
  const mapaCategorias = Object.fromEntries(categorias.map((c) => [c.id, c.nombre]));

  return (
    <div>
      {/* Banner / Hero Principal (Figura 1 Anexo EP2) */}
      {destacado && (
        <section className="card bg-black text-light border-success shadow mb-5 overflow-hidden">
          <div className="row g-0 align-items-center">
            <div className="col-12 col-lg-6 p-4 p-lg-5">
              <span className="badge bg-success mb-2">NUEVO LANZAMIENTO DESTACADO</span>
              <h1 className="display-6 fw-bold text-success">{destacado.nombre}</h1>
              <p className="text-secondary mb-4">
                {destacado.descripcion ||
                  'Descubre los mejores videojuegos digitales al mejor precio en nuestra tienda.'}
              </p>

              <div className="d-flex align-items-center gap-3 mb-4">
                {destacado.oferta && destacado.descuento > 0 && (
                  <>
                    <span className="badge bg-warning text-dark">-{destacado.descuento}%</span>
                    <span className="text-secondary text-decoration-line-through">
                      {formatearCLP(destacado.precio)}
                    </span>
                  </>
                )}
                <span className="fs-3 fw-bold text-success">
                  {formatearCLP(calcularPrecioFinal(destacado))}
                </span>
              </div>

              <div className="d-flex gap-3 flex-wrap">
                <Link to={`/juego/${destacado.id}`} className="btn btn-success px-4">
                  Ver Detalle
                </Link>
                <button
                  type="button"
                  className="btn btn-outline-light px-4"
                  onClick={() => addToCart(destacado, 1)}
                >
                  Añadir al Carrito
                </button>
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <img
                src={destacado.imagen || '/assets/img/mhwilds2.jpg'}
                alt={destacado.nombre}
                className="img-fluid w-100"
                style={{ maxHeight: '360px', objectFit: 'cover' }}
              />
            </div>
          </div>
        </section>
      )}

      {/* Sección de Categorías (Figura 1 del Anexo EP2) */}
      <section className="mb-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h4 fw-bold text-success mb-0">Categorías</h2>
          <Link to="/categorias" className="text-success text-decoration-none small">
            Ver todas las categorías &rarr;
          </Link>
        </div>

        <div className="row g-3">
          {categorias.map((cat) => (
            <div className="col-6 col-md-3" key={cat.id}>
              <Link
                to={`/categorias?cat=${cat.id}`}
                className="card bg-secondary bg-opacity-10 text-light border-secondary text-decoration-none h-100 shadow-sm"
              >
                <img
                  src={cat.imagen || '/assets/img/steamverde.jpg'}
                  alt={cat.nombre}
                  className="card-img-top"
                  style={{ height: '110px', objectFit: 'cover' }}
                />
                <div className="card-body text-center py-2">
                  <h6 className="card-title mb-0 text-success fw-bold">{cat.nombre}</h6>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Tráiler Destacado */}
      <section className="mb-5">
        <h2 className="h4 fw-bold text-success mb-3">Tráiler del Mes</h2>
        <div className="ratio ratio-16x9 border border-secondary rounded overflow-hidden">
          <iframe
            src="https://www.youtube.com/embed/zPwK-h8RHWs"
            title="Tráiler destacado"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Juegos en Tendencia */}
      <section>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h4 fw-bold text-success mb-0">Juegos Destacados</h2>
          <Link to="/catalogo" className="text-success text-decoration-none small">
            Ver catálogo completo &rarr;
          </Link>
        </div>

        <div className="row g-4">
          {productos.slice(0, 4).map((prod) => (
            <div className="col-12 col-sm-6 col-lg-3" key={prod.id}>
              <ProductCard
                producto={prod}
                nombreCategoria={mapaCategorias[prod.categoriaId]}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
