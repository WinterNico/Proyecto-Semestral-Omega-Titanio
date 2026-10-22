import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { validarCorreo } from '../utils/validaciones.js';

export default function Login() {
  const { login } = useCart();
  const navigate = useNavigate();

  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!validarCorreo(correo)) {
      setError('Ingresa un correo válido (@duoc.cl, @profesor.duoc.cl o @gmail.com).');
      return;
    }
    if (password.length < 4 || password.length > 10) {
      setError('La contraseña debe tener entre 4 y 10 caracteres.');
      return;
    }

    const res = login(correo, password);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    navigate('/');
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-6 col-lg-5">
        <div className="card bg-secondary bg-opacity-10 border-secondary text-light p-4">
          <div className="text-center mb-4">
            <h1 className="h4 fw-bold text-success">Iniciar Sesión</h1>
            <p className="text-secondary small">
              Inicia sesión para autocompletar tus datos en el Checkout.
            </p>
          </div>

          {error && <div className="alert alert-danger py-2 small">{error}</div>}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label small">Correo Electrónico *</label>
              <input
                type="email"
                placeholder="pedro@duoc.cl / gamer.chile@gmail.com"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className="form-control bg-dark text-light border-secondary"
              />
            </div>

            <div className="mb-3">
              <label className="form-label small">Contraseña *</label>
              <input
                type="password"
                placeholder="Entre 4 y 10 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control bg-dark text-light border-secondary"
              />
            </div>

            <button type="submit" className="btn btn-success w-100 mb-3">
              Iniciar Sesión
            </button>

            <div className="p-2 border border-secondary rounded text-center mb-3">
              <small className="d-block text-secondary mb-2">
                Accesos rápidos de prueba (SEED):
              </small>
              <div className="d-flex justify-content-center gap-2">
                <button
                  type="button"
                  className="btn btn-sm btn-outline-info"
                  onClick={() => {
                    setCorreo('pedro@duoc.cl');
                    setPassword('admin123');
                  }}
                >
                  Pedro (pedro@duoc.cl)
                </button>
                <button
                  type="button"
                  className="btn btn-sm btn-outline-light"
                  onClick={() => {
                    setCorreo('gamer.chile@gmail.com');
                    setPassword('gamer123');
                  }}
                >
                  Cliente Gamer
                </button>
              </div>
            </div>

            <div className="text-center small">
              ¿No tienes cuenta?{' '}
              <Link to="/registro" className="text-success">
                Regístrate aquí
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
