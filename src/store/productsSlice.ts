import { StateCreator } from "zustand";
import { ProductsState } from "@/types/types";

export const createProductsSlice: StateCreator<ProductsState> = (set, get) => ({
  products: [],
  isFetched: false,

  fetchProducts: async () => {
    try {
      if (!get().isFetched) return;
      const response = await fetch("../../public/backend/products.json");
      const data = await response.json();
      set({ products: data });
    } catch (error) {
      console.log(error);
    }
  },
});
