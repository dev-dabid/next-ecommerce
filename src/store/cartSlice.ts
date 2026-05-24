import { StateCreator } from "zustand";
import type { CartState } from "@/types/types";
import { cartItemCount } from "@/actions/cart";

export const createCartSlice: StateCreator<CartState> = (set, get) => ({
  cart: new Map(),
  count: 0,
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

  setCount: (count) => set({ count: count }),

  optimisticAdd: (quantity) =>
    set((state) => ({ count: state.count + quantity })),

  optimisticRollback: (quantity) =>
    set((state) => ({ count: state.count - quantity })),

  updateCartCount: async () => {
    const cartCount = await cartItemCount("user-1234");
    set({ count: cartCount });
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

  resetForm: () =>
    set({
      form: {
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
      },
    }),

  getInputValue: (name, inputValue) =>
    set((prev) => ({ form: { ...prev.form, [name]: inputValue } })),

  updateOrderSummary: (summary) => set({ orderSummary: summary }),
});
