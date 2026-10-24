import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { formatearMontoBoleta } from '../utils/validaciones.js';

export default function PagoFallido() {
  const { lastOrder } = useCart();
  const navigate = useNavigate();

  if (!lastOrder) {
    return (
      <div className="card bg-secondary bg-opacity-10 border-secondary text-light p-5 text-center">
        <h3>No hay intentos de pago registrados</h3>
        <Link to="/carrito" className="btn btn-success mt-3">
          Volver al Carrito
        </Link>
      </div>
    );
  }

  const { cliente, items, total, nroOrden } = lastOrder;

  return (
    <div className="card bg-secondary bg-opacity-10 border-danger text-light p-4">
      <div className="text-center pb-4 mb-4 border-bottom border-secondary">
        <h1 className="h4 fw-bold text-danger mb-1">
          ❌ No se pudo realizar el pago. nro #{nroOrden}
        </h1>
        <p className="text-secondary small mb-3">Detalle de compra</p>
        <button
          type="button"
          className="btn btn-success px-4"
          onClick={() => navigate('/checkout')}
        >
          VOLVER A REALIZAR EL PAGO
        </button>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-12 col-md-4">
          <label className="form-label small">Nombre*</label>
          <input
            type="text"
            className="form-control bg-dark text-light border-secondary"
            value={cliente.nombre}
            readOnly
          />
        </div>
        <div className="col-12 col-md-4">
          <label className="form-label small">Apellidos*</label>
          <input
            type="text"
            className="form-control bg-dark text-light border-secondary"
            value={cliente.apellidos}
            readOnly
          />
        </div>
        <div className="col-12 col-md-4">
          <label className="form-label small">Correo*</label>
          <input
            type="email"
            className="form-control bg-dark text-light border-secondary"
            value={cliente.correo}
            readOnly
          />
        </div>
      </div>

      <h2 className="h6 fw-bold mb-3">Dirección de entrega de los productos</h2>
      <div className="row g-3 mb-4">
        <div className="col-12 col-md-8">
          <label className="form-label small">Calle*</label>
          <input
            type="text"
            className="form-control bg-dark text-light border-secondary"
            value={cliente.calle}
            readOnly
          />
        </div>
        <div className="col-12 col-md-4">
          <label className="form-label small">Departamento (opcional)</label>
          <input
            type="text"
            className="form-control bg-dark text-light border-secondary"
            value={cliente.departamento || ''}
            readOnly
          />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label small">Región*</label>
          <input
            type="text"
            className="form-control bg-dark text-light border-secondary"
            value={cliente.region}
            readOnly
          />
        </div>
        <div className="col-12 col-md-6">
          <label className="form-label small">Comuna*</label>
          <input
            type="text"
            className="form-control bg-dark text-light border-secondary"
            value={cliente.comuna}
            readOnly
          />
        </div>
      </div>

      <div className="table-responsive mb-4">
        <table className="table table-dark align-middle">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>
                  <img
                    src={item.imagen || '/assets/img/steamverde.jpg'}
                    alt={item.nombre}
                    width="50"
                    height="35"
                    style={{ objectFit: 'cover' }}
                  />
                </td>
                <td>{item.nombre}</td>
                <td>{formatearMontoBoleta(item.precioUnitario)}</td>
                <td>{item.quantity}</td>
                <td className="fw-bold">{formatearMontoBoleta(item.subtotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 className="h4 text-center fw-bold text-danger mb-0">
        Total pagado: {formatearMontoBoleta(total)}
      </h3>
    </div>
  );
}
