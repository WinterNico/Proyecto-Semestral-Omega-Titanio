import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { db } from '../../data/db.js';
import { validarCorreo } from '../../utils/validaciones.js';

const AdminNuevoProducto = () => {
    const navigate = useNavigate();
    const { id } = useParams(); 
    const esEdicion = !!id;

    // Estado para guardar todos los datos del formulario
    const [formData, setFormData] = useState({
        codigo: '', nombre: '', descripcion: '', precio: '', categoriaId: '', stock: '', stockCritico: '', oferta: false, descuento: 0, imagen: '', capturas: '', trailer: ''
    });
    const [categorias, setCategorias] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [errores, setErrores] = useState({});
    const [mensaje, setMensaje] = useState('');

    // Cargar categorías al montar
    useEffect(() => {
        setCategorias(db.categorias.obtenerTodos());
    }, []);

    // Si elige editar, cargar datos del producto
    useEffect(() => {
        if (esEdicion) {
            const producto = db.productos.obtenerPorId(Number(id));
            if (producto) {
                setFormData({
                    codigo: producto.codigo,
                    nombre: producto.nombre,
                    descripcion: producto.descripcion || '',
                    precio: String(producto.precio),
                    categoriaId: String(producto.categoriaId),
                    stock: String(producto.stock),
                    stockCritico: String(producto.stockCritico || 5),
                    oferta: producto.oferta || false,
                    descuento: producto.descuento || 0,
                    imagen: producto.imagen || '',
                    capturas: producto.capturas?.join(',') || '',
                    trailer: producto.trailer || ''
                });
            } else {
                setMensaje('Producto no encontrado');
                setTimeout(() => navigate('/admin/productos'), 2000);
            }
        }
    }, [esEdicion, id, navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));

        if (errores[name]) {
            setErrores(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validarFormulario = () => {
        const nuevosErrores = {};
        if (!formData.codigo.trim()) nuevosErrores.codigo = 'Código es obligatorio';
        if (!formData.nombre.trim()) nuevosErrores.nombre = 'Nombre es obligatorio';
        if (!formData.precio || Number(formData.precio) < 0) nuevosErrores.precio = 'Precio inválido';
        if (!formData.categoriaId) nuevosErrores.categoriaId = 'Categoría es obligatoria';
        if (!formData.stock || Number(formData.stock) < 0) nuevosErrores.stock = 'Stock inválido';
        if (formData.oferta && (!formData.descuento || Number(formData.descuento) <= 0 || Number(formData.descuento) > 100)) {
            nuevosErrores.descuento = 'Descuento debe ser entre 1 y 100';
        }
        setErrores(nuevosErrores);
        return Object.keys(nuevosErrores).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validarFormulario()) return;

        try {
            const productoData = {
                codigo: formData.codigo.trim(),
                nombre: formData.nombre.trim(),
                descripcion: formData.descripcion.trim(),
                precio: Number(formData.precio),
                categoriaId: Number(formData.categoriaId),
                stock: Number(formData.stock),
                stockCritico: Number(formData.stockCritico) || 5,
                oferta: formData.oferta,
                descuento: formData.oferta ? Number(formData.descuento) : 0,
                imagen: formData.imagen.trim() || '/react-app/public/assets/img/no_imagen_producto.png',
                capturas: formData.capturas ? formData.capturas.split(',').map(c => c.trim()).filter(c => c) : [],
                trailer: formData.trailer.trim() || 'https://www.youtube.com/embed/zPwK-h8RHWs'
            };

            if (esEdicion) {
                db.productos.actualizar(Number(id), productoData);
                setMensaje('¡Producto actualizado exitosamente!');
            } else {
                db.productos.crear(productoData);
                setMensaje('¡Producto creado exitosamente!');
            }

            // Redirigir después de 1.5 segundos
            setTimeout(() => navigate('/admin/productos'), 1500);
        } catch (e) {
            setErrores({ submit: 'Error al guardar: ' + e.message });
        }
    };

    return (
        <div className="form-container">
            <header className="d-flex justify-content-between align-items-center mb-4">
                <div className="topbar-title">
                    <h1 className="h3 mb-1">{esEdicion ? 'Editar Producto' : 'Registrar Nuevo Producto'}</h1>
                    <p className="text-muted mb-0">Ingresa la información técnica, precios e inventario del videojuego.</p>
                </div>
                <Link to="/admin/productos" className="btn btn-secondary shadow-sm">
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
                    <form onSubmit={handleSubmit} className="form-standard" noValidate>
                        
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label fw-bold">Código de Producto *</label>
                                <input type="text" className={`form-control bg-dark text-light border-secondary ${errores.codigo ? 'is-invalid' : ''}`} name="codigo" placeholder="Ej: GAME-101" minLength="3" required onChange={handleChange} value={formData.codigo} />
                                {errores.codigo && <div className="invalid-feedback">{errores.codigo}</div>}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-bold">Nombre del Producto *</label>
                                <input type="text" className={`form-control bg-dark text-light border-secondary ${errores.nombre ? 'is-invalid' : ''}`} name="nombre" placeholder="Ej: Monster Hunter Wilds" maxLength="100" required onChange={handleChange} value={formData.nombre} />
                                {errores.nombre && <div className="invalid-feedback">{errores.nombre}</div>}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Descripción del Juego</label>
                            <textarea className="form-control bg-dark text-light border-secondary" name="descripcion" rows="3" placeholder="Resumen del argumento..." maxLength="500" onChange={handleChange} value={formData.descripcion}></textarea>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label fw-bold">Precio ($ CLP) *</label>
                                <input type="number" className={`form-control bg-dark text-light border-secondary ${errores.precio ? 'is-invalid' : ''}`} name="precio" placeholder="Ej: 39990" min="0" required onChange={handleChange} value={formData.precio} />
                                {errores.precio && <div className="invalid-feedback">{errores.precio}</div>}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-bold">Categoría *</label>
                                <select className={`form-select bg-dark text-light border-secondary ${errores.categoriaId ? 'is-invalid' : ''}`} name="categoriaId" required onChange={handleChange} value={formData.categoriaId}>
                                    <option value="">-- Selecciona una categoría --</option>
                                    {categorias.map(cat => (
                                        <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                                    ))}
                                </select>
                                {errores.categoriaId && <div className="invalid-feedback">{errores.categoriaId}</div>}
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label className="form-label fw-bold">Stock Total *</label>
                                <input type="number" className={`form-control bg-dark text-light border-secondary ${errores.stock ? 'is-invalid' : ''}`} name="stock" placeholder="Ej: 50" min="0" required onChange={handleChange} value={formData.stock} />
                                {errores.stock && <div className="invalid-feedback">{errores.stock}</div>}
                            </div>
                            <div className="col-md-6">
                                <label className="form-label fw-bold">Stock Crítico</label>
                                <input type="number" className="form-control bg-dark text-light border-secondary" name="stockCritico" placeholder="Ej: 5" min="0" onChange={handleChange} value={formData.stockCritico} />
                            </div>
                        </div>

                        <div className="row mb-3">
                            <div className="col-md-6">
                                <div className="form-check form-switch mt-4">
                                    <input className="form-check-input" type="checkbox" name="oferta" id="ofertaCheck" onChange={handleChange} checked={formData.oferta} />
                                    <label className="form-check-label fw-bold" htmlFor="ofertaCheck">¿En Oferta?</label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <label className={`form-label fw-bold ${!formData.oferta ? 'text-muted' : ''}`}>Descuento (%)</label>
                                <input type="number" className={`form-control bg-dark text-light border-secondary ${errores.descuento ? 'is-invalid' : ''}`} name="descuento" placeholder="Ej: 20" min="1" max="100" onChange={handleChange} value={formData.descuento} disabled={!formData.oferta} />
                                {errores.descuento && <div className="invalid-feedback">{errores.descuento}</div>}
                            </div>
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Imagen Principal (URL)</label>
                            <input type="url" className="form-control bg-dark text-light border-secondary" name="imagen" placeholder="/assets/img/mi-juego.jpg" onChange={handleChange} value={formData.imagen} />
                        </div>

                        <div className="mb-3">
                            <label className="form-label fw-bold">Capturas Adicionales (URLs separadas por coma)</label>
                            <input type="text" className="form-control bg-dark text-light border-secondary" name="capturas" placeholder="/assets/img/ss1.jpg, /assets/img/ss2.jpg" onChange={handleChange} value={formData.capturas} />
                        </div>

                        <div className="mb-4">
                            <label className="form-label fw-bold">Trailer (URL YouTube embed)</label>
                            <input type="url" className="form-control bg-dark text-light border-secondary" name="trailer" placeholder="https://www.youtube.com/embed/..." onChange={handleChange} value={formData.trailer} />
                        </div>

                        {errores.submit && (
                            <div className="alert alert-danger mb-3">{errores.submit}</div>
                        )}

                        <div className="d-flex justify-content-end gap-2 border-top pt-3">
                            <Link to="/admin/productos" className="btn btn-outline-secondary">Cancelar</Link>
                            <button type="submit" className="btn btn-success px-4" disabled={cargando}>
                                {cargando ? 'Guardando...' : (esEdicion ? 'Actualizar Producto' : 'Guardar Producto')}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminNuevoProducto;