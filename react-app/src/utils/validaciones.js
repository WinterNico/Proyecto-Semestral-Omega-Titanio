// src/utils/validaciones.js

const REGEX_EMAIL = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;
const REGEX_RUN = /^[0-9]{7,8}[0-9Kk]$/;

export function validarRun(run) {
  if (!run || typeof run !== 'string') return false;
  const limpio = run.replace(/[.-]/g, '').trim().toUpperCase();
  return REGEX_RUN.test(limpio);
}

export function validarCorreo(correo) {
  if (!correo || typeof correo !== 'string') return false;
  return REGEX_EMAIL.test(correo.trim());
}

export function calcularPrecioFinal(producto) {
  if (!producto) return 0;
  if (producto.oferta && producto.descuento > 0) {
    return Math.round(producto.precio * (1 - producto.descuento / 100));
  }
  return Number(producto.precio) || 0;
}

export function formatearCLP(valor) {
  const num = Number(valor) || 0;
  if (num === 0) return 'Gratis';
  return `$${num.toLocaleString('es-CL')}`;
}

export function formatearMontoBoleta(valor) {
  const num = Number(valor) || 0;
  return `$${num.toLocaleString('es-CL')}`;
}

export const REGIONES_COMUNAS = [
  {
    nombre: 'Región Metropolitana de Santiago',
    comunas: ['Santiago', 'Cerrillos', 'Maipú', 'Providencia', 'Puente Alto', 'Las Condes', 'Pudahuel'],
  },
  {
    nombre: 'Región de la Araucanía',
    comunas: ['Temuco', 'Padre Las Casas', 'Villarrica', 'Pucón'],
  },
  {
    nombre: 'Región de Ñuble',
    comunas: ['Chillán', 'Chillán Viejo', 'San Carlos', 'Linares'],
  },
  {
    nombre: 'Región del Biobío',
    comunas: ['Concepción', 'Talcahuano', 'San Pedro de la Paz', 'Los Ángeles'],
  },
];
