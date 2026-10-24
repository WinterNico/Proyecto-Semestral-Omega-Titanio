// src/context/CartContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../data/db.js';

const CartContext = createContext();
const CART_KEY = 'omega_carrito';
const SESSION_KEY = 'omega_sesion_activa';
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

  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
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

  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem(SESSION_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(SESSION_KEY);
      }
    } catch (e) {
      console.error('Error guardando sesión:', e);
    }
  }, [user]);

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

  // Funciones de sesión conectadas a db.usuarios
  const login = (correo, password) => {
    const usuarios = db.usuarios.obtenerTodos();
    const encontrado = usuarios.find(
      (u) =>
        (u.correo || u.email || '').toLowerCase() === correo.trim().toLowerCase() &&
        (!u.password || u.password === password)
    );
    if (!encontrado) {
      return { ok: false, error: 'Correo o contraseña incorrectos.' };
    }
    setUser(encontrado);
    return { ok: true, usuario: encontrado };
  };

  const logout = () => {
    setUser(null);
  };

  const registerUser = (datos) => {
    const usuarios = db.usuarios.obtenerTodos();
    const existe = usuarios.some(
      (u) =>
        (u.correo || '').toLowerCase() === datos.correo.trim().toLowerCase() ||
        String(u.run || '').toUpperCase() === datos.run.trim().toUpperCase()
    );
    if (existe) {
      return { ok: false, error: 'El RUN o correo ya se encuentra registrado.' };
    }
    const creado = db.usuarios.crear({
      ...datos,
      rol: 'cliente',
    });
    setUser(creado);
    return { ok: true, usuario: creado };
  };

  const registrarCompra = (datosCliente, simularFallo = false) => {
    const ordenesActuales = db.ordenes.obtenerTodos();
    const nroOrden = `202407${String(ordenesActuales.length + 5).padStart(2, '0')}`;
    const codigoOrden = `ORDER${Math.floor(10000 + Math.random() * 90000)}`;

    const itemsDetalle = cart.map((i) => {
      const precioUnitario =
        i.oferta && i.descuento
          ? Math.round(i.precio * (1 - i.descuento / 100))
          : i.precio;
      return {
        ...i,
        precioUnitario,
        subtotal: precioUnitario * i.quantity,
      };
    });

    const nuevaOrden = db.ordenes.crear({
      nroOrden,
      codigoOrden,
      fecha: new Date().toLocaleString('es-CL'),
      estado: simularFallo ? 'FALLIDO' : 'EXITOSO',
      usuarioId: user?.id || null,
      cliente: datosCliente,
      items: itemsDetalle,
      total: totalPrice,
    });

    setLastOrder(nuevaOrden);
    localStorage.setItem(LAST_ORDER_KEY, JSON.stringify(nuevaOrden));

    if (!simularFallo) {
      // Descontar stock en db.productos y vaciar el carrito
      cart.forEach((item) => {
        const prodActual = db.productos.obtenerPorId(item.id);
        if (prodActual) {
          db.productos.actualizar(item.id, {
            stock: Math.max(0, Number(prodActual.stock) - Number(item.quantity)),
          });
        }
      });
      clearCart();
    }

    return nuevaOrden;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        user,
        login,
        logout,
        registerUser,
        lastOrder,
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
