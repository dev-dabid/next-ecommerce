"use client";

import { Product } from "@/types/types";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { formattedPrice } from "@/app/lib/utils/money";

type ProductCardProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductCardProps) => {
  const { id, image, name, priceCents } = product;

  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`/collections/${id}`)}
      className="flex flex-col"
    >
      <div className="px-3 h-full bg-white rounded-xl relative overflow-hidden flex justify-center">
        <div className="inset-0 bg-linear-to-b from-white/15 to-black/10 w-full h-full absolute"></div>
        <Image
          className="w-auto h-50 md:h-80 lg:h-100 object-contain"
          alt=""
          src={`/${image}` || "/fallback.jpg"}
          width={200}
          height={200}
        />
      </div>
      <div className="flex gap-2 justify-between mt-3 font-semibold text-[clamp(0.75rem,4vw,1.125rem)]">
        <p className="truncate">{name}</p>
        <p>${formattedPrice(priceCents)}</p>
      </div>
    </div>
  );
};

export default ProductCard;
