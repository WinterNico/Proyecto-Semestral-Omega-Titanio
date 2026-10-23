import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AdminUsuarios = () => {
    // Estado inicial simulado de usuarios
    const [usuarios, setUsuarios] = useState([
        { run: '19011022K', nombre: 'Administrador General', email: 'admin@duoc.cl', region: 'Metropolitana / Santiago', rol: 'Administrador', rolClase: 'bg-danger' },
        { run: '182345678', nombre: 'Javier Encargado Ventas', email: 'javier.ventas@profesor.duoc.cl', region: 'Metropolitana / Santiago', rol: 'Vendedor', rolClase: 'bg-primary' },
        { run: '209876543', nombre: 'Cliente Gamer', email: 'gamer.chile@gmail.com', region: 'Ñuble / Linares', rol: 'Cliente', rolClase: 'bg-success' }
    ]);

    const handleEliminar = (run, nombre) => {
        if(window.confirm(`¿Estás seguro de eliminar al usuario: ${nombre}?`)) {
            setUsuarios(usuarios.filter(u => u.run !== run));
        }
    };

    return (
        <div className="usuarios-container">
            <header className="d-flex justify-content-between align-items-center mb-4">
                <div className="topbar-title">
                    <h1 className="h3 mb-1">Cuentas de Usuario</h1>
                    <p className="text-muted mb-0">Administración de clientes, vendedores y administradores del sistema.</p>
                </div>
                <Link to="/admin/nuevo-usuario" className="btn btn-primary shadow-sm">
                    + Nuevo Usuario
                </Link>
            </header>

            <section className="admin-content">
                <div className="table-responsive shadow-sm rounded bg-white p-3">
                    <table className="table table-hover align-middle data-table">
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
                                    <td>{user.nombre}</td>
                                    <td>{user.email}</td>
                                    <td>{user.region}</td>
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
                                                onClick={() => handleEliminar(user.run, user.nombre)}
                                            >
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
                </div>
            </section>
        </div>
    );
};

export default AdminUsuarios;