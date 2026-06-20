import { OrderWithRelations } from "./page";
import Image from "next/image";

type OrderHistoryCardProps = {
  order: OrderWithRelations;
};

const OrderHistoryCard = ({ order }: OrderHistoryCardProps) => {
  return (
    <div className="h-full max-h-100 bg-white group p-5 rounded-xl">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-5">
          <div className="relative aspect-square w-20 shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
            <div className="absolute inset-0 bg-linear-to-b from-gray-200/10 to-black/5 z-10 pointer-events-none" />
            <Image
              className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
              src={`/${order.orderItem[0].product.image}`}
              alt=""
              fill
              sizes="80px"
            />
          </div>
          <div>{order.updatedAt.getDate()}</div>
        </div>

        <div>hatdog</div>
      </div>
    </div>
  );
};

export default OrderHistoryCard;
