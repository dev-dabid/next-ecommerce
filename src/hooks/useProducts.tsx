import useStore from "@/store/store";

const useProducts = () => {
  const products = useStore((state) => state.products);
  const filters = useStore((state) => state.filters);
  const isFetched = useStore((state) => state.isFetched);
  const fetchProducts = useStore((state) => state.fetchProducts);
  const setFilter = useStore((state) => state.setFilter);

  return { products, isFetched, filters, fetchProducts, setFilter };
};

export default useProducts;
