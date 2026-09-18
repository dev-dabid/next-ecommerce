"use client";

import useProducts from "@/hooks/useProducts";

type Wishlist = {
  id: string;
  userId: string;
  productId: string;
  createdAt: Date;
};

type WishlistPageProps = {
  wishlist: Wishlist[];
};

export function WishlistPage({ wishlist }: WishlistPageProps) {
  const { products } = useProducts();

  const wishProducts = wishlist.map((wish) =>
    products.find((product) => wish.productId === product.id),
  );

  return <div></div>;
}
