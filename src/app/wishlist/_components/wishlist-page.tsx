"use client";

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
  return <div></div>;
}
