import useStore from "@/store/store";

const useCart = () => {
  const cart = useStore((state) => state.cart);
  const addToCart = useStore((state) => state.addToCart);

  return { cart, addToCart };
};

export default useCart;
