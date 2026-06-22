import { OrderWithRelations } from "./page";
import Image from "next/image";
import { formattedPrice } from "@/lib/utils/money";

type OrderHistoryCardProps = {
  order: OrderWithRelations;
};

const OrderHistoryCard = ({ order }: OrderHistoryCardProps) => {
  const months: { [key: number]: string } = {
    1: "Jan",
    2: "Feb",
    3: "Mar",
    4: "Apr",
    5: "May",
    6: "Jun",
    7: "Jul",
    8: "Aug",
    9: "Sep",
    10: "Oct",
    11: "Nov",
    12: "Dec",
  };
  const date = order.createdAt.toLocaleDateString();
  const totalPrice = order.totalPrice;

  const dateString = date.split("/");
  const year = dateString[2];
  const month = dateString[0];
  const day = dateString[1];

  const displayTotalPrice = `$${formattedPrice(totalPrice)}`;

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
          <div className="flex gap-5">
            <div className="flex flex-col text-sm">
              <p>DATE PLACED</p>
              <p>{`${months[Number(month)]} ${day}, ${year}`}</p>
            </div>
            <div className="flex flex-col text-sm">
              <p>TOTAL</p>
              <p>{displayTotalPrice}</p>
            </div>
          </div>
        </div>

        <div>hatdog</div>
      </div>
    </div>
  );
};

export default OrderHistoryCard;
