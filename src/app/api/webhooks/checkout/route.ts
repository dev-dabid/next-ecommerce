import { NextResponse, NextRequest } from "next/server";
import Stripe from "stripe";
import prisma from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-01-28.clover" as any,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const userId = body.userId;
    const shippingPrice = body.shippingPrice;

    const result = await prisma.cartItem.findMany({
      where: {
        userId,
        isChecked: true,
      },

      select: {
        quantity: true,
        product: {
          select: {
            priceCents: true,
          },
        },
      },
    });

    const totalCents = result.reduce((sum, item) => {
      return sum + item.product.priceCents * item.quantity;
    }, 0);

    if (!totalCents || totalCents < 50) {
      return NextResponse.json(
        {
          error: "Cart is empty, cannot process payment!",
        },
        {
          status: 404,
        },
      );
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCents + shippingPrice,
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
