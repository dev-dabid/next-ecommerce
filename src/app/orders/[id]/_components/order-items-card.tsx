import Image from "next/image";

import { OrderItemProductType } from "../page";

import { formattedPrice } from "@/lib/utils/money";
import { Ordering } from "svix";

type OrderItemsCardProps = {
  orderItem: OrderItemProductType;
};

export function OrderItemsCard({ orderItem }: OrderItemsCardProps) {
  const categories = orderItem.product.keywords.slice(0, 2);

  return (
    <div className="flex justify-between items-center bg-white p-6 rounded-xl">
      <div className="flex items-center gap-6">
        <div className="relative h-full w-auto min-w-40 min-h-40 bg-gray-400/15 rounded-xl">
          <Image
            src={`/${orderItem.product.image}` || ""}
            alt=""
            fill
            className="object-contain p-2"
          />
        </div>
        <div className="gap-2 flex flex-col">
          <h2 className="font-semibold text-xl">
            Hand-Blown Crystal Decanter Set
          </h2>
          <p className="text-gray-500">
            Qty: {orderItem.quantity} • Lead-Free Crystal • Hand-Crafted
          </p>
        </div>
      </div>
      <p className="font-semibold text-xl">
        ${formattedPrice(orderItem.priceCents)}
      </p>
    </div>
  );
}
