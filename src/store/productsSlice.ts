import { StateCreator } from "zustand";
import { ProductsState } from "@/types/types";

export const createProductsSlice: StateCreator<ProductsState> = (set, get) => ({
  products: [],
  isFetched: false,

  fetchProducts: (data) => {
    if (get().products.length > 0) return;
    set({ products: data });
  },
});
