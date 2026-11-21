import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { apiFetch } from '../../services/http.js';
import { validarRun, validarCorreo, REGIONES_COMUNAS } from '../../utils/validaciones.js';

const AdminNuevoUsuario = () => {
  const navigate = useNavigate();
  const { run } = useParams();
  const esEdicion = !!run;

  const [usuarioId, setUsuarioId] = useState(null);
  const [formData, setFormData] = useState({
    run: '',
    rol: 'cliente',
    nombre: '',
    apellidos: '',
    correo: '',
    password: '',
    region: '',
    comuna: '',
    calle: '',
    departamento: '',
  });
  const [cargando, setCargando] = useState(esEdicion);
  const [guardando, setGuardando] = useState(false);
  const [errores, setErrores] = useState({});
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    if (!esEdicion) return;

    apiFetch(`/usuarios/run/${encodeURIComponent(run)}`)
      .then((usuario) => {
        setUsuarioId(usuario.id);
        setFormData({
          run: usuario.run || '',
          rol: usuario.rol || 'cliente',
          nombre: usuario.nombre || '',
          apellidos: usuario.apellidos || '',
          correo: usuario.correo || '',
          password: '',
          region: usuario.region || '',
          comuna: usuario.comuna || '',
          calle: usuario.calle || '',
          departamento: usuario.departamento || '',
        });
      })
      .catch((e) => {
        setErrores({ submit: e.message || 'Usuario no encontrado.' });
      })
      .finally(() => setCargando(false));
  }, [esEdicion, run]);

  const regionObj = REGIONES_COMUNAS.find((r) => r.nombre === formData.region);
  const comunas = regionObj ? regionObj.comunas : [];

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'region') {
      setFormData((prev) => ({ ...prev, region: value, comuna: '' }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validarFormulario = () => {
    const nuevosErrores = {};
    if (!formData.run.trim()) nuevosErrores.run = 'RUN es obligatorio';
    else if (!validarRun(formData.run)) nuevosErrores.run = 'RUN inválido (formato: 12345678K)';
    if (!formData.rol) nuevosErrores.rol = 'Rol es obligatorio';
    if (!formData.nombre.trim()) nuevosErrores.nombre = 'Nombre es obligatorio';
    if (!formData.apellidos.trim()) nuevosErrores.apellidos = 'Apellidos son obligatorios';
    if (!formData.correo.trim()) nuevosErrores.correo = 'Correo es obligatorio';
    else if (!validarCorreo(formData.correo)) {
      nuevosErrores.correo =
        'Correo inválido (debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com)';
    }
    if (!esEdicion && !formData.password.trim()) {
      nuevosErrores.password = 'Contraseña es obligatoria';
    } else if (formData.password && formData.password.length < 4) {
      nuevosErrores.password = 'Contraseña muy corta (mín 4 caracteres)';
    }
    if (!formData.region) nuevosErrores.region = 'Región es obligatoria';
    if (!formData.comuna) nuevosErrores.comuna = 'Comuna es obligatoria';
    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    const usuarioData = {
      run: formData.run.trim().toUpperCase(),
      rol: formData.rol.toLowerCase(),
      nombre: formData.nombre.trim(),
      apellidos: formData.apellidos.trim(),
      correo: formData.correo.trim().toLowerCase(),
      region: formData.region,
      comuna: formData.comuna,
      calle: formData.calle.trim(),
      departamento: formData.departamento.trim(),
    };

    if (!esEdicion || formData.password.trim()) {
      usuarioData.password = formData.password;
    }

    try {
      setGuardando(true);
      setErrores({});
      if (esEdicion) {
        await apiFetch(`/usuarios/${usuarioId}`, { method: 'PUT', body: usuarioData });
        setMensaje('¡Usuario actualizado exitosamente!');
      } else {
        await apiFetch('/usuarios', { method: 'POST', body: usuarioData });
        setMensaje('¡Usuario creado exitosamente!');
      }
      setTimeout(() => navigate('/admin/usuarios'), 1200);
    } catch (e) {
      setErrores({ submit: e.message || 'Error al guardar el usuario.' });
    } finally {
      setGuardando(false);
    }
  };

  if (cargando) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-success" role="status" />
      </div>
    );
  }

  return (
    <div className="form-container">
      <header className="d-flex justify-content-between align-items-center mb-4">
        <div className="topbar-title">
          <h1 className="h3 mb-1">{esEdicion ? 'Editar Usuario' : 'Registrar Usuario'}</h1>
          <p className="text-muted mb-0">Asigna roles y credenciales de acceso.</p>
        </div>
        <Link to="/admin/usuarios" className="btn btn-secondary shadow-sm">
          &larr; Volver al Listado
        </Link>
      </header>

      {mensaje && (
        <div className="alert alert-success alert-dismissible fade show mb-3" role="alert">
          {mensaje}
        </div>
      )}

      <div className="card bg-black text-light border-secondary shadow-sm">
        <div className="card-body p-4">
          <form onSubmit={handleSubmit} noValidate>
            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-bold">RUN *</label>
                <input
                  type="text"
                  className={`form-control bg-dark text-light border-secondary ${errores.run ? 'is-invalid' : ''}`}
                  name="run"
                  placeholder="Ej: 19011022K"
                  required
                  onChange={handleChange}
                  value={formData.run}
                  disabled={esEdicion}
                />
                {errores.run && <div className="invalid-feedback">{errores.run}</div>}
                {esEdicion && (
                  <div className="form-text text-muted">El RUN no se puede modificar en edición</div>
                )}
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">Rol *</label>
                <select
                  className={`form-select bg-dark text-light border-secondary ${errores.rol ? 'is-invalid' : ''}`}
                  name="rol"
                  required
                  onChange={handleChange}
                  value={formData.rol}
                >
                  <option value="">-- Selecciona un rol --</option>
                  <option value="admin">Administrador</option>
                  <option value="vendedor">Vendedor</option>
                  <option value="cliente">Cliente</option>
                </select>
                {errores.rol && <div className="invalid-feedback">{errores.rol}</div>}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-bold">Nombre *</label>
                <input
                  type="text"
                  className={`form-control bg-dark text-light border-secondary ${errores.nombre ? 'is-invalid' : ''}`}
                  name="nombre"
                  required
                  onChange={handleChange}
                  value={formData.nombre}
                />
                {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">Apellidos *</label>
                <input
                  type="text"
                  className={`form-control bg-dark text-light border-secondary ${errores.apellidos ? 'is-invalid' : ''}`}
                  name="apellidos"
                  required
                  onChange={handleChange}
                  value={formData.apellidos}
                />
                {errores.apellidos && <div className="invalid-feedback">{errores.apellidos}</div>}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">Correo Electrónico *</label>
              <input
                type="email"
                className={`form-control bg-dark text-light border-secondary ${errores.correo ? 'is-invalid' : ''}`}
                name="correo"
                placeholder="@duoc.cl"
                required
                onChange={handleChange}
                value={formData.correo}
              />
              {errores.correo && <div className="invalid-feedback">{errores.correo}</div>}
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold">
                {esEdicion ? 'Nueva Contraseña (opcional)' : 'Contraseña *'}
              </label>
              <input
                type="password"
                className={`form-control bg-dark text-light border-secondary ${errores.password ? 'is-invalid' : ''}`}
                name="password"
                placeholder={esEdicion ? 'Dejar vacío para no cambiar' : 'Mínimo 4 caracteres'}
                onChange={handleChange}
                value={formData.password}
                required={!esEdicion}
              />
              {errores.password && <div className="invalid-feedback">{errores.password}</div>}
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label className="form-label fw-bold">Región *</label>
                <select
                  className={`form-select bg-dark text-light border-secondary ${errores.region ? 'is-invalid' : ''}`}
                  name="region"
                  required
                  onChange={handleChange}
                  value={formData.region}
                >
                  <option value="">-- Selecciona una región --</option>
                  {REGIONES_COMUNAS.map((region) => (
                    <option key={region.nombre} value={region.nombre}>
                      {region.nombre}
                    </option>
                  ))}
                </select>
                {errores.region && <div className="invalid-feedback">{errores.region}</div>}
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">Comuna *</label>
                <select
                  className={`form-select bg-dark text-light border-secondary ${errores.comuna ? 'is-invalid' : ''}`}
                  name="comuna"
                  required
                  onChange={handleChange}
                  value={formData.comuna}
                >
                  <option value="">-- Selecciona una comuna --</option>
                  {comunas.map((comuna) => (
                    <option key={comuna} value={comuna}>
                      {comuna}
                    </option>
                  ))}
                </select>
                {errores.comuna && <div className="invalid-feedback">{errores.comuna}</div>}
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-6">
                <label className="form-label fw-bold">Calle</label>
                <input
                  type="text"
                  className="form-control bg-dark text-light border-secondary"
                  name="calle"
                  placeholder="Ej: Los Crisantemos, Edificio Norte"
                  onChange={handleChange}
                  value={formData.calle}
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-bold">Depto / Casa</label>
                <input
                  type="text"
                  className="form-control bg-dark text-light border-secondary"
                  name="departamento"
                  placeholder="Ej: Depto 603"
                  onChange={handleChange}
                  value={formData.departamento}
                />
              </div>
            </div>

            {errores.submit && <div className="alert alert-danger mb-3">{errores.submit}</div>}

            <div className="d-flex justify-content-end gap-2 border-top pt-3">
              <Link to="/admin/usuarios" className="btn btn-outline-secondary">
                Cancelar
              </Link>
              <button type="submit" className="btn btn-success px-4" disabled={guardando}>
                {guardando ? 'Guardando...' : esEdicion ? 'Actualizar Usuario' : 'Guardar Usuario'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminNuevoUsuario;
