import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import OrdersPage from "./OrdersPage";

export default async function Orders() {
  const { userId } = await auth();

  if (!userId) return;

  const orderList = await prisma.order.findMany({
    where: {
      userId,
    },

    include: {
      orderItem: {
        include: {
          product: true,
        },
      },
    },
  });

  return <OrdersPage />;
}
