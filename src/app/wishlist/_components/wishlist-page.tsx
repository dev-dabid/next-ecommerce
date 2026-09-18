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

  return (
    <div className="max-w-300 mx-auto">
      <h1 className="font-bold text-5xl">Wishlist</h1>
      <div className="grid grid-cols-3 gap-5">
        {wishProducts.map((product) => {
          return (
            <div className="relative">
              <div className="absolute inset-0 bg-red-50"></div>
              <div>{product?.name}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
