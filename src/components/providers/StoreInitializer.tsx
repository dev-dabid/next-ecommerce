"use client";

import { Product } from "@/types/types";
import useProducts from "@/hooks/useProducts";

type StoreInitializerProps = {
  data: Product[];
};

const StoreInitializer = ({ data }: StoreInitializerProps) => {
  const { fetchProducts } = useProducts();

  fetchProducts(data);

  return null;
};

export default StoreInitializer;
