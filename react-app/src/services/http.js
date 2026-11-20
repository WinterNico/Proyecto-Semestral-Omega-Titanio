// src/services/http.js
// Único punto de contacto con el backend: agrega el token y lo renueva si vence.
// import.meta.env solo existe con Vite (en los tests de Karma es undefined)
const API_URL = import.meta.env?.VITE_API_URL || 'http://localhost:8080/api/v1';

const ACCESS_KEY = 'omega_access_token';
const REFRESH_KEY = 'omega_refresh_token';
const USER_KEY = 'omega_usuario';

// Todo lo que se guarda en localStorage sobre la sesión pasa por aquí
export const sesion = {
  getAccess: () => localStorage.getItem(ACCESS_KEY),
  getRefresh: () => localStorage.getItem(REFRESH_KEY),
  getUsuario: () => {
    try {
      return JSON.parse(localStorage.getItem(USER_KEY));
    } catch {
      return null;
    }
  },
  guardar({ accessToken, refreshToken, usuario }) {
    localStorage.setItem(ACCESS_KEY, accessToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
    if (usuario) localStorage.setItem(USER_KEY, JSON.stringify(usuario));
  },
  guardarUsuario(usuario) {
    localStorage.setItem(USER_KEY, JSON.stringify(usuario));
  },
  limpiar() {
    localStorage.removeItem(ACCESS_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(USER_KEY);
  },
};

// Si varias peticiones reciben 401 al mismo tiempo, todas esperan el MISMO refresh
let refrescoEnCurso = null;

async function renovarTokens() {
  const refreshToken = sesion.getRefresh();
  if (!refreshToken) return false;

  try {
    const res = await fetch(`${API_URL}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });
    if (!res.ok) return false;
    sesion.guardar(await res.json());
    return true;
  } catch {
    return false;
  }
}

/**
 * Uso: apiFetch('/ordenes')  ·  apiFetch('/auth/login', { method: 'POST', body: { correo, password } })
 * El body se pasa como objeto; aquí se convierte a JSON.
 */
export async function apiFetch(ruta, opciones = {}, reintentar = true) {
  const { body, headers = {}, ...resto } = opciones;
  const token = sesion.getAccess();

  const res = await fetch(`${API_URL}${ruta}`, {
    ...resto,
    headers: {
      ...(body !== undefined && { 'Content-Type': 'application/json' }),
      ...(token && { Authorization: `Bearer ${token}` }),
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  // Token vencido: renovar una vez y repetir la petición original
  if (res.status === 401 && token && reintentar) {
    refrescoEnCurso ??= renovarTokens().finally(() => {
      refrescoEnCurso = null;
    });
    if (await refrescoEnCurso) {
      return apiFetch(ruta, opciones, false);
    }
    // El refresh también venció (7 días): se cierra la sesión
    sesion.limpiar();
    window.dispatchEvent(new Event('sesion-expirada'));
  }

  if (!res.ok) {
    let mensaje = `Error ${res.status}`;
    try {
      const datos = await res.json(); // el ErrorResponse del backend
      mensaje = datos.mensaje || mensaje;
    } catch {
      /* respuesta sin JSON */
    }
    const error = new Error(mensaje);
    error.status = res.status;
    throw error;
  }

  return res.status === 204 ? null : res.json();
}
