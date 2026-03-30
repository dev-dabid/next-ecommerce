import { StateCreator } from "zustand";
import type { WishlistState } from "@/types/types";

export const createWishlistSlice: StateCreator<WishlistState> = (set, get) => ({
  wishlist: new Set(),

  updateWishlist: (productId) => {
    const newSet = new Set(get().wishlist);

    if (newSet.has(productId)) {
      newSet.delete(productId);
      set({ wishlist: newSet });
    } else {
      newSet.add(productId);
      set({ wishlist: newSet });
    }
  },
});
