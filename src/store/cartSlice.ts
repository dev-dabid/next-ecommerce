import { StateCreator } from "zustand";
import type { CartState } from "@/types/types";
import { generateCartKey } from "@/app/lib/utils/cart";

export const createCartSlice: StateCreator<CartState> = (set, get) => ({
  cart: new Map(),

  addToCart: (product) => {
    const currentCart = new Map(get().cart);
    const itemKey = generateCartKey(product.id, product.color, product.size);
    const existingItem = currentCart.get(itemKey);

    if (existingItem) {
      currentCart.set(itemKey, {
        ...existingItem,
        quantity: existingItem.quantity + product.quantity,
      });
      set({ cart: currentCart });
    } else {
      currentCart.set(itemKey, { ...product, isChecked: true });
      set({ cart: currentCart });
    }
  },

  updateQuantity: (itemKey, value, type) => {
    const newCart = new Map(get().cart);
    const item = newCart.get(itemKey);

    if (item) {
      const newQuantity =
        type === "add" ? item.quantity + value : item.quantity - value;

      if (newQuantity > 0 && newQuantity <= 20) {
        newCart.set(itemKey, { ...item, quantity: newQuantity });
        set({ cart: newCart });
      } else {
        console.log("Limit reached or invalid quantity");
      }
    }
  },

  removeItem: (itemKey) => {
    const newCart = new Map(get().cart);
    const item = newCart.get(itemKey);

    if (item) {
      newCart.delete(itemKey);

      set({ cart: newCart });
    }
  },
});
