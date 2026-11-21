// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { apiFetch } from '../services/http.js';

const CartContext = createContext();
const CART_KEY = 'omega_carrito';
const LAST_ORDER_KEY = 'omega_ultima_orden';

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [lastOrder, setLastOrder] = useState(() => {
    try {
      const raw = localStorage.getItem(LAST_ORDER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Error guardando carrito:', e);
    }
  }, [cart]);

  const addToCart = (product, quantity = 1) => {
    const qty = Math.max(1, Number(quantity) || 1);
    setCart((prev) => {
      const idx = prev.findIndex((i) => String(i.id) === String(product.id));
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + qty };
        return copy;
      }
      return [...prev, { ...product, quantity: qty }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((i) => String(i.id) !== String(productId)));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((i) => (String(i.id) === String(productId) ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => setCart([]);

  const totalItems = cart.reduce((acc, i) => acc + i.quantity, 0);

  const totalPrice = cart.reduce((acc, i) => {
    const precioFinal =
      i.oferta && i.descuento
        ? Math.round(i.precio * (1 - i.descuento / 100))
        : i.precio;
    return acc + precioFinal * i.quantity;
  }, 0);

  // Envía la orden al backend (POST /ordenes); el backend calcula precios y descuenta stock
  const registrarCompra = async (datosCliente, simularFallo = false) => {
    const payload = {
      cliente: datosCliente,
      items: cart.map((i) => ({ productoId: i.id, cantidad: i.quantity })),
      simularFallo,
    };

    const nuevaOrden = await apiFetch('/ordenes', {
      method: 'POST',
      body: payload,
    });

    setLastOrder(nuevaOrden);
    try {
      localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(nuevaOrden));
    } catch (e) {
      console.error('Error guardando última orden:', e);
    }

    if (nuevaOrden.estado !== 'FALLIDO') {
      clearCart();
    }

    return nuevaOrden;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        lastOrder,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        registrarCompra,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
