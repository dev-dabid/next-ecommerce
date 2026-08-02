import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover" as any,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const substotal = body.amount;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: substotal,
      currency: "usd",
      payment_method_types: ["card"],
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error: any) {
    console.error("There is Error from Endpoint:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
