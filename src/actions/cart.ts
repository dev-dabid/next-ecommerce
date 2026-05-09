"user server";

import prisma from "@/lib/prisma";
import { generateCartKey } from "@/lib/utils/cart";

export async function addToCart(userId: string, productId: string) {
  return await prisma.cartItem.upsert({
    where: {
      userId_productId: {
        userId: userId,
        productId: productId,
      },
    },

    update: {
      quantity: {
        increment: 1,
      },
    },

    create: {
      userId: userId,
      productId: productId,
    },
  });
}
