"use client";

import { WishlistCard } from "./wishlist-card";
import useProducts from "@/hooks/useProducts";
import { removeFavorite } from "@/actions/cart";
import { toast } from "sonner";

type Wishlist = {
  id: string;
  userId: string;
  productId: string;
  createdAt: Date;
};

type WishlistPageProps = {
  userId: string;
  wishlist: Wishlist[];
};

export function WishlistPage({ userId, wishlist }: WishlistPageProps) {
  const { products } = useProducts();

  const wishProducts = wishlist.map((wish) =>
    products.find((product) => wish.productId === product.id),
  );

  return (
    <div className="max-w-300 mx-auto min-h-screen p-5">
      <h1 className="font-bold text-5xl mb-6">Wishlist</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {wishProducts.map((product) => {
          return (
            product && (
              <WishlistCard
                key={product.name}
                userId={userId}
                product={product}
                removeFavorite={removeFavorite}
              />
            )
          );
        })}
      </div>
    </div>
  );
}
