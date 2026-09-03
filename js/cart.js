document.addEventListener('DOMContentLoaded', () => {
    // Se atrapa la caja donde se inyecta el juego
    const contenedorCarrito = document.getElementById('cart-items-container');

    // esto por si no estamos en la pagina del carrito 
    if (!contenedorCarrito){
        return;  
    } 

    // Funcion principal de lectura 
    const renderizarCarrito = () => {
        // leemos el localstorage
        let carrito = JSON.parse(localStorage.getItem('steam_carrito')) || [];

        contenedorCarrito.innerHTML = '';
        let total = 0;

        if (carrito.lenght === 0){
            contenedorCarrito.innerHTML = '<p style="padding: 20px; color: white;">Tu carrito está vacío. ¡Ve al catálogo a explorar juegos!</p>';
            document.getElementById('summary-subtotal').textContent = '$0'
            document.getElementById('summary-total').textContent = '$0';
            return;
        }

        // en caso de que haya juegos recorremos el listado 
        carrito.forEach((producto, index) => {
            total += (producto.precio * producto.cantidad)

            // aca creamos el article para el html
            const fila = document.createElement('article');
            fila.className = 'cart-item-row';

            fila.innerHTML = `
                <div style="width: 120px; height: 70px; background: #1b2838; display:flex; align-items:center; justify-content:center; color:#66c0f4; border-radius:4px; font-weight:bold;">IMG</div>
                <div class="cart-item-info">
                    <h3 class="cart-item-title">${producto.nombre}</h3>
                    <p class="cart-item-desc">Juego Digital - Clave Steam PC</p>
                </div>
                <div class="cart-item-price">$${producto.precio.toLocaleString('es-CL')}</div>
                <div class="cart-item-quantity">
                    <button type="button" class="btn-qty-minus" onclick="cambiarCantidad(${index}, -1)">-</button>
                    <input type="number" class="item-qty-input" value="${producto.cantidad}" readonly>
                    <button type="button" class="btn-qty-plus" onclick="cambiarCantidad(${index}, 1)">+</button>
                </div>
                <button type="button" class="btn-remove-item" onclick="eliminarProducto(${index})">&times;</button>
            `;
            // Lo inyectamos en la pantalla
            contenedorCarrito.appendChild(fila);
        });
        
        // aca actualizamos los textos de totales con formato clp
        document.getElementById('summary-subtotal').textContent = `$${total.toLocaleString('es-CL')}`;
        document.getElementById('summary-total').textContent = `$${total.toLocaleString('es-CL')}`; 

    }
    
    // se ejecuta la funcion apenas entrar pagina
    renderizarCarrito();
    const btnVaciar = document.getElementById('btn-clear-cart');
    if(btnVaciar) {
        btnVaciar.addEventListener('click', () => {
            if(confirm("¿Estás seguro de que quieres vaciar todo el carrito?")) {
                localStorage.removeItem('steam_carrito');
                window.location.reload();
            }
        });
    }
});

// PARA BOTONES ELIMINAR Y SUMAR
window.cambiarCantidad = (index, cambio) => {
    let carrito = JSON.parse(localStorage.getItem('steam_carrito')) || [];
    carrito[index].cantidad += cambio;
    
    // si cantidad llega a 0 se borra el producto del arreglo
    if (carrito[index].cantidad <= 0) {
        carrito.splice(index, 1); 
    }
    
    // se guarda cambios y recarga pagina
    localStorage.setItem('steam_carrito', JSON.stringify(carrito));
    window.location.reload(); 
};

// aca se corta un elelmento en la posicion index
window.eliminarProducto = (index) => {
    let carrito = JSON.parse(localStorage.getItem('steam_carrito')) || [];
    carrito.splice(index, 1); 
    localStorage.setItem('steam_carrito', JSON.stringify(carrito));
    window.location.reload(); 
};