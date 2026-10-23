import React from 'react';
import MetricCard from '../../components/common/MetriCard.jsx';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className="dashboard-container">
            {/* Tarjetas resumen de metricas usando el sistema de grillas de Bootstrap */}
            <div className="row mb-4 metrics-grid">
                <div className="col-md-3 mb-3">
                    <MetricCard titulo="Total Ventas" valor="$1.450.000" textoEnlace="+12% este mes" />
                </div>
                <div className="col-md-3 mb-3">
                    <MetricCard titulo="Juegos en Catálogo" valor="6" enlace="/admin/productos" textoEnlace="Ver inventario" />
                </div>
                <div className="col-md-3 mb-3">
                    <MetricCard titulo="Usuarios Registrados" valor="18" enlace="/admin/usuarios" textoEnlace="Ver lista" />
                </div>
                <div className="col-md-3 mb-3">
                    <MetricCard titulo="Stock Crítico" valor="2 Juegos" textoEnlace="Requiere reposición" esAlerta={true} />
                </div>
            </div>

            {/* Accesos directos para gestion */}
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
        </div>
    );
};

export default AdminDashboard;