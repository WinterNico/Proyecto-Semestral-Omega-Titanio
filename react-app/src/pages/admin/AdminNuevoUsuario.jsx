import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminNuevoUsuario = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        run: '', rol: '', nombre: '', apellidos: '', email: '', region: '', comuna: '', direccion: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Usuario a guardar:", formData);
        alert("¡Usuario registrado exitosamente!");
        navigate('/admin/usuarios');
    };

    return (
        <div className="form-container">
            <header className="d-flex justify-content-between align-items-center mb-4">
                <div className="topbar-title">
                    <h1 className="h3 mb-1">Registrar Usuario</h1>
                    <p className="text-muted mb-0">Asigna roles y credenciales de acceso.</p>
                </div>
                <Link to="/admin/usuarios" className="btn btn-secondary shadow-sm">
                    &larr; Volver al Listado
                </Link>
            </header>

            <div className="card shadow-sm border-0">
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit}>
                        
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label fw-bold">RUN *</label>
                                <input type="text" className="form-control" name="run" placeholder="Ej: 19011022K" required onChange={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-bold">Rol *</label>
                                <select className="form-select" name="rol" required onChange={handleChange}>
                                    <option value="">-- Selecciona un rol --</option>
                                    <option value="Administrador">Administrador</option>
                                    <option value="Vendedor">Vendedor</option>
                                    <option value="Cliente">Cliente</option>
                                </select>
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label fw-bold">Nombre *</label>
                                <input type="text" className="form-control" name="nombre" required onChange={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-bold">Apellidos *</label>
                                <input type="text" className="form-control" name="apellidos" required onChange={handleChange} />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Correo Electrónico *</label>
                            <input type="email" className="form-control" name="email" placeholder="@duoc.cl" required onChange={handleChange} />
                        </div>

                        <div className="row mb-4">
                            <div className="col-md-6">
                                <label className="form-label fw-bold">Región *</label>
                                <select className="form-select" name="region" required onChange={handleChange}>
                                    <option value="">-- Selecciona --</option>
                                    <option value="metropolitana">Región Metropolitana</option>
                                    <option value="nuble">Región de Ñuble</option>
                                </select>
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-bold">Comuna *</label>
                                <select className="form-select" name="comuna" required onChange={handleChange}>
                                    <option value="">-- Selecciona --</option>
                                    <option value="santiago">Santiago</option>
                                    <option value="linares">Linares</option>
                                </select>
                            </div>
                        </div>

                        <div className="d-flex justify-content-end gap-2 border-top pt-3">
                            <Link to="/admin/usuarios" className="btn btn-outline-secondary">Cancelar</Link>
                            <button type="submit" className="btn btn-primary px-4">Guardar Usuario</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminNuevoUsuario;