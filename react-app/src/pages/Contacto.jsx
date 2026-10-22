import { useState } from 'react';
import { validarCorreo } from '../utils/validaciones.js';

export default function Contacto() {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [comentario, setComentario] = useState('');
  const [errores, setErrores] = useState({});
  const [exito, setExito] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = {};
    if (!nombre.trim()) err.nombre = 'El nombre es obligatorio.';
    if (!validarCorreo(correo)) {
      err.correo = 'Dominio no permitido. Usa @duoc.cl, @profesor.duoc.cl o @gmail.com';
    }
    if (!comentario.trim()) err.comentario = 'El comentario es obligatorio.';

    setErrores(err);
    if (Object.keys(err).length === 0) {
      setExito(true);
      setNombre('');
      setCorreo('');
      setComentario('');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-8 col-lg-6">
        <div className="card bg-secondary bg-opacity-10 border-secondary text-light p-4">
          <div className="text-center mb-4">
            <img src="/assets/img/logo.png" alt="Logo" width="55" height="55" className="mb-2" />
            <h1 className="h4 fw-bold text-success">Centro de Ayuda y Contacto</h1>
            <p className="text-secondary small">
              ¿Tienes dudas con un juego o tu cuenta? Envíanos un mensaje.
            </p>
          </div>

          {exito && (
            <div className="alert alert-success py-2 small text-center">
              ¡Mensaje enviado con éxito! Te responderemos a la brevedad.
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-3">
              <label className="form-label small">Nombre Completo *</label>
              <input
                type="text"
                maxLength="100"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className={`form-control bg-dark text-light border-secondary ${
                  errores.nombre ? 'is-invalid' : ''
                }`}
              />
              {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label small">Correo Electrónico *</label>
              <input
                type="email"
                maxLength="100"
                placeholder="ejemplo@duoc.cl / @gmail.com"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className={`form-control bg-dark text-light border-secondary ${
                  errores.correo ? 'is-invalid' : ''
                }`}
              />
              {errores.correo && <div className="invalid-feedback">{errores.correo}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label small">
                Comentario o Consulta * (Máx. 500 caracteres)
              </label>
              <textarea
                rows="4"
                maxLength="500"
                value={comentario}
                onChange={(e) => setComentario(e.target.value.slice(0, 500))}
                className={`form-control bg-dark text-light border-secondary ${
                  errores.comentario ? 'is-invalid' : ''
                }`}
              ></textarea>
              <div className="text-end small text-secondary mt-1">
                {comentario.length} / 500 caracteres
              </div>
              {errores.comentario && (
                <div className="text-danger small">{errores.comentario}</div>
              )}
            </div>

            <button type="submit" className="btn btn-success w-100">
              Enviar Mensaje
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
