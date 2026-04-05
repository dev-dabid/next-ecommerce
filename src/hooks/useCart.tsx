import useStore from "@/store/store";
import { useState } from "react";

const useCart = () => {
  const cart = useStore((state) => state.cart);
  const addToCart = useStore((state) => state.addToCart);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const inputQuantity = useStore((state) => state.inputQuantity);
  const removeItem = useStore((state) => state.removeItem);
  return { cart, addToCart, updateQuantity, removeItem, inputQuantity };
};

export default useCart;
