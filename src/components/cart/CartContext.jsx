import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

/**
 * CartContext.jsx
 * Provides a simple cart implementation with localStorage persistence.
 * Exports:
 *  - CartProvider: wrap your app with this
 *  - useCart: hook to access cart APIs
 *
 * Data shape (cart array): [{ id, name, price, quantity, image, metadata }]
 */

const CartContext = createContext(null);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
};

const CART_STORAGE_KEY = "app_cart_v1";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.warn("Failed to parse cart from localStorage:", e);
      return [];
    }
  });

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.warn("Failed to persist cart to localStorage:", e);
    }
  }, [cart]);

  const findIndex = useCallback((id) => cart.findIndex((i) => String(i.id) === String(id)), [cart]);

  const addItem = (item, quantity = 1, selectedColor = null, selectedStorage = null) => {
  setCart((prev) => {
    const idx = prev.findIndex(
      (i) =>
        String(i.id) === String(item.id) &&
        i.selectedColor === selectedColor &&
        i.selectedStorage === selectedStorage
    );
    if (idx > -1) {
      const next = [...prev];
      next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
      return next;
    }
    return [{ ...item, quantity, selectedColor, selectedStorage }, ...prev];
  });
};
  const removeItem = (id) => {
    setCart((prev) => prev.filter((i) => String(i.id) !== String(id)));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) return removeItem(id);
    setCart((prev) => prev.map((i) => (String(i.id) === String(id) ? { ...i, quantity } : i)));
  };

  const clearCart = () => setCart([]);

  const getTotalItems = () => cart.reduce((s, i) => s + Number(i.quantity || 0), 0);

  const getSubTotal = () => cart.reduce((s, i) => s + Number(i.quantity || 0) * Number(i.price || 0), 0);

  const setCartDirect = (nextCart) => setCart(Array.isArray(nextCart) ? nextCart : []);

  const value = {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotalItems,
    getSubTotal,
    setCart: setCartDirect,
    findIndex,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};




