import Image from "next/image";

import type { OrderItem } from "@prisma/client";

type OrderItemsCardProps = {
  orderItem: OrderItem;
};

export function OrderItemsCard({ orderItem }: OrderItemsCardProps) {
  return (
    <div className="flex justify-between">
      <div>
        <div>
          <Image src={""} alt="" />
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
