// src/data/db.js

// Datos iniciales: se usan solo la primera vez, cuando no hay nada guardado.
const SEED = {
  productos: [
    { id: 1, nombre: 'The Legend of Zelda', precio: 5999, categoriaId: 1, stock: 10, oferta: false, imagen: '/img/zelda.jpg' },
    { id: 2, nombre: 'Super Mario Odyssey', precio: 4999, categoriaId: 1, stock: 5, oferta: true, descuento: 20, imagen: '/img/mario.jpg' },
    { id: 3, nombre: 'Minecraft', precio: 2695, categoriaId: 2, stock: 0, oferta: false, imagen: '/img/minecraft.jpg' },
    { id: 4, nombre: 'Fortnite', precio: 0, categoriaId: 2, stock: 99, oferta: false, imagen: '/img/fortnite.jpg' },
  ],
  categorias: [
    { id: 1, nombre: 'Aventura', slug: 'aventura' },
    { id: 2, nombre: 'Multijugador', slug: 'multijugador' },
  ],
  usuarios: [
    { id: 1, nombre: 'Pedro', apellidos: 'Hacker', correo: 'pedro@duoc.cl', rol: 'admin', run: '12345678-5' },
  ],
  ordenes: [],
};

// Crea un repositorio CRUD para una colección, con persistencia en LocalStorage.
function crearRepositorio(nombre, seed) {
  const clave = `omega_${nombre}`;

  const leer = () => {
    try {
      const raw = localStorage.getItem(clave);
      return raw ? JSON.parse(raw) : structuredClone(seed);
    } catch {
      return structuredClone(seed);
    }
  };

  const guardar = (items) => localStorage.setItem(clave, JSON.stringify(items));

  const siguienteId = (items) =>
    items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1;

  return {
    // Leer
    listar() {
      return leer();
    },
    obtener(id) {
      return leer().find((i) => i.id === Number(id)) ?? null;
    },
    buscar(filtro) {
      return leer().filter((i) =>
        Object.entries(filtro).every(([campo, valor]) => i[campo] === valor)
      );
    },

    // Crear
    crear(datos) {
      const items = leer();
      const nuevo = { ...datos, id: siguienteId(items) };
      items.push(nuevo);
      guardar(items);
      return nuevo;
    },

    // Actualizar
    actualizar(id, cambios) {
      const items = leer();
      const idx = items.findIndex((i) => i.id === Number(id));
      if (idx === -1) return null;
      items[idx] = { ...items[idx], ...cambios, id: items[idx].id };
      guardar(items);
      return items[idx];
    },

    // Eliminar
    eliminar(id) {
      const items = leer();
      const filtrados = items.filter((i) => i.id !== Number(id));
      guardar(filtrados);
      return filtrados.length < items.length;
    },

    // Reiniciar a los datos iniciales (útil para pruebas)
    reiniciar() {
      localStorage.removeItem(clave);
    },
  };
}

export const productosRepo = crearRepositorio('productos', SEED.productos);
export const categoriasRepo = crearRepositorio('categorias', SEED.categorias);
export const usuariosRepo = crearRepositorio('usuarios', SEED.usuarios);
export const ordenesRepo = crearRepositorio('ordenes', SEED.ordenes);

// Ejemplo de uso desde un componente:
//   import { productosRepo } from '../data/db.js';
//   const productos = productosRepo.listar();
//   productosRepo.crear({ nombre: 'Hollow Knight', precio: 1499, ... });