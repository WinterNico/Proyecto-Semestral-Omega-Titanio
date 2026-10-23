import React from 'react';
import { Outlet, NavLink, Link } from 'react-router-dom';

const AdminLayout = () => {
    return (
        // Usamos d-flex de Bootstrap para que el menu lateral y el contenido esten uno al lado del otro
        <div className="admin-layout d-flex flex-column flex-md-row min-vh-100 bg-dark text-light">            
            {/* BARRA LATERAL (Sidebar) */}
            <aside className="admin-sidebar bg-black text-light p-3 border-end border-success border-opacity-25" style={{ width: '250px' }}>
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
                    {/* flex-column de Bootstrap hace que la lista sea vertical */}
                    <ul className="nav flex-column gap-2">
                        <li className="nav-item">
                            {/* NavLink añade la clase "active" automáticamente si la URL coincide */}
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
            <main className="admin-main flex-grow-1">
                <header className="admin-topbar d-flex justify-content-between align-items-center p-3 bg-black border-bottom border-success border-opacity-25 shadow-sm">
                    <h1 className="h5 mb-0">¡Hola, Administrador!</h1>
                    <div className="admin-profile-badge d-flex align-items-center gap-2">
                        <span className="fw-bold">Admin Principal</span>
                        {/* Indicador estado en linea */}
                        <div className="bg-success rounded-circle" style={{ width: '10px', height: '10px' }}></div>
                    </div>
                </header>

                {/* Outlet renderiza la pagina que corresponda segun la URL */}
                <section className="admin-content p-4">
                    <Outlet />
                </section>
            </main>
        </div>
    );
};

export default AdminLayout;