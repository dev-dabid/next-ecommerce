"use server";

import prisma from "@/lib/prisma";
import { CartProduct } from "@/types/types";
import { revalidatePath } from "next/cache";

export async function findRelatedProducts(
  keywords: string[],
  productId: string,
) {
  try {
    const result = await prisma.product.findMany({
      where: {
        NOT: {
          id: productId,
        },
        keywords: {
          hasSome: keywords,
        },
      },

      take: 4,
    });

    if (!result) throw new Error("Related products not found");

    const productsMap = result.map((item) => {
      return {
        id: item.id,
        image: item.image,
        name: item.name,
        rating: {
          stars: item.ratingStars,
          count: item.ratingCount,
        },
        priceCents: item.priceCents,
        keywords: item.keywords,
      };
    });

    return { success: true, data: productsMap, error: null };
  } catch (error: any) {
    console.error("Prisma FindMany Error:", error.message);

    return { success: false, data: [], error: null };
  }
}

export async function findUniqueProduct(productId: string) {
  try {
    const result = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!result) throw new Error("Product not found");

    const productMap = {
      id: result.id,
      image: result.image,
      name: result.name,
      rating: {
        stars: result.ratingStars,
        count: result.ratingCount,
      },
      priceCents: result.priceCents,
      keywords: result.keywords,
    };

    return { success: true, data: productMap, error: null };
  } catch (error: any) {
    console.error("Prisma FindUnique Error:", error.message);

    return {
      Success: false,
      data: null,
      error: "Cannot find specific product.",
    };
  }
}

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

  revalidatePath("/");

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

export async function toggleFavorite(userId: string, productId: string) {
  try {
    return await prisma.favorite.delete({
      where: {
        userId_productId: {
          userId: userId,
          productId: productId,
        },
      },
    });
  } catch (error) {
    return await prisma.favorite.create({
      data: {
        userId: userId,
        productId: productId,
      },
    });
  }
}

export async function isInFavorite(userId: string, productId: string) {
  const favorite = await prisma.favorite.findUnique({
    where: {
      userId_productId: {
        userId: userId,
        productId: productId,
      },
    },
    select: {
      userId: true,
    },
  });

  return !!favorite;
}

export async function cartItemCount(userId: string) {
  const result = await prisma.cartItem.aggregate({
    where: {
      userId: userId,
    },

    _sum: {
      quantity: true,
    },
  });

  return result._sum.quantity || 0;
}
