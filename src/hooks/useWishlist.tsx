import useStore from "@/store/store";

const useWishList = () => {
  const wishlist = useStore((state) => state.wishlist);
  const updateWishlist = useStore((state) => state.updateWishlist);

  return { wishlist, updateWishlist };
};

export default useWishList;
