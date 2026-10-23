import prisma from "@/lib/prisma";

type OrderDetailsParams = {
  params: {
    id: string;
  };
};

export default async function OrderDetails({ params }: OrderDetailsParams) {
  const { id } = await params;

  const order = await prisma.order.findUnique({
    where: {
      id: id,
    },
  });

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

  const displayDate = `${calendar[month]} ${day}, ${year}`;

  const deliveryStatus = order.status;

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
              {deliveryStatus}
            </h3>
            <p className="italic">Estimated Delivery: Oct 30, 2026</p>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
