import useStore from "@/store/store";
import { useState } from "react";

const useCart = () => {
  const cart = useStore((state) => state.cart);
  const form = useStore((state) => state.form);
  const addToCart = useStore((state) => state.addToCart);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const inputQuantity = useStore((state) => state.inputQuantity);
  const selectItem = useStore((state) => state.selectItem);
  const removeAllItem = useStore((state) => state.removeAllItem);
  const removeItem = useStore((state) => state.removeItem);
  const getInputValue = useStore((state) => state.getInputValue);
  return {
    cart,
    form,
    addToCart,
    updateQuantity,
    selectItem,
    removeAllItem,
    removeItem,
    inputQuantity,
    getInputValue,
  };
};

export default useCart;
