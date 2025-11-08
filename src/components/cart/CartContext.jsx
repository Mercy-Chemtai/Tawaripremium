import React, { createContext, useContext, useState, useMemo } from "react";

// ============================================================================
// CART CONTEXT
// ============================================================================
const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = (product, quantity = 1, selectedColor = null, selectedStorage = null) => {
    setItems((prev) => {
      const existing = prev.find(
        (it) =>
          it.product_id === product.id &&
          it.selectedColor === selectedColor &&
          it.selectedStorage === selectedStorage
      );

      if (existing) {
        return prev.map((it) =>
          it.product_id === product.id &&
          it.selectedColor === selectedColor &&
          it.selectedStorage === selectedStorage
            ? { ...it, quantity: it.quantity + quantity }
            : it
        );
      }

      return [
        ...prev,
        {
          product_id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.sale_price || product.price,
          image: product.primary_image?.image,
          quantity,
          selectedColor,
          selectedStorage,
          category: product.category_name,
        },
      ];
    });
  };

  const updateItem = (productId, updates) => {
    setItems((prev) =>
      prev.map((it) => (it.product_id === productId ? { ...it, ...updates } : it))
    );
  };

  const removeItem = (productId) => {
    setItems((prev) => prev.filter((it) => it.product_id !== productId));
  };

  const clear = () => setItems([]);

  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + it.price * it.quantity, 0),
    [items]
  );

  const totalItems = useMemo(
    () => items.reduce((sum, it) => sum + it.quantity, 0),
    [items]
  );

  return (
    <CartContext.Provider
      value={{ items, addItem, updateItem, removeItem, clear, subtotal, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
}