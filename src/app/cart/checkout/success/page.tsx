import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { SuccessPage } from "./_components/success-page";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import { PollingLoader } from "./_components/polling-loader";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

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

  const { id: paymentIntentId } = await searchParams;
  if (!paymentIntentId) redirect("/cart");

  const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
  const dbOrderId = paymentIntent.metadata.db_order_id;

  // console.log("stripe: ", paymentIntent);
  // console.log("stripe payment_intent_id: ", paymentIntent.id);
  // console.log("database order_id: ", dbOrderId);

  if (!dbOrderId) return <PollingLoader />;

  const order = await prisma.order.findUnique({
    where: {
      id: dbOrderId,
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

  // console.log(order);

  if (!order) return;

  return <SuccessPage order={order} />;
}
