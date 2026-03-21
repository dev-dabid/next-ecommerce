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
  quantity: number;
  isChecked: boolean;
}

export interface ProductsState {
  products: Product[];
  isFetched: boolean;
  fetchProducts: (data: Product[]) => void;
}

export interface CartState {
  cart: CartProduct[];
}

export type Store = ProductsState & CartState;
