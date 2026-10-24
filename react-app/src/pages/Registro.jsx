import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import {
  REGIONES_COMUNAS,
  validarCorreo,
  validarRun,
} from '../utils/validaciones.js';

export default function Registro() {
  const { registerUser } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    run: '',
    nombre: '',
    apellidos: '',
    correo: '',
    password: '',
    confirmPassword: '',
    region: 'Región Metropolitana de Santiago',
    comuna: 'Santiago',
    calle: '',
    departamento: '',
  });

  const [errores, setErrores] = useState({});
  const [errorGeneral, setErrorGeneral] = useState('');

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
    setErrorGeneral('');

    if (!validarRun(form.run)) {
      err.run = 'RUN inválido (7 a 9 caracteres sin puntos ni guión, ej: 19011022K).';
    }
    if (!form.nombre.trim()) err.nombre = 'Ingresa tu nombre.';
    if (!form.apellidos.trim()) err.apellidos = 'Ingresa tus apellidos.';
    if (!validarCorreo(form.correo)) {
      err.correo = 'Usa @duoc.cl, @profesor.duoc.cl o @gmail.com.';
    }
    if (form.password.length < 4 || form.password.length > 10) {
      err.password = 'La contraseña debe tener entre 4 y 10 caracteres.';
    }
    if (form.password !== form.confirmPassword) {
      err.confirmPassword = 'Las contraseñas no coinciden.';
    }
    if (!form.calle.trim()) err.calle = 'Ingresa tu dirección.';

    setErrores(err);
    if (Object.keys(err).length > 0) return;

    const res = registerUser(form);
    if (!res.ok) {
      setErrorGeneral(res.error);
      return;
    }
    navigate('/');
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-lg-8">
        <div className="card bg-secondary bg-opacity-10 border-secondary text-light p-4">
          <h1 className="h4 fw-bold text-success text-center mb-4">
            Registro de Usuario
          </h1>

          {errorGeneral && (
            <div className="alert alert-danger py-2 small">{errorGeneral}</div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="row g-3">
              <div className="col-12 col-md-6">
                <label className="form-label small">RUN (Sin puntos ni guión) *</label>
                <input
                  type="text"
                  name="run"
                  placeholder="Ej: 19011022K"
                  value={form.run}
                  onChange={handleChange}
                  className={`form-control bg-dark text-light border-secondary ${
                    errores.run ? 'is-invalid' : ''
                  }`}
                />
                {errores.run && <div className="invalid-feedback">{errores.run}</div>}
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label small">Correo Electrónico *</label>
                <input
                  type="email"
                  name="correo"
                  placeholder="ejemplo@duoc.cl / @gmail.com"
                  value={form.correo}
                  onChange={handleChange}
                  className={`form-control bg-dark text-light border-secondary ${
                    errores.correo ? 'is-invalid' : ''
                  }`}
                />
                {errores.correo && <div className="invalid-feedback">{errores.correo}</div>}
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label small">Nombre *</label>
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
                <label className="form-label small">Apellidos *</label>
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

              <div className="col-12 col-md-6">
                <label className="form-label small">Contraseña *</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className={`form-control bg-dark text-light border-secondary ${
                    errores.password ? 'is-invalid' : ''
                  }`}
                />
                {errores.password && <div className="invalid-feedback">{errores.password}</div>}
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label small">Confirmar Contraseña *</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  className={`form-control bg-dark text-light border-secondary ${
                    errores.confirmPassword ? 'is-invalid' : ''
                  }`}
                />
                {errores.confirmPassword && (
                  <div className="invalid-feedback">{errores.confirmPassword}</div>
                )}
              </div>

              <div className="col-12 col-md-6">
                <label className="form-label small">Región *</label>
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
                <label className="form-label small">Comuna *</label>
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

              <div className="col-12 col-md-8">
                <label className="form-label small">Calle y Número *</label>
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
                  value={form.departamento}
                  onChange={handleChange}
                  className="form-control bg-dark text-light border-secondary"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-success w-100 mt-4">
              Registrar Cuenta
            </button>

            <div className="text-center small mt-3">
              ¿Ya tienes cuenta?{' '}
              <Link to="/login" className="text-success">
                Inicia sesión
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
