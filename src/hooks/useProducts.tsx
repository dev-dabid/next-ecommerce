import useStore from "@/store/store";

const useProducts = () =>
  useStore((state) => ({
    products: state.products,
    isFetched: state.isFetched,
    fetchProducts: state.fetchProducts,
  }));

export default useProducts;
