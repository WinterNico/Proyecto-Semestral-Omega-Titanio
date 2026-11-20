// src/context/AuthContext.jsx
// Sesión del usuario: login, registro, logout y persistencia al recargar la página.
import { createContext, useContext, useEffect, useState } from 'react';
import { apiFetch, sesion } from '../services/http.js';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // Al recargar, se parte con el usuario guardado: así no "parpadea" deslogueado
  const [user, setUser] = useState(() => sesion.getUsuario());
  // Mientras se confirma el token con el backend, las rutas protegidas esperan
  const [cargando, setCargando] = useState(() => Boolean(sesion.getAccess()));

  // Al abrir o recargar la app: confirmar que el token sigue siendo válido
  useEffect(() => {
    if (!sesion.getAccess()) return;
    apiFetch('/auth/me')
      .then((usuario) => {
        setUser(usuario);
        sesion.guardarUsuario(usuario);
      })
      .catch((e) => {
        // Solo se cierra la sesión si el backend rechazó el token,
        // no si el backend está apagado (error de red, sin status)
        if (e.status === 401 || e.status === 403) {
          sesion.limpiar();
          setUser(null);
        }
      })
      .finally(() => setCargando(false));
  }, []);

  // Si http.js no pudo renovar el token, se cierra la sesión aquí también
  useEffect(() => {
    const alExpirar = () => setUser(null);
    window.addEventListener('sesion-expirada', alExpirar);
    return () => window.removeEventListener('sesion-expirada', alExpirar);
  }, []);

  const iniciarSesion = (data) => {
    sesion.guardar(data);
    setUser(data.usuario);
    return { ok: true, usuario: data.usuario };
  };

  const login = async (correo, password) => {
    try {
      const data = await apiFetch('/auth/login', {
        method: 'POST',
        body: { correo: correo.trim(), password },
      });
      return iniciarSesion(data);
    } catch (e) {
      return { ok: false, error: mensajeDeError(e) };
    }
  };

  const registerUser = async (datos) => {
    const { confirmPassword: _omitir, ...usuario } = datos; // el backend no lo necesita
    try {
      const data = await apiFetch('/auth/registro', { method: 'POST', body: usuario });
      return iniciarSesion(data);
    } catch (e) {
      return { ok: false, error: mensajeDeError(e) };
    }
  };

  // JWT es stateless: cerrar sesión = borrar los tokens del navegador
  const logout = () => {
    sesion.limpiar();
    setUser(null);
  };

  const tieneRol = (...roles) => Boolean(user) && roles.includes(user.rol);

  return (
    <AuthContext.Provider
      value={{
        user,
        cargando,
        login,
        registerUser,
        logout,
        tieneRol,
        esAdmin: user?.rol === 'admin',
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Error de red (backend apagado) no trae status
function mensajeDeError(e) {
  return e.status ? e.message : 'No se pudo conectar con el servidor. Intenta más tarde.';
}

export function useAuth() {
  return useContext(AuthContext);
}
