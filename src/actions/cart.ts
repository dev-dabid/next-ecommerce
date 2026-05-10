"use server";

import prisma from "@/lib/prisma";
import { CartProduct } from "@/types/types";

export async function addToCartDB(userId: string, product: CartProduct) {
  const color = product.color || "N/A";
  const size = product.size || "N/A";
  const quantity = product.quantity || 1;

  await prisma.product.upsert({
    where: { id: product.id },
    update: {},
    create: {
      id: product.id,
      image: product.image,
      name: product.name,
      ratingStars: product.rating.stars,
      ratingCount: product.rating.count,
      priceCents: product.priceCents,
      keywords: product.keywords,
    },
  });

  return await prisma.cartItem.upsert({
    where: {
      userId_productId_color_size: {
        userId: userId,
        productId: product.id,
        color: color,
        size: size,
      },
    },

    update: {
      quantity: {
        increment: quantity,
      },
    },

    create: {
      userId: userId,
      productId: product.id,
      color: color,
      size: size,
      quantity: quantity,
    },
  });
}
