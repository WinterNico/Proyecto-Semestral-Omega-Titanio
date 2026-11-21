import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MetricCard from '../../components/common/MetriCard.jsx';
import { apiFetch } from '../../services/http.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { formatearMontoBoleta } from '../../utils/validaciones.js';

const UMBRAL_STOCK_CRITICO = 5;

const AdminDashboard = () => {
  const { esAdmin } = useAuth();
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [ordenes, setOrdenes] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const peticiones = [
      apiFetch('/productos'),
      apiFetch('/ordenes'),
      esAdmin ? apiFetch('/usuarios') : Promise.resolve([]),
    ];

    Promise.all(peticiones)
      .then(([prods, ords, users]) => {
        setProductos(prods);
        setOrdenes(ords);
        setUsuarios(users);
      })
      .catch((e) => setError(e.message || 'Error al cargar las métricas del panel.'))
      .finally(() => setCargando(false));
  }, [esAdmin]);

  if (cargando) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-success" role="status" />
      </div>
    );
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  const exitosas = ordenes.filter((o) => o.estado === 'EXITOSO');
  const totalVentas = exitosas.reduce((acc, o) => acc + (Number(o.total) || 0), 0);
  const criticos = productos.filter(
    (p) => Number(p.stock) <= (p.stockCritico ?? UMBRAL_STOCK_CRITICO)
  ).length;

  return (
    <div className="dashboard-container">
      <div className="row mb-4 metrics-grid">
        <div className="col-md-3 mb-3">
          <MetricCard
            titulo="Total Ventas"
            valor={formatearMontoBoleta(totalVentas)}
            enlace="/admin/ordenes"
            textoEnlace={`${exitosas.length} órdenes exitosas`}
          />
        </div>
        <div className="col-md-3 mb-3">
          <MetricCard
            titulo="Juegos en Catálogo"
            valor={productos.length}
            enlace="/admin/productos"
            textoEnlace="Ver inventario"
          />
        </div>
        {esAdmin && (
          <div className="col-md-3 mb-3">
            <MetricCard
              titulo="Usuarios Registrados"
              valor={usuarios.length}
              enlace="/admin/usuarios"
              textoEnlace="Ver lista"
            />
          </div>
        )}
        <div className="col-md-3 mb-3">
          <MetricCard
            titulo="Stock Crítico"
            valor={`${criticos} ${criticos === 1 ? 'Juego' : 'Juegos'}`}
            textoEnlace={criticos > 0 ? 'Requiere reposición' : 'Todo en orden'}
            esAlerta={criticos > 0}
          />
        </div>
      </div>

      {/* Accesos directos para gestión (solo admin) */}
      {esAdmin ? (
        <div className="card shadow-sm quick-actions-section mt-2">
          <div className="card-body">
            <h2 className="h5 mb-3">Acciones Rápidas</h2>
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
