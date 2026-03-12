"use client";

import useStore from "@/store/store";
import { useEffect } from "react";

export default function Homepage() {
  const fetchProducts = useStore((state) => state.fetchProducts);
  const products = useStore((state) => state.products);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts()]);

  return (
    <div>
      <p>fsdfsdfsdasdsdf</p>
      {products.map((product) => {
        return (
          <div>
            <div>{product.name}</div>
          </div>
        );
      })}
    </div>
  );
}
