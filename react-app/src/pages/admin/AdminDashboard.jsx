import MetricCard from '../../components/common/MetriCard.jsx';
import { Link } from 'react-router-dom';
import { db } from '../../data/db.js';
import { formatearMontoBoleta } from '../../utils/validaciones.js';
import { useAuth } from '../../context/AuthContext.jsx';

const UMBRAL_STOCK_CRITICO = 5;

const AdminDashboard = () => {
    // El vendedor ve el panel en modo lectura: sin usuarios ni acciones de gestión
    const { esAdmin } = useAuth();
    const productos = db.productos.obtenerTodos();
    const usuarios = db.usuarios.obtenerTodos();
    const ordenes = db.ordenes.obtenerTodos();

    const exitosas = ordenes.filter((o) => o.estado === 'EXITOSO');
    const totalVentas = exitosas.reduce((acc, o) => acc + (Number(o.total) || 0), 0);
    const criticos = productos.filter((p) => Number(p.stock) <= UMBRAL_STOCK_CRITICO).length;

    return (
        <div className="dashboard-container">
            <div className="row mb-4 metrics-grid">
                <div className="col-md-3 mb-3">
                    <MetricCard titulo="Total Ventas" valor={formatearMontoBoleta(totalVentas)} textoEnlace={`${exitosas.length} órdenes exitosas`} />
                </div>
                <div className="col-md-3 mb-3">
                    <MetricCard titulo="Juegos en Catálogo" valor={productos.length} enlace="/admin/productos" textoEnlace="Ver inventario" />
                </div>
                {esAdmin && (
                    <div className="col-md-3 mb-3">
                        <MetricCard titulo="Usuarios Registrados" valor={usuarios.length} enlace="/admin/usuarios" textoEnlace="Ver lista" />
                    </div>
                )}
                <div className="col-md-3 mb-3">
                    <MetricCard titulo="Stock Crítico" valor={`${criticos} ${criticos === 1 ? 'Juego' : 'Juegos'}`} textoEnlace={criticos > 0 ? 'Requiere reposición' : 'Todo en orden'} esAlerta={criticos > 0} />
                </div>
            </div>
            {/* ... aquí sigue tu bloque "Acciones Rápidas" sin cambios ... */}

            {/* Accesos directos para gestion (solo admin) */}
            {esAdmin ? (
                <div className="card shadow-sm quick-actions-section mt-2">
                    <div className="card-body">
                        <h2 className="h5 mb-3">Acciones Rápidas</h2>
                        {/* d-flex y gap-3 separan los botones automaticamente */}
                        <div className="d-flex flex-wrap gap-3 action-buttons">
                            <Link to="/admin/nuevo-producto" className="btn btn-success">
                                + Añadir Nuevo Producto
                            </Link>
                            <Link to="/admin/nuevo-usuario" className="btn btn-secondary">
                                + Registrar Nuevo Usuario
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="alert alert-info mt-2">
                    Tu rol es <strong>vendedor</strong>: puedes revisar productos y órdenes, pero no modificarlos.
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;