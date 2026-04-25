import { StateCreator } from "zustand";
import type { CartProduct, CartState } from "@/types/types";
import { generateCartKey } from "@/app/lib/utils/cart";

export const createCartSlice: StateCreator<CartState> = (set, get) => ({
  cart: new Map(),
  form: {
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  },

  orderSummary: {
    recipient: {
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    },
    orders: [],
    subtotal: "",
    shipping: "",
    total: "",
  },

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
        newCart.set(itemKey, {
          ...item,
          quantity: newQuantity,
        });
        set({ cart: newCart });
      } else {
        console.log("Limit reached or invalid quantity");
      }
    }
  },

  inputQuantity: (itemKey, value) => {
    const newCart = new Map(get().cart);
    const item = newCart.get(itemKey);

    if (item) {
      if (value <= 20 && value >= 0) {
        newCart.set(itemKey, { ...item, quantity: value });
        set({ cart: newCart });
      }
    }
  },

  selectItem: (itemKey, value) => {
    const newCart = new Map(get().cart);
    const item = newCart.get(itemKey);

    if (item) {
      newCart.set(itemKey, { ...item, isChecked: value });
      set({ cart: newCart });
    }
  },

  removeAllItem: () => set({ cart: new Map() }),

  removeItem: (itemKey) => {
    const newCart = new Map(get().cart);
    const item = newCart.get(itemKey);

    if (item) {
      newCart.delete(itemKey);

      set({ cart: newCart });
    }
  },

  getInputValue: (name, inputValue) =>
    set((prev) => ({ form: { ...prev.form, [name]: inputValue } })),

  updateOrderSummary: (summary) => set({ orderSummary: summary }),
});
