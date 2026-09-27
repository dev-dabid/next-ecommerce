import { Product } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";

type WishlistCardProps = {
  userId: string;
  product: Product;
  removeFavorite: (userId: string, id: string) => Promise<void>;
};

export function WishlistCard({
  userId,
  product,
  removeFavorite,
}: WishlistCardProps) {
  return (
    <div className="flex flex-col relative border rounded-lg p-3 bg-white">
      <button
        className="absolute bg-red-50 z-10 right-3 "
        onClick={() => removeFavorite(userId, product.id)}
      >
        <X className="block" />
      </button>
      <div className="relative aspect-square w-full mb-3">
        <Image
          className="object-contain"
          src={`/${product?.image}`}
          alt={product?.name || "Product Image"}
          fill
          sizes="(max-w-7xl) 25vw, 100vw"
        />
      </div>

      <div className="font-semibold text-lg mt-auto truncate">
        {product?.name}
      </div>
      <Link className="flex" href={`collections/${product.id}`}>
        <button className="flex-1 mt-2 py-1 bg-sky-400 text-white font-semibold hover:bg-sky-500 active:bg-sky-300 rounded">
          View
        </button>
      </Link>
    </div>
  );
}
