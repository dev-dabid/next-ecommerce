import { CartProduct } from "@/types/types";
import Image from "next/image";
import { formattedPrice } from "@/lib/utils/money";

type CartItemProps = {
  cartItem: CartProduct;
};

const SuccessCard = ({ cartItem }: CartItemProps) => {
  const { image, priceCents, name, quantity } = cartItem;

  const displayImage = `/${image}`;
  const displayPrice = `$${formattedPrice(priceCents)}`;
  const displayQuantity = `Quantity: ${quantity}`;

  return (
    <div className="flex justify-between items-start gap-4 w-full">
      <div className="flex min-w-0 gap-5">
        <div className="relative aspect-square w-20 shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
          <div className="absolute inset-0 bg-linear-to-b from-gray-200/10 to-black/5 z-10 pointer-events-none" />
          <Image
            className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
            src={displayImage}
            alt={name}
            fill
            sizes="80px"
          />
        </div>
        <div className="flex flex-col min-w-0">
          <p className="font-semibold truncate leading-tight text-base">
            {name}
          </p>
          <p className="text-gray-500 text-sm">{displayQuantity}</p>
        </div>
      </div>
      <p className="font-semibold text-lg shrink-0">{displayPrice}</p>
    </div>
  );
};

export default SuccessCard;
