import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminProductos = () => {
    // Esto es una simulacion inciial de lo que pueda venir en el db.js
    const [productos, setProductos] = useState([
        { 
            id: 1, 
            codigo: 'GAME-001', 
            thumb: 'https://placehold.co/50x30/1b2838/ffffff?text=MH', 
            nombre: 'Monster Hunter Wilds', 
            categoria: 'Acción / Rol', 
            precio: 39990, 
            stock: 15, 
            estadoTxt: 'Normal', 
            estadoClase: 'badge-success' 
        },
        { 
            id: 2, 
            codigo: 'GAME-002', 
            thumb: 'https://placehold.co/50x30/1b2838/ffffff?text=MR', 
            nombre: 'Marvel Rivals', 
            categoria: 'Hero Shooter', 
            precio: 0, 
            stock: 999, 
            estadoTxt: 'Ilimitado', 
            estadoClase: 'badge-success' 
        },
        { 
            id: 3, 
            codigo: 'GAME-003', 
            thumb: 'https://placehold.co/50x30/1b2838/ffffff?text=HK', 
            nombre: 'Hollow Knight', 
            categoria: 'Metroidvania', 
            precio: 8500, 
            stock: 2, 
            estadoTxt: 'Stock Crítico', 
            estadoClase: 'badge-warning' 
        }
    ]);

    // Función para manejar la eliminación (por ahora solo un alert, luego la conectaremos)
    const handleEliminar = (id, nombre) => {
        if(window.confirm(`¿Estás seguro de eliminar el juego: ${nombre}?`)) {
            // Filtramos el arreglo para quitar el producto eliminado
            setProductos(productos.filter(prod => prod.id !== id));
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

            <section className="admin-content">
                <div className="table-responsive shadow-sm rounded bg-black border border-secondary p-3">
                    <table className="table table-hover align-middle data-table" id="table-products">
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
                            {/* Iteramos sobre el arreglo de productos para crear las filas automáticamente */}
                            {productos.map((prod) => (
                                <tr key={prod.id}>
                                    <td><code>{prod.codigo}</code></td>
                                    <td>
                                        <img src={prod.thumb} alt={`Thumb de ${prod.nombre}`} className="rounded border" />
                                    </td>
                                    <td><strong>{prod.nombre}</strong></td>
                                    <td>{prod.categoria}</td>
                                    <td>
                                        {prod.precio === 0 ? 'Free-to-Play' : `$${prod.precio.toLocaleString('es-CL')}`}
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
                            
                            {/* Mensaje por si la tabla se queda vacía */}
                            {productos.length === 0 && (
                                <tr>
                                    <td colSpan="8" className="text-center py-4 text-muted">
                                        No hay productos en el inventario.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default AdminProductos;