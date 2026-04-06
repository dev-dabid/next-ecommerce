import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware"; // Import mo 'to
import { createProductsSlice } from "./productsSlice";
import { createCartSlice } from "./cartSlice";
import { createWishlistSlice } from "./wishlistSlice";
import type { Store } from "@/types/types";

const useStore = create<Store>()(
  persist(
    (...a) => ({
      ...createProductsSlice(...a),
      ...createCartSlice(...a),
      ...createWishlistSlice(...a),
    }),
    {
      name: "lumina-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
      }),
    },
  ),
);

export default useStore;
