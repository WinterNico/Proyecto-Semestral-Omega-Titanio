import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import {
  REGIONES_COMUNAS,
  calcularPrecioFinal,
  formatearMontoBoleta,
  validarCorreo,
} from '../utils/validaciones.js';

export default function Checkout() {
  const { cart, totalPrice, user, lastOrder, registrarCompra } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nombre: '',
    apellidos: '',
    correo: '',
    calle: '',
    departamento: '',
    region: 'Región Metropolitana de Santiago',
    comuna: 'Cerrillos',
    indicaciones: '',
  });

  const [errores, setErrores] = useState({});
  const [simularFallo, setSimularFallo] = useState(false);

  // Nota Anexo EP2 pág. 6: "Si el usuario ha iniciado sesión toda esta información se añadirá de forma automática."
  useEffect(() => {
    if (user) {
      setForm((prev) => ({
        ...prev,
        nombre: user.nombre || prev.nombre,
        apellidos: user.apellidos || prev.apellidos,
        correo: user.correo || user.email || prev.correo,
        calle: user.calle || prev.calle,
        departamento: user.departamento || prev.departamento,
        region: user.region || 'Región Metropolitana de Santiago',
        comuna: user.comuna || 'Cerrillos',
      }));
    } else if (lastOrder && lastOrder.estado === 'FALLIDO' && lastOrder.cliente) {
      setForm((prev) => ({
        ...prev,
        ...lastOrder.cliente,
      }));
    }
  }, [user, lastOrder]);

  const regionObj =
    REGIONES_COMUNAS.find((r) => r.nombre === form.region) || REGIONES_COMUNAS[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'region') {
      const reg = REGIONES_COMUNAS.find((r) => r.nombre === value);
      setForm((prev) => ({
        ...prev,
        region: value,
        comuna: reg ? reg.comunas[0] : '',
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = {};
    if (!form.nombre.trim()) err.nombre = 'El nombre es obligatorio.';
    if (!form.apellidos.trim()) err.apellidos = 'Los apellidos son obligatorios.';
    if (!validarCorreo(form.correo)) {
      err.correo = 'Usa un correo válido (@duoc.cl, @profesor.duoc.cl o @gmail.com).';
    }
    if (!form.calle.trim()) err.calle = 'Ingresa la calle y número.';

    setErrores(err);
    if (Object.keys(err).length > 0) return;

    const orden = registrarCompra(form, simularFallo);
    if (orden.estado === 'FALLIDO') {
      navigate('/pago-fallido');
    } else {
      navigate('/compra-exitosa');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="card bg-secondary bg-opacity-10 border-secondary text-light p-5 text-center">
        <h3>Tu carrito está vacío</h3>
        <p className="text-secondary">Agrega productos antes de pasar al Checkout.</p>
        <div>
          <Link to="/catalogo" className="btn btn-success">
            Explorar Catálogo
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-secondary bg-opacity-10 border-secondary text-light p-4">
      <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4 pb-3 border-bottom border-secondary">
        <div>
          <h1 className="h4 fw-bold mb-1">Carrito de compra</h1>
          <p className="text-secondary small mb-0">
            Completa la siguiente información
            {user && (
              <span className="badge bg-success ms-2">
                ✓ Datos autocompletados con la sesión de {user.correo}
              </span>
            )}
          </p>
        </div>
        <div className="badge bg-primary fs-6 px-3 py-2">
          Total a pagar: {formatearMontoBoleta(totalPrice)}
        </div>
      </div>

      {/* Tabla de resumen (Figura 6) */}
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
            {cart.map((item) => {
              const unitario = calcularPrecioFinal(item);
              return (
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
                  <td>{formatearMontoBoleta(unitario)}</td>
                  <td>{item.quantity}</td>
                  <td className="fw-bold">{formatearMontoBoleta(unitario * item.quantity)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <h2 className="h5 fw-bold mb-1">Información del cliente</h2>
        <p className="text-secondary small mb-3">Completa la siguiente información</p>

        <div className="row g-3 mb-4">
          <div className="col-12 col-md-6">
            <label className="form-label small">Nombre*</label>
            <input
              type="text"
              name="nombre"
              value={form.nombre}
              onChange={handleChange}
              className={`form-control bg-dark text-light border-secondary ${
                errores.nombre ? 'is-invalid' : ''
              }`}
            />
            {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label small">Apellidos*</label>
            <input
              type="text"
              name="apellidos"
              value={form.apellidos}
              onChange={handleChange}
              className={`form-control bg-dark text-light border-secondary ${
                errores.apellidos ? 'is-invalid' : ''
              }`}
            />
            {errores.apellidos && <div className="invalid-feedback">{errores.apellidos}</div>}
          </div>

          <div className="col-12">
            <label className="form-label small">Correo*</label>
            <input
              type="email"
              name="correo"
              value={form.correo}
              onChange={handleChange}
              className={`form-control bg-dark text-light border-secondary ${
                errores.correo ? 'is-invalid' : ''
              }`}
            />
            {errores.correo && <div className="invalid-feedback">{errores.correo}</div>}
          </div>
        </div>

        <h2 className="h5 fw-bold mb-1">Dirección de entrega de los productos</h2>
        <p className="text-secondary small mb-3">Ingrese dirección de forma detallada</p>

        <div className="row g-3 mb-4">
          <div className="col-12 col-md-8">
            <label className="form-label small">Calle*</label>
            <input
              type="text"
              name="calle"
              value={form.calle}
              onChange={handleChange}
              className={`form-control bg-dark text-light border-secondary ${
                errores.calle ? 'is-invalid' : ''
              }`}
            />
            {errores.calle && <div className="invalid-feedback">{errores.calle}</div>}
          </div>

          <div className="col-12 col-md-4">
            <label className="form-label small">Departamento (opcional)</label>
            <input
              type="text"
              name="departamento"
              placeholder="Ej: 603"
              value={form.departamento}
              onChange={handleChange}
              className="form-control bg-dark text-light border-secondary"
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label small">Región*</label>
            <select
              name="region"
              value={form.region}
              onChange={handleChange}
              className="form-select bg-dark text-light border-secondary"
            >
              {REGIONES_COMUNAS.map((r) => (
                <option key={r.nombre} value={r.nombre}>
                  {r.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label small">Comuna*</label>
            <select
              name="comuna"
              value={form.comuna}
              onChange={handleChange}
              className="form-select bg-dark text-light border-secondary"
            >
              {regionObj.comunas.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12">
            <label className="form-label small">Indicaciones para la entrega (opcional)</label>
            <textarea
              name="indicaciones"
              rows="2"
              placeholder="Ej: Entre calles, color del edificio, no tiene timbre"
              value={form.indicaciones}
              onChange={handleChange}
              className="form-control bg-dark text-light border-secondary"
            ></textarea>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 pt-3 border-top border-secondary">
          <div className="form-check">
            <input
              type="checkbox"
              id="simularErrorPago"
              className="form-check-input"
              checked={simularFallo}
              onChange={(e) => setSimularFallo(e.target.checked)}
            />
            <label htmlFor="simularErrorPago" className="form-check-label small text-warning">
              Simular error en el pago (para demostrar vista Figura 8 en presentación)
            </label>
          </div>

          <button type="submit" className="btn btn-success px-4 ms-auto">
            Pagar ahora {formatearMontoBoleta(totalPrice)}
          </button>
        </div>
      </form>
    </div>
  );
}
