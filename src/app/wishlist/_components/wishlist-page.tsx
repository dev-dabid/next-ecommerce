"use client";

import { WishlistCard } from "./wishlist-card";
import useProducts from "@/hooks/useProducts";
import Image from "next/image";

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

  return (
    <div className="max-w-[1200px] mx-auto min-h-screen p-5">
      <h1 className="font-bold text-5xl mb-6">Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {wishProducts.map((product) => {
          return (
            product && <WishlistCard key={product.name} product={product} />
          );
        })}
      </div>
    </div>
  );
}
