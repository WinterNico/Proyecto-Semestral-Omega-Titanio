import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className="dashboard-container">
            {/* Tarjetas resumen de metricas usando el sistema de grillas de Bootstrap */}
            <div className="row mb-4 metrics-grid">
                
                <div className="col-md-3 mb-3">
                    <div className="card shadow-sm h-100 metric-card">
                        <div className="card-body text-center">
                            <h3 className="h6 text-muted">Total Ventas</h3>
                            <p className="fs-3 fw-bold metric-value">$1.450.000</p>
                            <span className="text-success fw-semibold metric-trend positive">+12% este mes</span>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card shadow-sm h-100 metric-card">
                        <div className="card-body text-center">
                            <h3 className="h6 text-muted">Juegos en Catálogo</h3>
                            <p className="fs-3 fw-bold metric-value">6</p>
                            {/* Reemplazamos <a> por <Link> de React Router */}
                            <Link to="/admin/productos" className="text-decoration-none metric-link">
                                Ver inventario &rarr;
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card shadow-sm h-100 metric-card">
                        <div className="card-body text-center">
                            <h3 className="h6 text-muted">Usuarios Registrados</h3>
                            <p className="fs-3 fw-bold metric-value">18</p>
                            <Link to="/admin/usuarios" className="text-decoration-none metric-link">
                                Ver lista &rarr;
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="col-md-3 mb-3">
                    <div className="card shadow-sm h-100 border-danger metric-card alert">
                        <div className="card-body text-center">
                            <h3 className="h6 text-danger">Stock Crítico</h3>
                            <p className="fs-3 fw-bold text-danger metric-value">2 Juegos</p>
                            <span className="text-danger small metric-alert-msg">Requiere reposición</span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Accesos directos para gestion */}
            <div className="card shadow-sm quick-actions-section mt-2">
                <div className="card-body">
                    <h2 className="h5 mb-3">Acciones Rápidas</h2>
                    {/* d-flex y gap-3 separan los botones automaticamente */}
                    <div className="d-flex flex-wrap gap-3 action-buttons">
                        <Link to="/admin/nuevo-producto" className="btn btn-primary">
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