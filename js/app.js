// AJUSTES GLOBALES //
document.addEventListener('DOMContentLoaded', () =>{
    // Si no se encuentra un carrito, lo creamos
    let carrito = JSON.parse(localStorage.getItem('steam_carrito')) || [];

    // Se actualiza el contador que esta en el header
    const actualizarContadorHeader = () =>{
        const contador = document.getElementById('header-cart-count');

        if (contador){
            // Sumamos la cantidad de todos los juegos del carro 
            const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
            contador.textContent = totalItems;
        }
    }

    // esto se va a ejecuta apenas cargue la pag
    actualizarContadorHeader();

    // AÑADIR A CARRITO //
    const botonesAñadir = document.querySelectorAll('button[data-id]')
    botonesAñadir.forEach(boton => {
        boton.addEventListener('click', () => {
            // Por aca se extrae todo lo que esta en el html, que serian para datos nomas
            const id = boton.getAttribute('data-id');
            const nombre = boton.getAttribute('data-name')
            const precio = parseInt(boton.getAttribute('data-price'))

            const juegoExistente = carrito.find(item => item.id === id);

            // Validacion del juego en carro
            if (juegoExistente){
                juegoExistente.cantidad += 1;
            }else{
                // Este seria un juego nuevo
                carrito.push({
                    id: id,
                    nombre: nombre,
                    precio: precio,
                    cantidad: 1
                });
            }

            // se empaqueta y actualiza el storage
            localStorage.setItem('steam_carrito', JSON.stringify(carrito));
            actualizarContadorHeader();

            alert(`¡Se ha añadido ${nombre} al carrito! :D`);
        });
    });

    // Logica para admin - productos //
    const formAdminProducto = document.getElementById('form-admin-producto');
    if (formAdminProducto) {
        formAdminProducto.addEventListener('submit', (e) => {
            e.preventDefault();

            const codigo = document.getElementById('prod-codigo').value;
            const precio = parseFloat(document.getElementById('prod-precio').value);
            const stock = parseInt(document.getElementById('prod-stock').value);
            const errorCodigo = document.getElementById('error-prod-codigo');
            const errorPrecio = document.getElementById('error-prod-precio');
            const errorStock = document.getElementById('error-prod-stock');

            let esValido = true;
            errorCodigo.textContent = "";
            errorPrecio.textContent = "";
            errorStock.textContent = "";

            if (codigo.trim().length < 3) {
                errorCodigo.textContent = "El código debe tener al menos 3 caracteres.";
                esValido = false;
            }
            if (precio < 0 || isNaN(precio)) {
                errorPrecio.textContent = "El precio no puede ser negativo.";
                esValido = false;
            }
            if (stock < 0 || isNaN(stock)) {
                errorStock.textContent = "El stock inicial no puede ser negativo.";
                esValido = false;
            }
            if (esValido) {
                alert("¡Producto registrado en el inventario!");
                formAdminProducto.reset();
            }
        });
    }

    // Eliminar en admin producto
    const botonesEliminar = document.querySelectorAll('.btn-danger');
    botonesEliminar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            const confirmado = confirm("¿Estás seguro de que deseas eliminar este registro del sistema?");

            if (confirmado) {
                const fila = e.target.closest('tr');

                if (fila) {
                    fila.remove();
                    alert("Registro eliminado con éxito.");
                } 
            } 
        }); 
    }); 
});