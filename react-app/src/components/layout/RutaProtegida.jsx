import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';

const RutaProtegida = () => {
    // Obtenemos el usuario actual del contexto
    const { usuario } = useCart();

    // Si no hay usuario logueado, lo mandamos al login
    if (!usuario) {
        return <Navigate to="/login" replace />;
    }

    // Si hay usuario, pero su rol NO es "admin"
    if (usuario.rol !== 'admin') {
        return <Navigate to="/" replace />;
    }

    // Si pasó las validaciones, renderizamos el panel de administrador
    return <Outlet />;
};

export default RutaProtegida;