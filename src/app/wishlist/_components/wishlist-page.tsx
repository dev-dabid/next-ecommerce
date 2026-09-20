"use client";

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
            <div
              className="flex flex-col border rounded-lg p-3 bg-white"
              key={product?.id}
            >
              <div className="relative aspect-square w-full mb-3">
                <Image
                  className="object-contain"
                  src={`/${product?.image}`}
                  alt={product?.name || "Product Image"}
                  fill
                  sizes="(max-w-7xl) 25vw, 100vw"
                />
              </div>

              <div className="font-semibold text-lg mt-auto">
                {product?.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
