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

export interface CartProduct extends Product {
  color?: string;
  size?: string;
  quantity: number;
  isChecked: boolean;
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

export interface CartState {
  cart: Map<Id, CartProduct>;
  addToCart: (product: CartProduct) => void;
  updateQuantity: (itemKey: string, value: number, type?: UpdateType) => void;
  inputQuantity: (itemKey: string, value: number) => void;
  removeItem: (itemKey: string) => void;
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
