import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminNuevoProducto = () => {
    const navigate = useNavigate(); // Nos permite redireccionar después de guardar

    // Estado para guardar todos los datos del formulario
    const [formData, setFormData] = useState({
        codigo: '', nombre: '', descripcion: '', precio: '', categoria: '', stock: '', stockCritico: ''
    });

    // Función que actualiza el estado cada vez que escribes en un input
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Evita que la página se recargue al enviar el formulario
        console.log("Datos a guardar:", formData);
        alert("¡Producto guardado exitosamente!");
        // Aquí después llamarías a la base de datos para guardar de verdad
        navigate('/admin/productos'); // Volvemos a la tabla
    };

    return (
        <div className="form-container">
            <header className="d-flex justify-content-between align-items-center mb-4">
                <div className="topbar-title">
                    <h1 className="h3 mb-1">Registrar Nuevo Producto</h1>
                    <p className="text-muted mb-0">Ingresa la información técnica, precios e inventario del videojuego.</p>
                </div>
                <Link to="/admin/productos" className="btn btn-secondary shadow-sm">
                    &larr; Volver al Listado
                </Link>
            </header>

            <div className="card bg-black text-light border-secondary shadow-sm">
                <div className="card-body p-4">
                    <form onSubmit={handleSubmit} className="form-standard">
                        
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label fw-bold">Código de Producto *</label>
                                <input type="text" className="form-control bg-dark text-light border-secondary" name="codigo" placeholder="Ej: GAME-101" minLength="3" required onChange={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-bold">Nombre del Producto *</label>
                                <input type="text" className="form-control bg-dark text-light border-secondary" name="nombre" placeholder="Ej: Monster Hunter Wilds" maxLength="100" required onChange={handleChange} />
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Descripción del Juego</label>
                            <textarea className="form-control" name="descripcion" rows="3" placeholder="Resumen del argumento..." maxLength="500" onChange={handleChange}></textarea>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label fw-bold">Precio ($ CLP) *</label>
                                <input type="number" className="form-control bg-dark text-light border-secondary" name="precio" placeholder="Ej: 39990" min="0" required onChange={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-bold">Categoría *</label>
                                <select className="form-select bg-dark text-light border-secondary" name="categoria" required onChange={handleChange}>
                                    <option value="">-- Selecciona una categoría --</option>
                                    <option value="accion">Acción / Aventura</option>
                                    <option value="rpg">Rol / RPG</option>
                                    <option value="shooter">Hero Shooter / FPS</option>
                                    <option value="indie">Indie / Metroidvania</option>
                                </select>
                            </div>
                        </div>

                        <div className="row mb-4">
                            <div className="col-md-6">
                                <label className="form-label fw-bold">Stock Total *</label>
                                <input type="number" className="form-control bg-dark text-light border-secondary" name="stock" placeholder="Ej: 50" min="0" required onChange={handleChange} />
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-bold">Stock Crítico</label>
                                <input type="number" className="form-control bg-dark text-light border-secondary" name="stockCritico" placeholder="Ej: 5" min="0" onChange={handleChange} />
                            </div>
                        </div>

                        <div className="d-flex justify-content-end gap-2 border-top pt-3">
                            <Link to="/admin/productos" className="btn btn-outline-secondary">Cancelar</Link>
                            <button type="submit" className="btn btn-success px-4">Guardar Producto</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminNuevoProducto;