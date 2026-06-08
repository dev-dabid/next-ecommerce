import { StateCreator } from "zustand";
import { ProductsState } from "@/types/types";

export const createProductsSlice: StateCreator<ProductsState> = (set, get) => ({
  products: [],
  filters: {
    category: "",
    priceRange: 0,
  },
  favorites: new Set(),
  isFetched: false,

  fetchProducts: (data) => {
    if (get().products.length > 0) return;
    set({ products: data });
  },

  setFavorite: (productId) => {
    const newFavorites = new Set(get().favorites);

    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }

    set({ favorites: newFavorites });
  },

  setFilter: (key, value) =>
    set((state) => ({ filters: { ...state.filters, [key]: value } })),
});
