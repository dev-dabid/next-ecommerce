import Image from "next/image";

import { OrderItemProductType } from "../page";

type OrderItemsCardProps = {
  orderItem: OrderItemProductType;
};

export function OrderItemsCard({ orderItem }: OrderItemsCardProps) {
  return (
    <div className="flex justify-between">
      <div>
        <div className="relative h-full w-full min-w-3 min-h-2">
          <Image
            src={`/${orderItem.product.image}` || ""}
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div>
          <h2>Hand-Blown Crystal Decanter Set</h2>
          <p>Qty:1 • Lead-Free Crystal • Hand-Crafted</p>
        </div>
      </div>
      <p>$850.00</p>
    </div>
  );
}
