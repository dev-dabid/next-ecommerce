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

  updateQuantity: (itemKey, value) => {
    const newCart = new Map(get().cart);
    const item = newCart.get(itemKey);

    console.log(item);

    if (item) {
      newCart.set(itemKey, { ...item, quantity: item.quantity + value });
      console.log("added");
      set({ cart: newCart });
    } else {
      console.log(`item is ${itemKey} ${newCart}`);
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
