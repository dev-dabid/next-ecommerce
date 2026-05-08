"user server";

import prisma from "@/lib/prisma";

export async function addToCart() {
  return await prisma.cartItem.upsert({});
}
