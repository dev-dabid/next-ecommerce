import Orders, { OrderWithRelations } from "./page";
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
        <div className="flex items-center gap-5 w-full">
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
          <div className="flex gap-25">
            <div className="flex flex-col text-sm">
              <p className="text-gray-500 font-semibold">DATE PLACED</p>
              <p>{`${months[Number(month)]} ${day}, ${year}`}</p>
            </div>
            <div className="flex flex-col text-sm">
              <p className="text-gray-500 font-semibold">TOTAL</p>
              <p className="font-semibold">{displayTotalPrice}</p>
            </div>
            <div className="flex flex-col text-sm">
              <p className="text-gray-500 font-semibold">STATUS</p>
              <p
                className={`${order.status === "PENDING" ? "text-gray-600 bg-gray-100" : order.status === "SHIPPED" ? "text-blue-600 bg-blue-100" : order.status === "RETURNED" ? "text-red-600 bg-red-100" : "text-green-600 bg-green-100"} font-semibold py-1 px-4 rounded-full`}
              >
                {order.status === "PENDING"
                  ? "PROCESSING"
                  : order.status === "DELIVERED"
                    ? "DELIVERED"
                    : order.status === "RETURNED"
                      ? "RETURNED"
                      : "SHIPPED"}
              </p>
            </div>
          </div>
        </div>

        <div className="ml-20 mr-10 max-w-30 w-full">
          <button
            className={`${order.status === "SHIPPED" ? "bg-sky-400 text-white border-transparent hover:bg-sky-300 active:bg-sky-600" : "bg-white border-gray-300 hover:bg-gray-200 active:bg-gray-100"} cursor-pointer px-3 py-3 border rounded-lg w-full`}
          >
            {order.status === "SHIPPED" ? "Track" : "Details"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderHistoryCard;
