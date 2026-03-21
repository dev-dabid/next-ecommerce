import { Product } from "@/types/types";
import Image from "next/image";

type CollectionCardProps = {
  product: Product;
};

const CollectionCard = ({ product }: CollectionCardProps) => {
  const { image, name, priceCents } = product;
  return (
    <div className="flex flex-col">
      <div className="px-3 h-100 bg-white rounded-xl">
        <Image
          className="w-full h-full object-contain"
          alt=""
          src={`/${image}` || "/fallback.jpg"}
          width={200}
          height={200}
        />
      </div>
      <div className="flex gap-5 justify-between">
        <p className="truncate">{name}</p>
        <p>${priceCents}</p>
      </div>
    </div>
  );
};

export default CollectionCard;
