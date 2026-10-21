import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';
import { calcularPrecioFinal, formatearCLP } from '../../utils/validaciones.js';

export default function ProductCard({ producto, nombreCategoria }) {
  const { addToCart } = useCart();
  const [agregado, setAgregado] = useState(false);

  const precioFinal = calcularPrecioFinal(producto);

  const handleAdd = () => {
    addToCart(producto, 1);
    setAgregado(true);
    setTimeout(() => setAgregado(false), 1200);
  };

  return (
    <div className="card h-100 bg-secondary bg-opacity-10 text-light border-secondary shadow-sm">
      <div className="position-relative">
        <img
          src={producto.imagen || '/assets/img/steamverde.jpg'}
          alt={producto.nombre}
          className="card-img-top"
          style={{ height: '170px', objectFit: 'cover' }}
        />
        {producto.oferta && producto.descuento > 0 && (
          <span className="badge bg-success position-absolute top-0 end-0 m-2">
            -{producto.descuento}%
          </span>
        )}
        {producto.stock <= 0 && (
          <span className="badge bg-danger position-absolute top-0 start-0 m-2">
            Sin Stock
          </span>
        )}
      </div>

      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold mb-1">{producto.nombre}</h5>
        {nombreCategoria && (
          <small className="text-info mb-2">{nombreCategoria}</small>
        )}
        <p className="card-text small text-secondary flex-grow-1">
          {producto.descripcion || 'Juego Digital - Clave Instantánea PC'}
        </p>

        <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top border-secondary">
          <div>
            {producto.oferta && producto.descuento > 0 && (
              <small className="text-secondary text-decoration-line-through d-block">
                {formatearCLP(producto.precio)}
              </small>
            )}
            <span className="fw-bold text-success fs-5">
              {formatearCLP(precioFinal)}
            </span>
          </div>

          <div className="d-flex gap-2">
            <Link
              to={`/juego/${producto.id}`}
              className="btn btn-sm btn-outline-light"
            >
              Detalle
            </Link>
            <button
              type="button"
              className="btn btn-sm btn-success"
              onClick={handleAdd}
              disabled={producto.stock <= 0}
            >
              {agregado ? '✓ Añadido' : 'Añadir'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
