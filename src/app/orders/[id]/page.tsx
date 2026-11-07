import prisma from "@/lib/prisma";

import { Check, Circle } from "lucide-react";

import type { Order } from "@prisma/client";
import { stat } from "fs";

type OrderDetailsParams = {
  params: {
    id: string;
  };
};

type StatusType = {
  title: string;
  stat: string;
  approvalKey: string;
};

export default async function OrderDetails({ params }: OrderDetailsParams) {
  const { id } = await params;

  const order = (await prisma.order.findUnique({
    where: {
      id: id,
    },
  })) as Order;

  if (!order) {
    return <div>Hatdog</div>;
  }

  const calendar: Record<number, string> = {
    1: "January",
    2: "February",
    3: "March",
    4: "April",
    5: "May",
    6: "June",
    7: "July",
    8: "August",
    9: "September",
    10: "October",
    11: "November",
    12: "December",
  };

  const dateRaw = order.createdAt.toLocaleDateString();
  const date = dateRaw.split("/");
  const year = date[2];
  const month = Number(date[0]);
  const day = date[1];

  const time = order.createdAt;
  const hours = time.getHours();
  const minute = time.getMinutes();

  console.log(hours + ":" + minute);

  const displayDate = `${calendar[month]} ${day}, ${year}`;

  const deliveryStatus = order.orderStatus;

  const deliveryStatusMessage =
    deliveryStatus === "PENDING"
      ? "Awaiting Seller Confirmation"
      : deliveryStatus === "PROCESSING"
        ? "Preparing Order"
        : deliveryStatus === "SHIPPED"
          ? "Handed Over to Courier"
          : deliveryStatus === "OUT_FOR_DELIVERY"
            ? "Out for Delivery"
            : deliveryStatus === "DELIVERED"
              ? "Order Delivered"
              : "Order Cancelled";

  const statusCollection: StatusType[] = [
    {
      title: "Order Placed",
      stat: "ORDER-PLACED",
      approvalKey: "",
    },
    {
      title: "Processing",
      stat: "PENDING",
      approvalKey: "processedAt",
    },
    {
      title: "Shipped",
      stat: "SHIPPED",
      approvalKey: "shippedAt",
    },
    {
      title: "Out for Delivery",
      stat: "OUT_FOR_DELIVERY",
      approvalKey: "dispatchedAt",
    },
    {
      title: "Delivered",
      stat: "DELIVERED",
      approvalKey: "deliveredAt",
    },
  ];

  // MISSING VARIABLE SOLVED: EXISTENCE OF THE ORDER ITSELF IS THE STATUS OR ORDER PLACED
  // MISSING VARIABLE SOLVED: APPROVAL FIELD MISSING WHETHER THE SAID STATUS WAS APPROVED OR PENDING
  // AHEAD NUMBER FLAG LOGIC SOLVED: I COULD JUST USE THE AHEAD INDEX OF MATCH STATUSES FOR LESSER STATUS CHECK

  //  processedAt: Date | null;
  //  shippedAt: Date | null;
  //  dispatchedAt: Date | null;
  //  deliveredAt: Date | null;

  return (
    <div>
      <div className="max-w-300 mx-auto">
        <div className="flex justify-between py-10 border-b border-gray-200">
          <div className="flex flex-col">
            <h3 className="text-sky-400 font-semibold">ORDER OVERVIEW</h3>
            <h2 className="font-bold text-3xl my-2">#{id}</h2>
            <p>Placed on {displayDate}</p>
          </div>
          <div className="flex flex-col justify-end items-end">
            <h3 className="bg-sky-100 text-sky-400 font-semibold px-3 rounded-full ">
              {deliveryStatusMessage}
            </h3>
            <p className="italic mt-2">Estimated Delivery: Oct 30, 2026</p>
          </div>
        </div>
        <div className="py-15">
          <div className="p-10 bg-white rounded-xl flex justify-between">
            <div className="flex flex-col">
              <h1 className="font-bold text-2xl">Live Tracking</h1>
              <div className="flex flex-col justify-start mt-10 gap-10 before:content-[''] before:w-0.5 before:h-full before:left-3.5  before:absolute before:bg-gray-200 relative">
                {statusCollection.map((status, index) => {
                  if (
                    status.stat === "ORDER-PLACED" &&
                    order &&
                    order.orderStatus !== "CANCELLED"
                  ) {
                    return (
                      <div className="flex justify-start gap-10 z-20">
                        <div>
                          <Check
                            size={30}
                            className="bg-sky-400 rounded-full p-1 text-white"
                          />
                        </div>
                        <div className="flex flex-col">
                          <h2 className="font-semibold">{status.title}</h2>
                          <p className="text-sm text-gray-500">{displayDate}</p>
                        </div>
                      </div>
                    );
                  }

                  if (
                    index < statusCollection.length - 1 &&
                    order[status.approvalKey as keyof Order] &&
                    order[
                      statusCollection[index + 1].approvalKey as keyof Order
                    ]
                  ) {
                    return (
                      <div className="flex justify-start gap-10 z-20">
                        <div>
                          <Check
                            size={30}
                            className="bg-sky-400 rounded-full p-1 text-white"
                          />
                        </div>
                        <div className="flex flex-col">
                          <h2 className="font-semibold">{status.title}</h2>
                          <p className="text-sm text-gray-500">Oct 24, 2024 </p>
                        </div>
                      </div>
                    );
                  }

                  if (
                    status.stat === "DELIVERED" &&
                    order[status.approvalKey as keyof Order]
                  ) {
                    return (
                      <div className="flex justify-start gap-10 z-20">
                        <div>
                          <Check
                            size={30}
                            className="bg-sky-400 rounded-full p-1 text-white"
                          />
                        </div>
                        <div className="flex flex-col">
                          <h2 className="font-semibold">{status.title}</h2>
                          <p className="text-sm text-gray-500">Oct 24, 2024 </p>
                        </div>
                      </div>
                    );
                  }

                  if (
                    index < statusCollection.length - 1 &&
                    order[status.approvalKey as keyof Order] &&
                    order[
                      statusCollection[index + 1].approvalKey as keyof Order
                    ] === null
                  ) {
                    return (
                      <div className="flex justify-start gap-10 z-20">
                        <div className="w-7.5 h-7.5 rounded-full border-5 border-sky-400"></div>
                        <div className="flex flex-col">
                          <h2 className="font-semibold">{status.title}</h2>
                          <p className="text-sm text-gray-500">
                            Pending Approval • Current Status
                          </p>
                        </div>
                      </div>
                    );
                  }

                  if (order[status.approvalKey as keyof Order] === null) {
                    return (
                      <div className="flex justify-start gap-10 z-20">
                        <div className="w-7.5 h-7.5 rounded-full bg-gray-400/15"></div>
                        <div className="flex flex-col">
                          <h2 className="font-semibold text-gray-500/30">
                            {status.title}
                          </h2>
                          <p className="text-sm text-gray-500"></p>
                        </div>
                      </div>
                    );
                  }

                  // const isApproved = false;
                  // const statusIndex = farthestStatusIndex();

                  // if (
                  //   (status.stat === deliveryStatus &&
                  //     index === statusIndex &&
                  //     isApproved) ||
                  //   index < statusIndex
                  // ) {
                  //   return (
                  //     <div className="flex justify-start gap-10 z-20">
                  //       <div>
                  //         <Check
                  //           size={30}
                  //           className="bg-sky-400 rounded-full p-1 text-white"
                  //         />
                  //       </div>
                  //       <div className="flex flex-col">
                  //         <h2 className="font-semibold">{status.name}</h2>
                  //         <p className="text-sm text-gray-500">Oct 24, 2024 </p>
                  //       </div>
                  //     </div>
                  //   );
                  // } else if (
                  //   status.stat === deliveryStatus &&
                  //   index === statusIndex &&
                  //   isApproved === false
                  // ) {
                  //   return (
                  //     <div className="flex justify-start gap-10 z-20">
                  //       <div className="w-7.5 h-7.5 rounded-full border-5 border-sky-400"></div>
                  //       <div className="flex flex-col">
                  //         <h2 className="font-semibold">{status.name}</h2>
                  //         <p className="text-sm text-gray-500">Oct 24, 2024 </p>
                  //       </div>
                  //     </div>
                  //   );
                  // } else {
                  //   return (
                  //     <div className="flex justify-start gap-10 z-20">
                  //       <div className="w-7.5 h-7.5 rounded-full bg-gray-400/15"></div>
                  //       <div className="flex flex-col">
                  //         <h2 className="font-semibold">{status.name}</h2>
                  //         <p className="text-sm text-gray-500">Oct 24, 2024 </p>
                  //       </div>
                  //     </div>
                  //   );
                  // }
                })}
              </div>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
