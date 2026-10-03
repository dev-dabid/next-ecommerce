import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { WishlistPage } from "./_components/wishlist-page";
import { Prisma } from "@prisma/client";

export type OrderItems = Prisma.OrderGetPayload<{
  include: {
    orderItem: {
      include: {
        product: true;
      };
    };
  };
}>;

export default async function Wishlist() {
  const { userId } = await auth();

  if (!userId) {
    return <WishlistPage userId="" wishlist={[]} orders={[]} />;
  }

  const orders = await prisma.order.findMany({
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

  const wishlist = await prisma.favorite.findMany({
    where: {
      userId,
    },
  });

  console.log(orders);

  return (
    <div>
      <WishlistPage userId={userId} wishlist={wishlist} orders={orders} />
    </div>
  );
}
