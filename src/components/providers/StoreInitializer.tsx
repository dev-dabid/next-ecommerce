"use client";

import { Product } from "@/types/types";
import useProducts from "@/hooks/useProducts";
import { useRef } from "react";

type StoreInitializerProps = {
  data: Product[];
};

const StoreInitializer = ({ data }: StoreInitializerProps) => {
  const { fetchProducts } = useProducts();
  const initialized = useRef(false);

  if (!initialized.current) {
    fetchProducts(data);
    initialized.current = true;
  }

  return null;
};

export default StoreInitializer;
