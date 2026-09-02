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
    const botonesAñadir = document.querySelector('button[data-id]')
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

            alert('¡Se ha añadido ${nombre} al carrito! :D')
        });
    });

});