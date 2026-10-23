import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useCart } from '../../context/CartContext.jsx';

const RutaProtegida = () => {
    const { user, usuario, cliente } = useCart();
    const usuarioLogueado = user || usuario || cliente;

    if (!usuarioLogueado) {
        return <Navigate to="/login" replace />;
    }

    if (usuarioLogueado.rol !== 'admin') {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default RutaProtegida;