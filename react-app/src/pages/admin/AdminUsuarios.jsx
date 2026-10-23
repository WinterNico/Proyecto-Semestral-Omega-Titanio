import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { db } from '../../data/db.js';

const AdminUsuarios = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const cargarUsuarios = () => {
        try {
            setCargando(true);
            const data = db.usuarios.obtenerTodos();
            const usuariosConRol = data.map(u => ({
                ...u,
                rolClase: u.rol === 'admin' ? 'bg-danger' : u.rol === 'cliente' ? 'bg-success' : 'bg-primary'
            }));
            setUsuarios(usuariosConRol);
            setError(null);
        } catch (e) {
            setError('Error al cargar usuarios: ' + e.message);
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        cargarUsuarios();
    }, []);

    const handleEliminar = (id, nombre) => {
    if (window.confirm(`¿Estás seguro de eliminar al usuario: ${nombre}?`)) {
        try {
            const eliminado = db.usuarios.eliminar(id);
            if (eliminado) {
                cargarUsuarios(); 
            } else {
                alert('No se pudo eliminar el usuario');
            }
        } catch (e) {
            alert('Error al eliminar: ' + e.message);
        }
    }
};

    return (
        <div className="usuarios-container">
            <header className="d-flex justify-content-between align-items-center mb-4">
                <div className="topbar-title">
                    <h1 className="h3 mb-1">Cuentas de Usuario</h1>
                    <p className="text-muted mb-0">Administración de clientes, vendedores y administradores del sistema.</p>
                </div>
                <Link to="/admin/nuevo-usuario" className="btn btn-success shadow-sm">
                    + Nuevo Usuario
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
                            <p className="mt-2 text-muted">Cargando usuarios...</p>
                        </div>
                    ) : (
                        <table className="table table-dark table-hover align-middle data-table">
                            <thead className="table-dark">
                                <tr>
                                    <th>RUN</th>
                                    <th>Nombre Completo</th>
                                    <th>Correo Institucional / Personal</th>
                                    <th>Región / Comuna</th>
                                    <th>Rol / Perfil</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {usuarios.map((user) => (
                                    <tr key={user.run}>
                                        <td><code>{user.run}</code></td>
                                        <td>{user.nombre} {user.apellidos}</td>
                                        <td>{user.correo}</td>
                                        <td>{user.region} / {user.comuna}</td>
                                        <td>
                                            <span className={`badge ${user.rolClase}`}>{user.rol}</span>
                                        </td>
                                        <td>
                                            <div className="d-flex gap-2">
                                                <Link to={`/admin/editar-usuario/${user.run}`} className="btn btn-sm btn-outline-secondary">
                                                    Editar
                                                </Link>
                                                <button 
                                                    className="btn btn-sm btn-danger"
                                                    onClick={() => handleEliminar(user.id, `${user.nombre} ${user.apellidos}`)}                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {usuarios.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4 text-muted">No hay usuarios registrados.</td>
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

export default AdminUsuarios;
