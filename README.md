# Omega Titanio

Tienda online de videojuegos desarrollada como proyecto semestral de **DSY1104 – Desarrollo Fullstack II (Duoc UC)**. La primera versión fue construida con HTML, CSS y JavaScript vanilla; esta versión la migra a **React**, incorporando rutas protegidas, panel de administración, persistencia en `localStorage` y pruebas unitarias con Jasmine + Karma.

> Evaluación Parcial 2 · Equipo de 3 integrantes.

---

## Tabla de contenidos

1. [Descripción](#descripción)
2. [Tecnologías](#tecnologías)
3. [Requisitos previos](#requisitos-previos)
4. [Instalación](#instalación)
5. [Ejecución](#ejecución)
6. [Pruebas y cobertura](#pruebas-y-cobertura)
7. [Estructura del proyecto](#estructura-del-proyecto)
8. [Funcionalidades](#funcionalidades)
9. [Roles del equipo](#roles-del-equipo)
10. [Usuarios de prueba](#usuarios-de-prueba)
11. [Limitaciones conocidas](#limitaciones-conocidas)

---

## Descripción

**Omega Titanio** es una tienda de videojuegos con dos áreas:

- **Tienda (cliente):** navegación por catálogo, categorías, ofertas y noticias; detalle de cada juego; registro e inicio de sesión con validaciones (RUN chileno, correo, región/comuna); carrito de compras; checkout simulado; historial de compras y perfil de usuario.
- **Panel de administración (solo rol `admin`):** dashboard con métricas calculadas desde la base de datos local, y gestión (listado, alta y edición) de productos y usuarios.

No existe backend: todos los datos se almacenan en el navegador mediante `localStorage`, a través de repositorios CRUD definidos en `src/data/db.js`.

## Tecnologías

| Área | Tecnología |
|---|---|
| Interfaz | React 19 |
| Empaquetado / dev server | Vite 8 |
| Enrutamiento | react-router-dom 7 |
| Estilos | Bootstrap 5.3.8 |
| Runtime | Node 24.x |
| Pruebas | Jasmine + Karma |
| Cobertura | karma-coverage (Istanbul) |
| Bundling de pruebas | karma-esbuild |
| Persistencia | `localStorage` (claves `omega_*`) |

## Requisitos previos

- **Node.js 24.x** y **npm**.
- **Brave** o **Google Chrome** instalado. Karma usa Brave si lo encuentra; de lo contrario, usa Chrome Headless.
- Git.

## Instalación

```bash
git clone https://github.com/WinterNico/Proyecto-Semestral-Omega-Titanio.git
cd Proyecto-Semestral-Omega-Titanio
git checkout main
cd react-app
npm install
```

## Ejecución

Desde la carpeta `react-app/`:

```bash
npm run dev
```

Vite mostrará la URL local (normalmente `http://localhost:5173`). Los datos iniciales se cargan automáticamente en `localStorage` la primera vez que se abre la aplicación.

Para reiniciar los datos a su estado original, borra las claves `omega_*` desde las herramientas de desarrollo del navegador (Application → Local Storage) y recarga la página.

## Pruebas y cobertura

Desde `react-app/`:

```bash
npm test
```

Esto ejecuta Karma con Jasmine, genera el reporte de cobertura con Istanbul y lo guarda en `react-app/coverage/` (abre `coverage/index.html` o el subdirectorio generado para ver el detalle por archivo).

**Última ejecución:** 26 pruebas, todas exitosas.

| Archivo | Sentencias | Ramas | Funciones | Líneas |
|---|---|---|---|---|
| **Total** | 95,31 % | 79,41 % | 100 % | 100 % |
| `src/data/db.js` | 100 % | 83,33 % | 100 % | 100 % |
| `src/utils/validaciones.js` | 85,71 % | 77,27 % | 100 % | 100 % |

Archivos de prueba:

- `tests/admin.spec.js`: repositorios de `db.js` y validaciones.
- `tests/components.spec.js`: componentes `MetricCard` y `RutaProtegida`.

> **Nota:** los componentes (`MetricCard`, `RutaProtegida`) tienen pruebas, pero no están instrumentados en el reporte de cobertura. Las páginas del panel admin se validaron manualmente (ver [Limitaciones conocidas](#limitaciones-conocidas)).

La configuración está en `react-app/karma.conf.cjs`.

## Estructura del proyecto

```
react-app/
├── src/
│   ├── pages/                  # Páginas de la tienda
│   │   └── admin/              # Páginas del panel de administración
│   ├── components/
│   │   ├── layout/             # Navbar, Footer, AdminLayout, RutaProtegida
│   │   └── common/             # ProductCard, MetricCard
│   ├── context/
│   │   └── CartContext.jsx     # Estado global: carrito y sesión
│   ├── data/
│   │   └── db.js               # Repositorios CRUD sobre localStorage
│   └── utils/
│       └── validaciones.js     # RUN, correo, región/comuna, etc.
├── tests/
│   ├── admin.spec.js
│   └── components.spec.js
├── karma.conf.cjs
└── package.json
```

## Funcionalidades

**Tienda**

- Home, Catálogo, Detalle de juego, Categorías, Ofertas, Noticias, Nosotros y Contacto.
- Registro y Login con validación de RUN, correo y selección de región/comuna.
- Carrito de compras con estado compartido (`CartContext`).
- Checkout simulado con resultados de compra exitosa o fallida.
- Mis compras y Perfil.

**Administración** (rutas protegidas por `RutaProtegida`, solo rol `admin`)

- Dashboard con métricas obtenidas desde `db.js`.
- Productos: listado, alta y edición.
- Usuarios: listado, alta y edición.

## Roles del equipo

| Integrante | Responsabilidad |
|---|---|
| **Integrante 1: Nicolás Morales (Nico)** | Base del proyecto: `data/db.js`, contexto, validaciones y órdenes. |
| **Integrante 2: Javier Tapia** | Tienda (páginas y componentes del cliente). |
| **Integrante 3: Exequiel Romero (Exexd39)** | Panel de administración y pruebas. |

## Usuarios de prueba

> ⚠️ Completar con las credenciales reales definidas en los datos iniciales de `src/data/db.js`.

| Rol | Correo | Contraseña |
|---|---|---|
| Administrador | `pedro@duoc.cl` | `admin123` |
| Cliente | `gamer.chile@gmail.com` | `gamer123` |

Si no existen usuarios precargados, puedes crear una cuenta cliente desde **Registro**. Para obtener un usuario administrador, créalo desde el panel admin con una cuenta admin existente o modifica el rol en `omega_usuarios` (`localStorage`).

## Limitaciones conocidas

- **Sin backend:** los datos viven en `localStorage`; se pierden al limpiar el navegador y no se comparten entre dispositivos ni usuarios.
- **Seguridad simulada:** las contraseñas y la sesión se guardan en el navegador sin cifrado; la protección de rutas es solo del lado del cliente. No es apto para producción.
- **Checkout simulado:** no hay pasarela de pago real.
- **Cobertura:** 79,41 % en ramas; `validaciones.js` tiene ramas sin cubrir (85,71 % sentencias, 77,27 % ramas).
- **Componentes no instrumentados:** `MetricCard` y `RutaProtegida` se prueban, pero no aparecen en el reporte de cobertura.
- **Páginas admin sin pruebas automatizadas:** se validaron manualmente.
- **Navegador de pruebas:** Karma requiere Brave o Chrome instalado en el equipo.

---

**Commit final:** `2f539d7` (rama `main`).