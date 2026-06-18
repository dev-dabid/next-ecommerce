import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import OrdersPage from "./OrdersPage";
import { Prisma } from "@prisma/client";

const orderWithItems = Prisma.validator<Prisma.OrderDefaultArgs>()({
  include: {
    orderItem: {
      include: {
        product: true,
      },
    },
  },
});

export type OrderWithRelations = Prisma.OrderGetPayload<typeof orderWithItems>;

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

  return <OrdersPage orderList={orderList} />;
}
