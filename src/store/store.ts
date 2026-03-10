import { create, StateCreator } from "zustand";
import type { Product, CartProduct } from "@/types/types";

interface Store {
  products: Product[];
  isFetch: boolean;
  cart: CartProduct[];

  fetchProducts: () => Promise<void>;
}

const useStore = create<Store>((set, get) => ({
  products: [],
  isFetch: false,

  fetchProducts: async () => {
    try {
      if (get().isFetch) return;
      const response = await fetch("../../public/backend/products.json");
      const data = (await response.json()) as Product[];
      set({ products: data });
    } catch (error) {
      console.log(error);
    }
  },

  cart: [],
}));

export default useStore;
