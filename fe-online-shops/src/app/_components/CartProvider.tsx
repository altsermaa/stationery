"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type CartItemType = {
  _id: string;
  productName: string;
  image: string;
  description: string;
  price: number;
  addcount: number;
  categoryId: string
};

type CartContextType = {
  cart: CartItemType[];
  setCart: React.Dispatch<React.SetStateAction<CartItemType[]>>;
  cartCount: number;
  updateCartCount: () => void;
};

export const CartContext = createContext<CartContextType>(
  {} as CartContextType
);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItemType[]>([]);

  console.log(cart)

  const [cartCount, setCartCount] = useState<number>(0);

  const updateCartCount = () => {
    const total = cart.reduce((sum, item) => sum + item.addcount, 0);
    setCartCount(total);
  };

  useEffect(() => {
    const stored = localStorage.getItem("productCart");
    let parsedDat = [];
    console.log(stored, 'storedstored');
    

    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("productCart");
      const cart = stored ? JSON.parse(stored) : [];
      setCart(cart);
    }

    try {
      parsedDat = stored ? JSON.parse(stored) : [];
      if (!Array.isArray(parsedDat)) parsedDat = [];
    } catch {
      parsedDat = [];
    }
    setCart(parsedDat);
  }, []);



  useEffect(() => {
    localStorage.setItem("productCart", JSON.stringify(cart));
    updateCartCount();
  }, [cart]);
  

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        cartCount,
        updateCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
