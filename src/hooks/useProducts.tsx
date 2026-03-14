import useStore from "@/store/store";

const useProducts = () => {
  const products = useStore((state) => state.products);
  const isFetched = useStore((state) => state.isFetched);
  const fetchProducts = useStore((state) => state.fetchProducts);

  return { products, isFetched, fetchProducts };
};

export default useProducts;
