import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../data/db.js';
import { formatearCLP } from '../../utils/validaciones.js';

const AdminProductos = () => {
    const [productos, setProductos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    // Cargar productos al montar
    useEffect(() => {
        cargarProductos();
    }, []);

    const cargarProductos = () => {
        try {
            setCargando(true);
            const data = db.productos.obtenerTodos();
            const categorias = db.categorias.obtenerTodos();
            const productosConCategoria = data.map(p => ({
                ...p,
                categoriaNombre: categorias.find(c => c.id === p.categoriaId)?.nombre || 'Sin categoría',
                estadoTxt: p.stock <= 5 ? 'Stock Crítico' : 'Normal',
                estadoClase: p.stock <= 5 ? 'bg-warning text-dark' : 'bg-success'
            }));
            setProductos(productosConCategoria);
            setError(null);
        } catch (e) {
            setError('Error al cargar productos: ' + e.message);
        } finally {
            setCargando(false);
        }
    };

    const handleEliminar = (id, nombre) => {
        if (window.confirm(`¿Estás seguro de eliminar el juego: ${nombre}?`)) {
            try {
                const eliminado = db.productos.eliminar(id);
                if (eliminado) {
                    cargarProductos(); // Recargar lista
                } else {
                    alert('No se pudo eliminar el producto');
                }
            } catch (e) {
                alert('Error al eliminar: ' + e.message);
            }
        }
    };

    return (
        <div className="productos-container">
            <header className="d-flex justify-content-between align-items-center mb-4">
                <div className="topbar-title">
                    <h1 className="h3 mb-1">Inventario de Productos</h1>
                    <p className="text-muted mb-0">Gestiona los videojuegos disponibles en la tienda pública.</p>
                </div>
                <Link to="/admin/nuevo-producto" className="btn btn-success shadow-sm">
                    + Nuevo Producto
                </Link>
            </header>

            {error && (
                <div className="alert alert-danger alert-dismissible fade show mb-3" role="alert">
                    {error}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            )}

            <section className="admin-content">
                <div className="table-responsive shadow-sm rounded bg-black border border-secondary p-3">
                    {cargando ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-success" role="status">
                                <span className="visually-hidden">Cargando...</span>
                            </div>
                            <p className="mt-2 text-muted">Cargando productos...</p>
                        </div>
                    ) : (
                        <table className="table table-dark table-hover align-middle data-table" id="table-products">
                            <thead className="table-dark">
                                <tr>
                                    <th>Código</th>
                                    <th>Imagen</th>
                                    <th>Nombre</th>
                                    <th>Categoría</th>
                                    <th>Precio</th>
                                    <th>Stock</th>
                                    <th>Estado Stock</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productos.map((prod) => (
                                    <tr key={prod.id}>
                                        <td><code>{prod.codigo}</code></td>
                                        <td>
                                            <img src={prod.imagen} alt={`Thumb de ${prod.nombre}`} className="rounded border" style={{ width: '50px', height: '30px', objectFit: 'cover' }} />
                                        </td>
                                        <td><strong>{prod.nombre}</strong></td>
                                        <td>{prod.categoriaNombre}</td>
                                        <td>
                                            {prod.precio === 0 ? 'Free-to-Play' : formatearCLP(prod.precio)}
                                        </td>
                                        <td>{prod.stock}</td>
                                        <td>
                                            <span className={`badge ${prod.estadoClase}`}>
                                                {prod.estadoTxt}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                <Link to={`/admin/editar-producto/${prod.id}`} className="btn btn-sm btn-outline-secondary">
                                                    Editar
                                                </Link>
                                                <button 
                                                    type="button" 
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleEliminar(prod.id, prod.nombre)}
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                
                                {productos.length === 0 && (
                                    <tr>
                                        <td colSpan="8" className="text-center py-4 text-muted">
                                            No hay productos en el inventario.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </section>
        </div>
    );
};

export default AdminProductos;
