import { Prisma } from "@prisma/client";

export interface Product {
  id: string;
  image: string;
  name: string;
  rating: {
    stars: number;
    count: number;
  };
  priceCents: number;
  keywords: string[];
}

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: { product: true };
}>;

export interface CartProduct extends Product {
  color?: string | null;
  size?: string | null;
  quantity: number;
  isChecked: boolean;
  productId?: string;
}

export interface ProductsState {
  products: Product[];
  filters: {
    category: string;
    priceRange: number;
  };
  isFetched: boolean;
  fetchProducts: (data: Product[]) => void;
  setFilter: (key: string, value: string) => void;
}

export type Id = string;

export type UpdateType = "add" | "reduce";

export type FormFields = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  streetAddress: string;
  barangay: string;
  city: string;
  province: string;
  zipCode: string;
};

export type Summary = {
  recipient: FormFields;
  orders: CartProduct[];
  subtotal: string;
  shipping: string;
  total: string;
};

export interface CartState {
  count: number;
  cart: Map<Id, CartProduct>;
  form: FormFields;
  orderSummary: Summary;

  addToCart: (productItem: CartProduct) => void;
  setCount: (count: number) => void;
  optimisticAdd: (quantity: number) => void;
  optimisticRollback: (quantity: number) => void;
  updateCartCount: () => void;

  updateQuantity: (itemKey: string, value: number, type?: UpdateType) => void;
  inputQuantity: (itemKey: string, value: number) => void;
  selectItem: (itemKey: string, value: boolean) => void;
  removeAllItem: () => void;
  removeItem: (itemKey: string) => void;
  getInputValue: (name: string, value: string) => void;
  updateOrderSummary: (cart: Summary) => void;
  resetForm: () => void;
}

export interface WishlistState {
  wishlist: Set<string>;
  updateWishlist: (productId: string) => void;
}

export type Store = ProductsState & CartState & WishlistState;

export type Color = {
  name: string;
  color: string;
};

export type Size = {
  id: number;
  name: string;
};

export type SelectProperty = {
  color: Color;
  size: Size;
  count: number;
};
