# Steam Store Project :D

Plataforma web de distribución digital de videojuegos (frontend estático).

## 👥 Equipo de Desarrollo 
* Exequiel Romero (Javascript)
* Nicolás Morales (HTML)
* Javier Tapia (CSS)

## 🛠️ Tecnologías Utilizadas
* **HTML5:** Estructuración semántica con vistas divididas (Tienda y Panel de Administración).
* **CSS3:** Diseño responsivo, estilos personalizados y estética visual inspirada en tiendas de gaming.
* **Vanilla JavaScript:** Lógica de negocio, manipulación del DOM y persistencia de datos.

## ✨ Características Principales

### 1. Interfaz de Cliente (Tienda)
* **Catálogo Dinámico:** Visualización de juegos en tendencia con detalles de precio y categoría.
* **Carrito de Compras:** Sistema funcional que utiliza **LocalStorage** para mantener los productos guardados tras recargar la página. Calcula subtotales, aplica deducciones y suma totales en tiempo real.
* **Formularios con Validación Estricta:** 
  * Validación matemática del RUN chileno (sin puntos ni guiones).
  * Filtro de dominios de correo permitidos (`@duoc.cl`, `@profesor.duoc.cl`, `@gmail.com`).
  * Carga dinámica de selectores anidados (Algunas regiones y comunas).

### 2. Panel de Administración
* **Dashboard Interactivo:** Simulación visual de métricas de ventas, stock y usuarios registrados.
* **Gestión de Inventario y Cuentas:** Formularios para agregar nuevos productos y usuarios con validación de tipos de datos, previniendo valores negativos en precios/stock y aplicando límites de caracteres.
* **Simulación de Borrado:** Eliminación de filas en tiempo real desde el DOM para simular la gestión de tablas.

## 🚀 Instalación y Uso
Al ser un proyecto de frontend estático, **no requiere instalación de dependencias ni servidores locales**.
1. Clona este repositorio o descarga los archivos.
2. Abre el archivo `index.html` de la carpeta raíz en cualquier navegador web moderno (Brave, Chrome, Firefox, Edge).
3. Navega utilizando los enlaces de la barra superior para explorar la tienda o acceder al `/admin/index.html`.