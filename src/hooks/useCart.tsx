import useStore from "@/store/store";

const useCart = () => useStore((state) => ({ cart: state.cart }));

export default useCart;
