import useStore from "@/store/store";
import { useState } from "react";

const useCart = () => {
  const cart = useStore((state) => state.cart);
  const addToCart = useStore((state) => state.addToCart);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const inputQuantity = useStore((state) => state.inputQuantity);
  const removeAllItem = useStore((state) => state.removeAllItem);
  const removeItem = useStore((state) => state.removeItem);
  return {
    cart,
    addToCart,
    updateQuantity,
    removeAllItem,
    removeItem,
    inputQuantity,
  };
};

export default useCart;
