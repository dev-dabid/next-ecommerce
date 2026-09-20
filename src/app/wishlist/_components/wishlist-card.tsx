import { Product } from "@/types/types";
import Image from "next/image";

type WishlistCardProps = {
  product: Product;
};

export function WishlistCard({ product }: WishlistCardProps) {
  return (
    <div className="flex flex-col border rounded-lg p-3 bg-white">
      <div className="relative aspect-square w-full mb-3">
        <Image
          className="object-contain"
          src={`/${product?.image}`}
          alt={product?.name || "Product Image"}
          fill
          sizes="(max-w-7xl) 25vw, 100vw"
        />
      </div>

      <div className="font-semibold text-lg mt-auto">{product?.name}</div>
    </div>
  );
}
