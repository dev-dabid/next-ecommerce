import { Product } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

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
    <div className="flex flex-col border rounded-lg p-3 bg-white">
      <button onClick={() => removeFavorite(userId, product.id)}>remove</button>
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
      <Link href={`collections/${product.id}`}>
        <button>View</button>
      </Link>
    </div>
  );
}
