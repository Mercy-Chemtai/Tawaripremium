import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
 const [items, setItems] = useState(() => {
  try {
    const saved = localStorage.getItem("cart_items");
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
});

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart_items", JSON.stringify(items));
  }, [items]);

  const addToCart = (item) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((i) => i.id === item.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += item.quantity || 1;
        return updated;
      }
      return [...prev, { ...item, quantity: item.quantity || 1 }];
    });
  };

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const clearCart = () => setItems([]);

  return (
    <CartContext.Provider
      value={{ items, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
