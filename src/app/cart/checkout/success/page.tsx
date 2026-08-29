import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import { SuccessPage } from "./_components/success-page";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";
import Stripe from "stripe";

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
  const dbOrderId = paymentIntent.metadata?.db_order_id;

  console.log("stripe payment_intent_id: ", paymentIntent);
  console.log("database order_id: ", dbOrderId);

  if (!dbOrderId) {
    return <div>Setting up your order... Please wait</div>;
  }

  const order = await prisma.order.findUnique({
    where: {
      id: paymentIntentId,
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

  return <SuccessPage order={order} />;
}
