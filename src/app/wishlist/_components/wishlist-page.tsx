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
    <div className="max-w-300 mx-auto h-screen">
      <h1 className="font-bold text-5xl">Wishlist</h1>
      <div className="flex flex-col">
        <div className="grid grid-cols-[repeat(4,minmax(400px,1fr))] gap-5">
          {wishProducts.map((product) => {
            return (
              <div className=" relative h-full" key={product?.id}>
                <div className="relative h-full">
                  <Image
                    className="object-contain h-full w-auto"
                    src={`/${product?.image}`}
                    alt={product?.name || ""}
                    fill
                  />
                </div>
                <div>{product?.name}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
