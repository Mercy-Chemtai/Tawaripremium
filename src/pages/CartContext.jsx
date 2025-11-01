import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";

const CART_STORAGE_KEY = "myshop_cart_v1";

const CartContext = createContext();

export function CartProvider({ children }) {
  // Use a ref to avoid race conditions during hydration
  const mountedRef = useRef(false);

  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      console.error("Cart parse error:", e);
      return [];
    }
  });

  // ensure localStorage and state remain in sync
  useEffect(() => {
    // avoid writing to localStorage on very first render if it already has same data
    if (!mountedRef.current) {
      mountedRef.current = true;
      try {
        const raw = localStorage.getItem(CART_STORAGE_KEY);
        const parsed = raw ? JSON.parse(raw) : [];
        // If localStorage and initial state differ, prefer localStorage (helps in SSR/hydration)
        if (JSON.stringify(parsed) !== JSON.stringify(items)) {
          setItems(parsed);
        }
      } catch (e) {
        /* ignore */
      }
      return;
    }

    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Failed to persist cart:", e);
    }
  }, [items]);

  // sync across tabs (and manual localStorage edits)
  useEffect(() => {
    function onStorage(e) {
      if (e.key === CART_STORAGE_KEY) {
        try {
          const parsed = e.newValue ? JSON.parse(e.newValue) : [];
          setItems(parsed);
        } catch (err) {
          console.error("Failed to parse cart from storage event", err);
        }
      }
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // derived values
  const totalItems = useMemo(() => items.reduce((s, it) => s + (Number(it.quantity) || 0), 0), [items]);
  const subtotal = useMemo(() => items.reduce((s, it) => s + (Number(it.price) || 0) * (Number(it.quantity) || 0), 0), [items]);

  // helpers
  const addItem = (newItem) => {
    // make addItem return Promise resolving to the added/updated item after state commit
    return new Promise((resolve) => {
      setItems((prev) => {
        const productId = newItem.product_id ?? newItem.id;
        const existingIndex = prev.findIndex((p) => (p.product_id ?? p.id) === productId);

        if (existingIndex > -1) {
          const next = prev.map((p, idx) =>
            idx === existingIndex
              ? {
                  ...p,
                  quantity: Number(p.quantity || 0) + Number(newItem.quantity || 1),
                  name: newItem.name ?? p.name,
                  price: Number(newItem.price ?? p.price),
                  image: newItem.image ?? p.image,
                }
              : p,
          );
          // resolve with the updated item
          setTimeout(() => resolve(next[existingIndex]), 0);
          return next;
        }

        const itemToStore = {
          id: newItem.id ?? String(Date.now()),
          product_id: productId,
          slug: newItem.slug ?? null,
          name: newItem.name ?? "Untitled product",
          price: Number(newItem.price ?? 0),
          quantity: Number(newItem.quantity ?? 1),
          image: newItem.image ?? null,
        };
        setTimeout(() => resolve(itemToStore), 0);
        return [...prev, itemToStore];
      });
    });
  };

  const updateItem = (productIdOrId, patch) =>
    setItems((prev) =>
      prev.map((it) => ((it.product_id ?? it.id) === productIdOrId ? { ...it, ...patch } : it)),
    );

  const removeItem = (productIdOrId) => setItems((prev) => prev.filter((it) => (it.product_id ?? it.id) !== productIdOrId));
  const clear = () => setItems([]);

  return (
    <CartContext.Provider value={{ items, addItem, updateItem, removeItem, clear, totalItems, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
