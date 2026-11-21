# Omega Titanio · Frontend

Tienda online de videojuegos desarrollada como proyecto semestral de **DSY1104 Desarrollo Fullstack II (Duoc UC)**.

El proyecto pasó por tres etapas:

| Evaluación | Qué se hizo |
|---|---|
| EP1 | Tienda en HTML, CSS y JavaScript vanilla |
| EP2 | Migración a **React** con rutas, panel de administración y pruebas (datos en `localStorage`) |
| **EP3** | **Integración con un backend Spring Boot + MySQL** mediante API REST, autenticación con **JWT**, sesión persistente y restricciones por **rol** |

- **Backend (API REST):** https://github.com/WinterNico/Omega-Titanio-Backend
- **Swagger del backend:** http://localhost:8080/swagger-ui.html (con el backend corriendo)

---

## Equipo

**Sección 002D** · Docente: Víctor Hugo Gómez Atabales

| Integrante | Aporte en la EP3 |
|---|---|
| Nicolás Morales | Backend base: entidades, servicios, controladores CRUD y datos de prueba (repositorio del backend) |
| Exequiel Romero | Seguridad y sesión: JWT en el backend, `apiFetch` con renovación automática del token, `AuthContext` con sesión persistente y rutas protegidas por rol |
| Javier Tapia | Integración con la API: tienda pública, carrito y checkout, mis compras y panel de administración |

---

## Tecnologías

| Área | Tecnología |
|---|---|
| Interfaz | React 19 |
| Servidor de desarrollo y build | Vite 8 |
| Rutas | react-router-dom 7 |
| Estilos | Bootstrap 5.3 |
| Comunicación con el backend | `fetch`, centralizado en `src/services/http.js` |
| Autenticación | JWT (access token + refresh token) emitidos por el backend |
| Pruebas | Jasmine + Karma, cobertura con karma-coverage (Istanbul) |
| Lint | Oxlint |

---

## Cómo ejecutar

El frontend **necesita el backend corriendo**, porque todos los datos vienen de la API.

