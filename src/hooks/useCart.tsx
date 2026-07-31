import useStore from "@/store/store";

const useCart = () => {
  const count = useStore((state) => state.count);
  const cart = useStore((state) => state.cart);
  const cartArray = useStore((state) => state.cartArray);
  const form = useStore((state) => state.form);
  const orderSummary = useStore((state) => state.orderSummary);

  const addToCart = useStore((state) => state.addToCart);
  const setCount = useStore((state) => state.setCount);
  const getCartItems = useStore((state) => state.getCartItems);
  const reduceCartItemCount = useStore((state) => state.reduceCartItemCount);
  const optimisticAdd = useStore((state) => state.optimisticAdd);
  const optimisticRollback = useStore((state) => state.optimisticRollback);
  const updateQuantity = useStore((state) => state.updateQuantity);
  const inputQuantity = useStore((state) => state.inputQuantity);
  const selectItem = useStore((state) => state.selectItem);
  const removeAllItem = useStore((state) => state.removeAllItem);
  const removeItem = useStore((state) => state.removeItem);
  const getInputValue = useStore((state) => state.getInputValue);
  const updateOrderSummary = useStore((state) => state.updateOrderSummary);
  const resetForm = useStore((state) => state.resetForm);
  const updateCartCount = useStore((state) => state.updateCartCount);
  return {
    count,
    cart,
    cartArray,
    form,
    orderSummary,
    addToCart,
    setCount,
    getCartItems,
    reduceCartItemCount,
    optimisticAdd,
    optimisticRollback,
    updateQuantity,
    selectItem,
    removeAllItem,
    removeItem,
    inputQuantity,
    getInputValue,
    updateOrderSummary,
    resetForm,
    updateCartCount,
  };
};

export default useCart;
