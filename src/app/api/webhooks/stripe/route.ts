import { NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/prisma";
import { submitOrderData } from "@/actions/cart";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover" as any,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe signature" },
      { status: 400 },
    );
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed:`, err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 },
    );
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;

    const userId = paymentIntent.metadata.userId;
    const recipient = JSON.parse(paymentIntent.metadata.recipient);

    if (!userId) {
      console.error("No userId found in metadata paymentIntent!");
      return NextResponse.json(
        { error: "Missing metadata fields" },
        { status: 400 },
      );
    }

    const amountPaid = paymentIntent.amount;

    console.log(`Payment Succeeded! User: ${userId} | Amount: ${amountPaid}`);

    try {
      submitOrderData(userId, recipient);
      console.log(
        "Database updated: Order created and Cart cleared successfully!",
      );
    } catch (dbError) {
      console.error("Prisma Database Error:", dbError);
      return NextResponse.json(
        { error: "Internal Database Error" },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
