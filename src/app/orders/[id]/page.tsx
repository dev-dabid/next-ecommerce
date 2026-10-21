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

  return (
    <div>
      <div className="max-w-300 mx-auto">
        <div>
          <div>
            {id}
            Placed on {displayDate}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