### 1. Requisitos
- **Node.js** (LTS reciente) y npm
- El **backend** levantado en `http://localhost:8080`. Ver las instrucciones en su [README](https://github.com/WinterNico/Omega-Titanio-Backend).
- **Brave** o **Google Chrome**, solo para correr las pruebas con Karma

### 2. Instalar y levantar

```bash
git clone https://github.com/WinterNico/Proyecto-Semestral-Omega-Titanio.git
cd Proyecto-Semestral-Omega-Titanio/react-app
npm install
npm run dev
```

Abrir **http://localhost:5173**.

> Se necesitan **dos terminales abiertas**: una con el backend (`mvnw.cmd spring-boot:run`) y otra con el frontend (`npm run dev`).

### 3. Usuarios de prueba
Los carga el backend al arrancar. La página de login tiene botones de acceso rápido para cada uno.

| Rol | Correo | Contraseña | Qué puede hacer |
|---|---|---|---|
| Administrador | pedro@duoc.cl | admin123 | Todo: tienda, compras y panel completo |
| Vendedor | vendedor@duoc.cl | vende123 | Panel en **solo lectura**: productos y órdenes |
| Cliente | gamer.chile@gmail.com | gamer123 | Tienda, carrito, compras, perfil y mis compras |

### 4. Otros comandos (desde `react-app/`)

| Comando | Para qué |
|---|---|
| `npm run build` | Genera la versión de producción en `dist/` |
| `npm test` | Corre las pruebas con Karma y genera la cobertura en `coverage/` |
| `npm run lint` | Revisa el código con Oxlint |

### URL de la API
Por defecto el frontend llama a `http://localhost:8080/api/v1`. Para cambiarla, crea un archivo `react-app/.env` con:
```
VITE_API_URL=http://otra-direccion:8080/api/v1
```

### Problemas comunes
| Síntoma | Causa y solución |
|---|---|
| Spinner infinito, "Failed to fetch" o páginas vacías | El backend no está corriendo: levantarlo primero |
| Error de CORS en la consola | El frontend no está en el puerto 5173 (el backend solo acepta ese origen) |
| "Correo o contraseña incorrectos" con un usuario de prueba | El backend no cargó los datos: revisar que la base `omega_titanio` exista |

---

## Integración con el backend

### `apiFetch`: un solo punto de contacto con la API
Todas las llamadas pasan por `src/services/http.js`:

1. Agrega automáticamente el header `Authorization: Bearer <accessToken>`.
2. Convierte el `body` a JSON y la respuesta de JSON a objeto.
3. Si la API responde **401** (token vencido), pide tokens nuevos a `POST /auth/refresh` y **repite la petición original**, sin que el usuario lo note.
4. Si varias peticiones vencen al mismo tiempo, se hace **un solo** refresh compartido.
5. Si el refresh también falló (pasaron más de 7 días), cierra la sesión.
6. Si hay error, lanza una excepción con el mensaje que envía el backend, por ejemplo "Stock insuficiente para...".

```js
const productos = await apiFetch('/productos');
await apiFetch('/ordenes', { method: 'POST', body: { cliente, items, simularFallo } });
```

### Qué endpoint usa cada pantalla

| Pantalla | Endpoint |
|---|---|
| Home, Catálogo | `GET /productos` y `GET /categorias` |
| Ofertas | `GET /productos?oferta=true` |
| Categorías | `GET /categorias` y `GET /productos` |
| Detalle de juego | `GET /productos/{id}` (más `GET /productos` para los juegos relacionados) |
| Login / Registro | `POST /auth/login` · `POST /auth/registro` |
| Al abrir o recargar la app | `GET /auth/me` (valida la sesión) |
| Checkout | `POST /ordenes` |
| Mis compras | `GET /ordenes/mias` |
| Admin · Dashboard | `GET /productos`, `GET /ordenes` y `GET /usuarios` (este último solo admin) |
| Admin · Productos | `GET / POST / PUT / DELETE /productos` |
| Admin · Usuarios | `GET / POST / PUT / DELETE /usuarios`, `GET /usuarios/run/{run}` |
| Admin · Órdenes | `GET /ordenes` |
| Admin · Detalle de orden | `GET /ordenes/{id}` |
| Admin · Detalle de producto | `GET /productos/{id}` |

Al comprar, el frontend envía **solo el id y la cantidad** de cada producto. El precio y el descuento de stock los resuelve el backend.

---

## Sesión y seguridad

### Sesión persistente (`AuthContext`)
- Al hacer login se guardan en `localStorage` el **access token** (15 min), el **refresh token** (7 días) y los datos básicos del usuario. **La contraseña nunca se guarda.**
- Al **recargar la página**, la sesión se lee desde `localStorage` y se confirma con `GET /auth/me`. Mientras se confirma, las rutas protegidas muestran un spinner para no "saltar" al login.
- Si el token fue rechazado, la sesión se borra. Si el backend está apagado, se mantiene la sesión guardada.
- **Cerrar sesión** borra los tokens del navegador, porque la API es *stateless*.

### Restricciones por rol (`RutaProtegida`)
Las rutas se protegen en `App.jsx` con el rol requerido:

```jsx
<Route element={<RutaProtegida roles={['admin', 'vendedor']} />}>   // panel
<Route element={<RutaProtegida roles={['admin']} />}>               // usuarios, crear/editar
<Route element={<RutaProtegida roles={['cliente', 'admin']} />}>    // checkout
<Route element={<RutaProtegida />}>                                 // perfil, mis compras (cualquier sesión)
```

| Situación | Qué pasa |
|---|---|
| Sin sesión entra a una ruta protegida | Va al login y, después de entrar, vuelve a la página que quería |
| Cliente escribe `/admin` en la URL | Vuelve a la tienda |
| Vendedor escribe `/admin/usuarios` | Vuelve al panel |
| Vendedor en el panel | Ve la lista y el detalle de productos y de órdenes (botón **Ver**), pero no el menú Usuarios ni los botones de crear, editar o eliminar |
| Navbar | El botón **Panel** aparece solo para admin y vendedor |

Las restricciones del frontend mejoran la experiencia, pero **la seguridad real está en el backend**: aunque alguien se salte la interfaz, la API responde 401 o 403.

---

## Estructura del proyecto

```
react-app/
├── src/
│   ├── services/
│   │   └── http.js             # apiFetch: token, renovación y errores
│   ├── context/
│   │   ├── AuthContext.jsx     # Sesión: login, registro, logout, persistencia y roles
│   │   └── CartContext.jsx     # Carrito y registro de la compra (POST /ordenes)
│   ├── components/
│   │   ├── layout/             # Navbar, Footer, AdminLayout, RutaProtegida
│   │   └── common/             # ProductCard, MetricCard
│   ├── pages/                  # Páginas de la tienda
│   │   └── admin/              # Dashboard, Productos, Usuarios, Órdenes y sus detalles
│   ├── utils/
│   │   └── validaciones.js     # RUN, correo, región/comuna, formato de precios
│   └── data/
│       └── db.js               # Repositorio localStorage de la EP2 (ya no lo usan las páginas)
├── tests/
│   ├── admin.spec.js           # Validaciones y repositorio
│   └── components.spec.js      # MetricCard y RutaProtegida por rol
├── karma.conf.cjs
└── package.json
```

---

## Pruebas

```bash
npm test
```

**Resultado:** 29 pruebas, todas exitosas.

- `admin.spec.js`: validaciones (RUN, correo, precios) y repositorio.
- `components.spec.js`: `MetricCard` y `RutaProtegida`:
  - sin sesión va al login;
  - el cliente vuelve a la tienda;
  - el admin y el vendedor entran al panel;
  - el vendedor no entra a usuarios, pero el admin sí.

| Cobertura | Sentencias | Ramas | Funciones | Líneas |
|---|---|---|---|---|
| Total | 95,31 % | 79,41 % | 100 % | 100 % |

La integración con la API (login, compras, permisos por rol y renovación del token) se probó manualmente con el backend corriendo; el detalle está en el *Documento de APIs e Integración*.

---

## Funcionalidades

**Tienda (visitante y cliente)**
- Home, Catálogo con búsqueda y filtros, Detalle de juego, Categorías, Ofertas, Noticias, Nosotros y Contacto.
- Registro e inicio de sesión contra la API, con validación de RUN, correo y región/comuna.
- Carrito de compras y checkout con resultado exitoso o fallido (opción para simular un pago rechazado).
- Mis compras y Perfil.

**Panel de administración**
- **Admin:** dashboard con métricas reales, productos (listar, ver detalle, crear, editar, eliminar), usuarios (listar, crear, editar, eliminar) y órdenes (listar y ver detalle).
- **Vendedor:** dashboard, lista y detalle de productos y de órdenes, en modo solo lectura.

---

## Limitaciones conocidas

- **Pago simulado:** no hay pasarela de pago real.
- **Entorno local:** frontend y backend están configurados para `localhost`; no hay despliegue en un servidor público.
- **Tokens en `localStorage`:** es una práctica común en una SPA, pero en producción se recomendaría usar cookies `HttpOnly` para el refresh token.
- **Noticias:** son contenido estático del frontend, no vienen de la API.
