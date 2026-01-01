import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });

  // persist cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // add item to cart
  const addItem = (item) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.id === item.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  // increment item quantity
  const increment = (id) => {
    setCart((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, qty: p.qty + 1 } : p
      )
    );
  };

  // decrement quantity (remove if qty becomes 0)
  const decrement = (id) => {
    setCart((prev) =>
      prev
        .map((p) =>
          p.id === id ? { ...p, qty: p.qty - 1 } : p
        )
        .filter((p) => p.qty > 0)
    );
  };

  // remove item directly
  const removeItem = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  // clear cart
  const clearCart = () => setCart([]);

  // price parser
  const parsePrice = (price) => {
    if (typeof price === "number" && isFinite(price)) return price;
    if (!price) return 0;
    let s = String(price).trim().replace(/[^0-9.\-]/g, "");
    const parts = s.split(".");
    if (parts.length > 2) {
      s = parts.shift() + "." + parts.join("");
    }
    const n = parseFloat(s);
    return Number.isFinite(n) ? n : 0;
  };

  // totals
  const totalItems = cart.reduce((sum, p) => sum + (p.qty || 0), 0);
  const totalPrice = cart.reduce(
    (sum, p) => sum + (p.qty || 0) * parsePrice(p.price),
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        increment,
        decrement,
        removeItem,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
