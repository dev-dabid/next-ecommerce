import { NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/prisma";
import { submitOrderData } from "@/actions/cart";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover" as any,
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  console.log("🔥 WEBHOOK HITTED! May pumasok na request mula sa Stripe.");

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

    const fullPaymentIntent = await stripe.paymentIntents.retrieve(
      paymentIntent.id,
    );

    console.log("=========================================");
    console.log(
      "LOG METADATA",
      JSON.stringify(fullPaymentIntent.metadata, null, 2),
    );
    console.log("=========================================");

    const userId = fullPaymentIntent.metadata?.userId;
    const recipientForm = fullPaymentIntent.metadata?.recipient;

    if (!recipientForm) {
      console.error("DATA INCOMPLETE: No recipient found in metadata!");
      return NextResponse.json(
        { error: "Recipient metadata is undefined" },
        { status: 400 },
      );
    }

    const recipient = JSON.parse(recipientForm);

    if (!userId) {
      console.error("No userId found in metadata paymentIntent!");
      return NextResponse.json(
        { error: "Missing userId metadata" },
        { status: 400 },
      );
    }

    const amountPaid = paymentIntent.amount;
    console.log(`Payment Succeeded! User: ${userId} | Amount: ${amountPaid}`);

    try {
      await submitOrderData(userId, recipient);
      console.log(
        "Database updated: Order created and Cart cleared successfully!",
      );
    } catch (dbError) {
      console.error("Prisma Database Error:", dbError);
      return NextResponse.json(
        { error: "Internal Database Error", message: String(dbError) },
        { status: 500 },
      );
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
