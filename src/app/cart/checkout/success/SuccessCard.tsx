import { CartProduct } from "@/types/types";
import Image from "next/image";
import { formattedPrice } from "@/app/lib/utils/money";

type CartItemProps = {
  cartItem: CartProduct;
};

const SuccessCard = ({ cartItem }: CartItemProps) => {
  const { image, priceCents, name, quantity } = cartItem;

  const displayImage = `/${image}`;
  const displayPrice = `$${formattedPrice(priceCents)}`;
  const displayQuantity = `Quantity: ${quantity}`;

  return (
    <div className="flex justify-between">
      <div className="flex w-full gap-5">
        <div className="relative aspect-square w-30 shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
          <div className="absolute inset-0 bg-linear-to-b from-gray-200/10 to-black/5 z-10 pointer-events-none" />
          <Image
            className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
            src={displayImage}
            alt={name}
            fill
            sizes="80px"
          />
        </div>
        <div className="flex flex-col">
          <p className="font-semibold">{name}</p>
          <p className="text-gray-500">{displayQuantity}</p>
        </div>
      </div>
      <p className="font-semibold text-lg">{displayPrice}</p>
    </div>
  );
};

export default SuccessCard;
