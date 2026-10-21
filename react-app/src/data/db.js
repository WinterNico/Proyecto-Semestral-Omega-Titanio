// src/data/db.js

// Datos iniciales: se usan solo la primera vez, cuando no hay nada guardado.
const SEED = {
  productos: [
    {
      id: 1,
      codigo: 'GAME-001',
      nombre: 'Monster Hunter Wilds',
      precio: 27990,
      categoriaId: 1,
      stock: 15,
      oferta: true,
      descuento: 20,
      imagen: '/assets/img/mhwilds2.jpg',
      capturas: [
        '/assets/img/ssmhw.jpg',
        '/assets/img/ss2mhw.jpg',
        '/assets/img/ss3mhw.jpg',
        '/assets/img/ss4mhw.jpg',
      ],
      trailer: 'https://www.youtube.com/embed/zPwK-h8RHWs',
      descripcion:
        'Explora un mundo vivo y salvaje lleno de monstruos colosales y ecosistemas dinámicos con clima cambiante.',
    },
    {
      id: 2,
      codigo: 'GAME-002',
      nombre: 'Marvel Rivals',
      precio: 0,
      categoriaId: 2,
      stock: 99,
      oferta: false,
      descuento: 0,
      imagen: '/assets/img/marvelrivals.jpg',
      capturas: ['/assets/img/marvelrivals.jpg', '/assets/img/GWpeEsvXcAATxfL.jpg'],
      trailer: 'https://www.youtube.com/embed/zPwK-h8RHWs',
      descripcion:
        'Hero Shooter multijugador por equipos con superhéroes de Marvel, habilidades combinadas y escenarios destructibles.',
    },
    {
      id: 3,
      codigo: 'GAME-003',
      nombre: 'DB: Sparking! ZERO',
      precio: 45990,
      categoriaId: 3,
      stock: 20,
      oferta: false,
      descuento: 0,
      imagen: '/assets/img/sparkingsueno.jpg',
      capturas: ['/assets/img/sparkingsueno.jpg'],
      trailer: 'https://www.youtube.com/embed/zPwK-h8RHWs',
      descripcion:
        'El regreso de la saga Budokai Tenkaichi con combates 3D a toda velocidad y más de 180 luchadores.',
    },
    {
      id: 4,
      codigo: 'GAME-004',
      nombre: 'Cyberpunk 2077',
      precio: 29990,
      categoriaId: 4,
      stock: 12,
      oferta: true,
      descuento: 25,
      imagen: '/assets/img/cyberbug7777.jpg',
      capturas: ['/assets/img/cyberbug7777.jpg'],
      trailer: 'https://www.youtube.com/embed/zPwK-h8RHWs',
      descripcion:
        'RPG de acción y aventura en mundo abierto ambientado en Night City, una megalópolis futurista.',
    },
    {
      id: 5,
      codigo: 'GAME-005',
      nombre: 'Elden Ring',
      precio: 38990,
      categoriaId: 4,
      stock: 8,
      oferta: false,
      descuento: 0,
      imagen: '/assets/img/eldenrign.jpg',
      capturas: ['/assets/img/eldenrign.jpg'],
      trailer: 'https://www.youtube.com/embed/zPwK-h8RHWs',
      descripcion:
        'Álzate, Sinluz, y recorre las Tierras Intermedias en un épico RPG de acción y fantasía oscura.',
    },
    {
      id: 6,
      codigo: 'GAME-006',
      nombre: 'Hollow Knight',
      precio: 8500,
      categoriaId: 1,
      stock: 3,
      oferta: true,
      descuento: 15,
      imagen: '/assets/img/hollowknight.jpg',
      capturas: ['/assets/img/hollowknight.jpg'],
      trailer: 'https://www.youtube.com/embed/zPwK-h8RHWs',
      descripcion:
        'Forja tu camino en Hallownest, una aventura clásica de acción lateral 2D a través de un reino de insectos.',
    },
  ],
  categorias: [
    { id: 1, nombre: 'Aventura / Acción', slug: 'aventura', imagen: '/assets/img/mhwilds2.jpg' },
    { id: 2, nombre: 'Multijugador / Shooter', slug: 'multijugador', imagen: '/assets/img/marvelrivals.jpg' },
    { id: 3, nombre: 'Lucha / Anime', slug: 'lucha', imagen: '/assets/img/sparkingsueno.jpg' },
    { id: 4, nombre: 'RPG / Mundo Abierto', slug: 'rpg', imagen: '/assets/img/cyberbug7777.jpg' },
  ],
  usuarios: [
    {
      id: 1,
      nombre: 'Pedro',
      apellidos: 'Hacker',
      correo: 'pedro@duoc.cl',
      password: 'admin123',
      rol: 'admin',
      run: '19011022K',
      calle: 'Los Crisantemos, Edificio Norte',
      departamento: 'Depto 603',
      region: 'Región Metropolitana de Santiago',
      comuna: 'Cerrillos',
    },
    {
      id: 2,
      nombre: 'Cliente',
      apellidos: 'Gamer',
      correo: 'gamer.chile@gmail.com',
      password: 'gamer123',
      rol: 'cliente',
      run: '209876543',
      calle: 'Av. Pajaritos 3100',
      departamento: 'Depto 402',
      region: 'Región Metropolitana de Santiago',
      comuna: 'Maipú',
    },
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

  const guardar = (data) => {
    try {
      localStorage.setItem(clave, JSON.stringify(data));
    } catch (e) {
      console.error(`Error guardando ${clave}:`, e);
    }
  };

  return {
    obtenerTodos: () => leer(),

    obtenerPorId: (id) => leer().find((item) => String(item.id) === String(id)) || null,

    crear: (item) => {
      const lista = leer();
      const nuevoId = lista.length > 0 ? Math.max(...lista.map((x) => Number(x.id) || 0)) + 1 : 1;
      const nuevo = { ...item, id: nuevoId };
      lista.push(nuevo);
      guardar(lista);
      return nuevo;
    },

    actualizar: (id, campos) => {
      const lista = leer();
      const idx = lista.findIndex((item) => String(item.id) === String(id));
      if (idx === -1) return null;
      lista[idx] = { ...lista[idx], ...campos };
      guardar(lista);
      return lista[idx];
    },

    eliminar: (id) => {
      const lista = leer();
      const filtrada = lista.filter((item) => String(item.id) !== String(id));
      if (filtrada.length === lista.length) return false;
      guardar(filtrada);
      return true;
    },

    reset: () => guardar(structuredClone(seed)),
  };
}

export const db = {
  productos: crearRepositorio('productos', SEED.productos),
  categorias: crearRepositorio('categorias', SEED.categorias),
  usuarios: crearRepositorio('usuarios', SEED.usuarios),
  ordenes: crearRepositorio('ordenes', SEED.ordenes),

  resetTodo: () => {
    db.productos.reset();
    db.categorias.reset();
    db.usuarios.reset();
    db.ordenes.reset();
  },
};
