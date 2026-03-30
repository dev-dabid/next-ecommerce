import { create } from "zustand";
import { createProductsSlice } from "./productsSlice";
import { createCartSlice } from "./cartSlice";
import { createWishlistSlice } from "./wishlistSlice";
import type { Store } from "@/types/types";

const useStore = create<Store>((...a) => ({
  ...createProductsSlice(...a),
  ...createCartSlice(...a),
  ...createWishlistSlice(...a),
}));

export default useStore;
