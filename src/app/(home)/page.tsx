"use client";

import useProducts from "@/hooks/useProducts";
import { useState, useEffect } from "react";
import Hero from "./Hero";
import CategorySection from "./CategorySection";

export default function Homepage() {
  const { products, isFetched, fetchProducts } = useProducts();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    fetchProducts();
  }, [fetchProducts]);

  if (!isClient) return null;

  console.log(products);

  return (
    <div className="max-w-7xl mx-auto">
      <Hero />
      <CategorySection products={products || []} />
    </div>
  );
}
