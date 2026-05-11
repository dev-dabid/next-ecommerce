"use server";

import prisma from "@/lib/prisma";
import productData from "../src/content/backend/products.json";

export async function createProducts() {
  for (const item of productData) {
    const formattedData = {
      id: item.id,
      image: item.image,
      name: item.name,
      ratingStars: item.rating.stars,
      ratingCount: item.rating.count,
      priceCents: item.priceCents,
      keywords: item.keywords,
    };

    await prisma.product.upsert({
      where: {
        id: item.id,
      },

      update: formattedData,

      create: formattedData,
    });
  }
}
