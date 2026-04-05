import useStore from "@/store/store";

const useCart = () => {
  const cart = useStore((state) => state.cart);
  const addToCart = useStore((state) => state.addToCart);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const removeItem = useStore((state) => state.removeItem);
  return { cart, addToCart, updateQuantity, removeItem };
};

export default useCart;
