import React from 'react';
import { Outlet, NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

// El acceso (admin o vendedor) ya lo valida RutaProtegida en App.jsx;
// aquí solo se ajusta el menú según el rol.
const claseLink = ({ isActive }) => `nav-link text-white ${isActive ? 'bg-success text-white rounded' : ''}`;

const AdminLayout = () => {
    const { user: usuarioLogueado, logout, esAdmin } = useAuth();
    const navigate = useNavigate();

    const cerrarSesion = () => {
        logout();
        navigate('/login');
    };

    return (
        <div data-bs-theme="dark" className="admin-layout container-fluid min-vh-100 bg-dark text-light p-0">
            <div className="row g-0 min-vh-100">
                <aside className="admin-sidebar col-12 col-md-3 col-xl-2 bg-black text-light p-3 border-end border-success border-opacity-25">
                    <div className="sidebar-header text-center mb-4">
                        <img src="../assets/img/logo.png" alt="Steam Logo" className="admin-logo mb-2" width="60" height="60" />
                        <h2 className="fs-5">{esAdmin ? 'Panel Admin' : 'Panel Vendedor'}</h2>
                    </div>
                    <nav className="admin-nav" aria-label="Menú de administración">
                        <ul className="nav flex-column gap-2">
                            <li className="nav-item">
                                <NavLink to="/admin" end className={claseLink}>
                                    📊 Dashboard
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/admin/productos" className={claseLink}>
                                    🎮 Productos
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/admin/ordenes" className={claseLink}>
                                    🧾 Órdenes
                                </NavLink>
                            </li>
                            {esAdmin && (
                                <li className="nav-item">
                                    <NavLink to="/admin/usuarios" className={claseLink}>
                                        👥 Usuarios
                                    </NavLink>
                                </li>
                            )}
                            <hr className="text-secondary" />
                            <li className="nav-item">
                                <Link to="/" target="_blank" className="nav-link text-white">
                                    🌐 Ir a la Tienda
                                </Link>
                            </li>
                            <li className="nav-item">
                                <button onClick={cerrarSesion} className="nav-link text-danger bg-transparent border-0 w-100 text-start">
                                    🚪 Cerrar Sesión
                                </button>
                            </li>
                            <span className="fw-bold mt-3 text-center d-block text-success">
                                {usuarioLogueado?.nombre} {usuarioLogueado?.apellidos}
                            </span>
                        </ul>
                    </nav>
                </aside>

                <main className="admin-main col-12 col-md-9 col-xl-10 d-flex flex-column">
                    <header className="admin-topbar d-flex justify-content-between align-items-center p-3 bg-black border-bottom border-success border-opacity-25 shadow-sm">
                        <h1 className="h5 mb-0">¡Hola, {usuarioLogueado?.nombre}!</h1>
                        <div className="admin-profile-badge d-flex align-items-center gap-2">
                            <span className="fw-bold text-capitalize">{usuarioLogueado?.rol}</span>
                            <div className="bg-success rounded-circle" style={{ width: '10px', height: '10px' }}></div>
                        </div>
                    </header>
                    <section className="admin-content p-4 flex-grow-1">
                        <Outlet />
                    </section>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
