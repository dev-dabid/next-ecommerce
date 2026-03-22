import { StateCreator } from "zustand";
import { ProductsState } from "@/types/types";

export const createProductsSlice: StateCreator<ProductsState> = (set, get) => ({
  products: [],
  filters: {
    category: "",
    priceRange: 0,
  },
  isFetched: false,

  fetchProducts: (data) => {
    if (get().products.length > 0) return;
    set({ products: data });
  },

  setFilter: (key, value) =>
    set((state) => ({ filters: { ...state.filters, [key]: value } })),
});
