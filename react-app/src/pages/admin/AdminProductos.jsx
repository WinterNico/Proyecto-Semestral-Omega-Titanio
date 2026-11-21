import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiFetch } from '../../services/http.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { formatearCLP } from '../../utils/validaciones.js';

const AdminProductos = () => {
  const { esAdmin } = useAuth();
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const cargarProductos = async () => {
    try {
      setCargando(true);
      const data = await apiFetch('/productos');
      const productosConEstado = data.map((p) => {
        const umbral = p.stockCritico ?? 5;
        return {
          ...p,
          categoriaNombre: p.categoriaNombre || 'Sin categoría',
          estadoTxt: p.stock <= umbral ? 'Stock Crítico' : 'Normal',
          estadoClase: p.stock <= umbral ? 'bg-warning text-dark' : 'bg-success',
        };
      });
      setProductos(productosConEstado);
      setError(null);
    } catch (e) {
      setError('Error al cargar productos: ' + e.message);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleEliminar = async (id, nombre) => {
    if (window.confirm(`¿Estás seguro de eliminar el juego: ${nombre}?`)) {
      try {
        await apiFetch(`/productos/${id}`, { method: 'DELETE' });
        await cargarProductos();
      } catch (e) {
        setError('Error al eliminar: ' + e.message);
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
        {esAdmin && (
          <Link to="/admin/nuevo-producto" className="btn btn-success shadow-sm">
            + Nuevo Producto
          </Link>
        )}
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
                      <img
                        src={prod.imagen}
                        alt={`Thumb de ${prod.nombre}`}
                        className="rounded border"
                        style={{ width: '50px', height: '30px', objectFit: 'cover' }}
                      />
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
                        {/* Ver detalle: admin y vendedor */}
                        <Link to={`/admin/productos/${prod.id}`} className="btn btn-sm btn-outline-info">
                          Ver
                        </Link>
                        {/* Editar y eliminar: solo admin */}
                        {esAdmin && (
                          <>
                            <Link
                              to={`/admin/editar-producto/${prod.id}`}
                              className="btn btn-sm btn-outline-secondary"
                            >
                              Editar
                            </Link>
                            <button
                              type="button"
                              className="btn btn-sm btn-danger"
                              onClick={() => handleEliminar(prod.id, prod.nombre)}
                            >
                              Eliminar
                            </button>
                          </>
                        )}
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
