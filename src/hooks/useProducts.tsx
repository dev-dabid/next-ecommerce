import useStore from "@/store/store";
import { useState } from "react";

const useProducts = () => {
  const products = useStore((state) => state.products);
  const filters = useStore((state) => state.filters);
  const isFetched = useStore((state) => state.isFetched);
  const favorites = useStore((state) => state.favorites);
  const fetchProducts = useStore((state) => state.fetchProducts);
  const setFavorite = useStore((state) => state.setFavorite);
  const setFilter = useStore((state) => state.setFilter);

  return {
    products,
    isFetched,
    filters,
    favorites,
    fetchProducts,
    setFilter,
    setFavorite,
  };
};

export default useProducts;
