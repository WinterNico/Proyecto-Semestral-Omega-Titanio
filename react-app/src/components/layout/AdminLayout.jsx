import React from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';

const AdminLayout = () => {
    return (
        // Se cambio d-flex por container-fluid y row para manejar las columnas responsivas de Bootstrap
        <div data-bs-theme="dark" className="admin-layout container-fluid min-vh-100 bg-dark text-light p-0">            
            <div className="row g-0 min-vh-100">
                {/* BARRA LATERAL (Sidebar) */}
                <aside className="admin-sidebar col-12 col-md-3 col-xl-2 bg-black text-light p-3 border-end border-success border-opacity-25">
                    <div className="sidebar-header text-center mb-4">
                        <img 
                            src="../assets/img/logo.png" 
                            alt="Steam Logo" 
                            className="admin-logo mb-2" 
                            width="60" 
                            height="60" 
                        />
                        <h2 className="fs-5">Panel Admin</h2>
                    </div>
                    
                    <nav className="admin-nav" aria-label="Menú de administración">
                        <ul className="nav flex-column gap-2">
                            <li className="nav-item">
                                <NavLink to="/admin" end className={({isActive}) => `nav-link text-white ${isActive ? 'bg-success text-white rounded' : ''}`}>
                                    📊 Dashboard
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/admin/productos" className={({isActive}) => `nav-link text-white ${isActive ? 'bg-success text-white rounded' : ''}`}>
                                    🎮 Productos
                                </NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/admin/usuarios" className={({isActive}) => `nav-link text-white ${isActive ? 'bg-success text-white rounded' : ''}`}>
                                    👥 Usuarios
                                </NavLink>
                            </li>
                            <hr className="text-secondary" />
                            <li className="nav-item">
                                <Link to="/" target="_blank" className="nav-link text-white">
                                    🌐 Ir a la Tienda
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link text-danger">
                                    🚪 Cerrar Sesión
                                </Link>
                            </li>
                        </ul>
                    </nav>
                </aside>

                {/* AREA CONTENIDO PRINCIPAL */}
                <main className="admin-main col-12 col-md-9 col-xl-10 d-flex flex-column">
                    <header className="admin-topbar d-flex justify-content-between align-items-center p-3 bg-black border-bottom border-success border-opacity-25 shadow-sm">
                        <h1 className="h5 mb-0">¡Hola, Administrador!</h1>
                        <div className="admin-profile-badge d-flex align-items-center gap-2">
                            <span className="fw-bold">Admin Principal</span>
                            <div className="bg-success rounded-circle" style={{ width: '10px', height: '10px' }}></div>
                        </div>
                    </header>

                    {/* Outlet renderiza la pagina que corresponda segun la URL */}
                    <section className="admin-content p-4 flex-grow-1">
                        <Outlet />
                    </section>
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;