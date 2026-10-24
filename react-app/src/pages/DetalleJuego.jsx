import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { db } from '../data/db.js';
import { useCart } from '../context/CartContext.jsx';
import { calcularPrecioFinal, formatearCLP } from '../utils/validaciones.js';

export default function DetalleJuego() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const producto = db.productos.obtenerPorId(id);
  const categorias = db.categorias.obtenerTodos();
  const [cantidad, setCantidad] = useState(1);
  const [capturaActiva, setCapturaActiva] = useState(null);
  const [confirmacion, setConfirmacion] = useState('');

  if (!producto) {
    return (
      <div className="card bg-secondary bg-opacity-10 border-danger text-light p-5 text-center">
        <h2 className="text-danger mb-3">Juego no encontrado (ID #{id})</h2>
        <p className="text-secondary mb-4">
          El producto solicitado no existe en la base de datos o fue eliminado.
        </p>
        <div>
          <Link to="/catalogo" className="btn btn-success">
            &larr; Volver al Catálogo
          </Link>
        </div>
      </div>
    );
  }

  const categoriaObj = categorias.find((c) => String(c.id) === String(producto.categoriaId));
  const precioFinal = calcularPrecioFinal(producto);
  const relacionados = db.productos
    .obtenerTodos()
    .filter((p) => String(p.id) !== String(producto.id))
    .slice(0, 4);

  const handleAgregar = (e) => {
    e.preventDefault();
    addToCart(producto, cantidad);
    setConfirmacion(`¡Se añadieron ${cantidad} unidad(es) de ${producto.nombre} al carrito!`);
  };

  return (
    <div>
      <nav aria-label="breadcrumb" className="mb-3">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/" className="text-success text-decoration-none">Inicio</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to="/catalogo" className="text-success text-decoration-none">Catálogo</Link>
          </li>
          <li className="breadcrumb-item active text-light" aria-current="page">
            {producto.nombre}
          </li>
        </ol>
      </nav>

      <div className="row g-4 mb-5">
        {/* Multimedia */}
        <div className="col-12 col-lg-7">
          <div className="border border-secondary rounded overflow-hidden bg-black mb-3">
            {capturaActiva ? (
              <img
                src={capturaActiva}
                alt={producto.nombre}
                className="w-100"
                style={{ height: '380px', objectFit: 'cover' }}
              />
            ) : producto.trailer ? (
              <iframe
                width="100%"
                height="380"
                src={producto.trailer}
                title={producto.nombre}
                allowFullScreen
              ></iframe>
            ) : (
              <img
                src={producto.imagen || '/assets/img/steamverde.jpg'}
                alt={producto.nombre}
                className="w-100"
                style={{ height: '380px', objectFit: 'cover' }}
              />
            )}
          </div>

          <div className="d-flex gap-2 overflow-auto pb-2">
            {producto.trailer && (
              <button
                type="button"
                className={`btn btn-sm ${!capturaActiva ? 'btn-success' : 'btn-outline-light'}`}
                onClick={() => setCapturaActiva(null)}
              >
                ▶ Tráiler
              </button>
            )}
            {(producto.capturas || [producto.imagen]).map((imgUrl, index) => (
              <img
                key={index}
                src={imgUrl}
                alt={`Vista ${index + 1}`}
                width="110"
                height="65"
                style={{
                  objectFit: 'cover',
                  cursor: 'pointer',
                  border: capturaActiva === imgUrl ? '2px solid #25d366' : '1px solid #444',
                }}
                onClick={() => setCapturaActiva(imgUrl)}
              />
            ))}
          </div>
        </div>

        {/* Panel de compra */}
        <div className="col-12 col-lg-5">
          <div className="card bg-secondary bg-opacity-10 border-secondary text-light p-4 h-100">
            <div className="mb-2">
              <span className="badge bg-info text-dark me-2">
                {categoriaObj ? categoriaObj.nombre : 'Juego Digital'}
              </span>
              {producto.oferta && producto.descuento > 0 && (
                <span className="badge bg-success">Oferta -{producto.descuento}%</span>
              )}
            </div>

            <h1 className="h3 fw-bold text-success mb-3">{producto.nombre}</h1>
            <p className="text-secondary mb-4">
              {producto.descripcion ||
                'Incluye licencia digital oficial activable en PC y soporte completo.'}
            </p>

            <div className="p-3 bg-black border border-secondary rounded mb-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <span className="text-secondary">Precio Digital:</span>
                <div>
                  {producto.oferta && producto.descuento > 0 && (
                    <small className="text-secondary text-decoration-line-through me-2">
                      {formatearCLP(producto.precio)}
                    </small>
                  )}
                  <span className="fs-4 fw-bold text-success">
                    {formatearCLP(precioFinal)}
                  </span>
                </div>
              </div>

              <small className="d-block text-secondary mb-3">
                Stock disponible: <strong className="text-light">{producto.stock} unidades</strong>
              </small>

              <form onSubmit={handleAgregar} className="d-flex gap-2">
                <input
                  type="number"
                  min="1"
                  max={Math.max(1, producto.stock)}
                  value={cantidad}
                  onChange={(e) => setCantidad(Math.max(1, Number(e.target.value)))}
                  className="form-control bg-dark text-light border-secondary"
                  style={{ width: '90px' }}
                />
                <button
                  type="submit"
                  className="btn btn-success flex-grow-1"
                  disabled={producto.stock <= 0}
                >
                  {producto.stock > 0 ? 'Añadir al Carrito' : 'Agotado'}
                </button>
              </form>

              {confirmacion && (
                <div className="alert alert-success py-2 px-3 mt-3 mb-0 small">
                  {confirmacion}{' '}
                  <Link to="/carrito" className="fw-bold text-dark ms-1">
                    Ir al carrito &rarr;
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Juegos relacionados */}
      <section>
        <h3 className="h5 fw-bold text-success mb-3">Productos Relacionados</h3>
        <div className="row g-3">
          {relacionados.map((rel) => (
            <div className="col-6 col-md-3" key={rel.id}>
              <ProductCard producto={rel} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
