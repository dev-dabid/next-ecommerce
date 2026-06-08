import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import SuccessPage from "./SuccessPage";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";

export type OrderWithItems = Prisma.OrderGetPayload<{
  include: {
    orderItem: {
      include: {
        product: true;
      };
    };
  };
}>;

interface PageProps {
  searchParams: Promise<{ id?: string }>;
}

export default async function Success({ searchParams }: PageProps) {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const { id: orderId } = await searchParams;

  if (!orderId) redirect("/cart");

  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
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

  if (!order) redirect("/cart");

  console.log(order);

  return <SuccessPage order={order} />;
}
