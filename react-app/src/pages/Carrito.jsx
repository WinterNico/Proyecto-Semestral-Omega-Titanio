import { Link, useNavigate } from 'react-router-dom';
import { db } from '../data/db.js';
import { useCart } from '../context/CartContext.jsx';
import {
  calcularPrecioFinal,
  formatearCLP,
  formatearMontoBoleta,
} from '../utils/validaciones.js';

export default function Carrito() {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalPrice,
  } = useCart();
  const navigate = useNavigate();
  const catalogo = db.productos.obtenerTodos();

  return (
    <div>
      <h1 className="h3 fw-bold text-success mb-4">Carrito de Compras</h1>

      <div className="row g-4">
        {/* Columna izquierda: Lista rápida de productos (Figura 5 Anexo EP2) */}
        <div className="col-12 col-lg-5">
          <div className="card bg-secondary bg-opacity-10 border-secondary text-light p-3 h-100">
            <h2 className="h5 fw-bold text-success mb-3">Lista de productos</h2>
            <div className="row g-3">
              {catalogo.map((prod) => (
                <div className="col-6" key={prod.id}>
                  <div className="card bg-dark border-secondary text-light h-100">
                    <img
                      src={prod.imagen || '/assets/img/steamverde.jpg'}
                      alt={prod.nombre}
                      className="card-img-top"
                      style={{ height: '90px', objectFit: 'cover' }}
                    />
                    <div className="card-body p-2 d-flex flex-column">
                      <strong className="small mb-1">{prod.nombre}</strong>
                      <span className="text-success fw-bold small mb-2">
                        {formatearCLP(calcularPrecioFinal(prod))}
                      </span>
                      <button
                        type="button"
                        className="btn btn-sm btn-dark border-secondary mt-auto"
                        onClick={() => addToCart(prod, 1)}
                        disabled={prod.stock <= 0}
                      >
                        Añadir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Columna derecha: Tabla del Carrito de Compras (Figura 5 Anexo EP2) */}
        <div className="col-12 col-lg-7">
          <div className="card bg-secondary bg-opacity-10 border-secondary text-light p-3">
            <h2 className="h5 fw-bold text-success mb-3">Carrito de Compras</h2>

            {cart.length === 0 ? (
              <div className="text-center py-5">
                <p className="text-secondary mb-3">
                  Tu carrito está vacío. Añade juegos desde la lista o el catálogo.
                </p>
                <Link to="/catalogo" className="btn btn-success">
                  Ir al Catálogo
                </Link>
              </div>
            ) : (
              <>
                <div className="table-responsive">
                  <table className="table table-dark table-hover align-middle">
                    <thead>
                      <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Cantidad</th>
                        <th>Subtotal</th>
                        <th>Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cart.map((item) => {
                        const unitario = calcularPrecioFinal(item);
                        const subtotal = unitario * item.quantity;
                        return (
                          <tr key={item.id}>
                            <td>
                              <img
                                src={item.imagen || '/assets/img/steamverde.jpg'}
                                alt={item.nombre}
                                width="55"
                                height="38"
                                style={{ objectFit: 'cover' }}
                              />
                            </td>
                            <td className="fw-semibold">{item.nombre}</td>
                            <td>{formatearMontoBoleta(unitario)}</td>
                            <td>
                              <div className="d-flex align-items-center gap-1">
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-secondary px-2 py-0"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                >
                                  -
                                </button>
                                <span className="px-2">{item.quantity}</span>
                                <button
                                  type="button"
                                  className="btn btn-sm btn-outline-secondary px-2 py-0"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                >
                                  +
                                </button>
                              </div>
                            </td>
                            <td className="fw-bold text-success">
                              {formatearMontoBoleta(subtotal)}
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-sm btn-danger"
                                onClick={() => removeFromCart(item.id)}
                              >
                                Eliminar
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="d-flex justify-content-end align-items-center gap-3 mt-3 pt-3 border-top border-secondary flex-wrap">
                  <h4 className="mb-0 me-auto text-success fw-bold">
                    Total: {formatearMontoBoleta(totalPrice)}
                  </h4>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={clearCart}
                  >
                    Limpiar
                  </button>
                  <button
                    type="button"
                    className="btn btn-success px-4"
                    onClick={() => navigate('/checkout')}
                  >
                    Comprar ahora
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
