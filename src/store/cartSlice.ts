import { StateCreator } from "zustand";
import type { CartState } from "@/types/types";

export const createCartSlice: StateCreator<CartState> = (set, get) => ({
  cart: [],
});
