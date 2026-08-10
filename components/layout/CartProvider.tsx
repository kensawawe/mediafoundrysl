"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  size?: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity: number) => void;
  removeItem: (slug: string, size?: string) => void;
  updateQuantity: (slug: string, size: string | undefined, quantity: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "merch-cart";

function lineKey(slug: string, size?: string) {
  return `${slug}::${size ?? ""}`;
}

/**
 * Session-preview cart only — this is a static site with no backend or
 * payment processor, so this is honestly a client-side UI, not a real
 * order pipeline. Persisted to localStorage so it survives a refresh, but
 * nothing here talks to a server; checkout stays intentionally disabled.
 */
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {
      // Malformed or inaccessible storage — start from an empty cart.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  function addItem(item: Omit<CartItem, "quantity">, quantity: number) {
    setItems((prev) => {
      const key = lineKey(item.slug, item.size);
      const existing = prev.find((line) => lineKey(line.slug, line.size) === key);
      if (existing) {
        return prev.map((line) =>
          lineKey(line.slug, line.size) === key ? { ...line, quantity: line.quantity + quantity } : line,
        );
      }
      return [...prev, { ...item, quantity }];
    });
  }

  function removeItem(slug: string, size?: string) {
    const key = lineKey(slug, size);
    setItems((prev) => prev.filter((line) => lineKey(line.slug, line.size) !== key));
  }

  function updateQuantity(slug: string, size: string | undefined, quantity: number) {
    const key = lineKey(slug, size);
    setItems((prev) =>
      quantity <= 0
        ? prev.filter((line) => lineKey(line.slug, line.size) !== key)
        : prev.map((line) => (lineKey(line.slug, line.size) === key ? { ...line, quantity } : line)),
    );
  }

  function clear() {
    setItems([]);
  }

  const count = items.reduce((sum, line) => sum + line.quantity, 0);
  const subtotal = items.reduce((sum, line) => sum + line.quantity * line.price, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clear, count, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
