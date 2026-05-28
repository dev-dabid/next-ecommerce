"use server";

import prisma from "@/lib/prisma";
import type { Prisma } from "@prisma/client";
import { CartItemWithProduct, CartProduct, FormFields } from "@/types/types";
import { mapProductData, mapCartItemData } from "./helper";
import { revalidatePath } from "next/cache";

interface ProductData {
  id: string;
  image: string;
  name: string;
  ratingStars: number;
  ratingCount: number;
  priceCents: number;
  keywords: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

interface SummaryData {
  recipient: FormFields;
  orders: CartItemWithProduct[];
  actualTotalCents: number;
  shippingMethod: string;
  shippingFee: number;
}

export async function submitOrderData(userId: string, summary: SummaryData) {
  const result = await prisma.$transaction(async (tx) => {
    const firstOrder = await tx.order.create({
      data: {
        userId,
        totalPrice: summary.actualTotalCents,
        shippingFee: summary.shippingFee,
        firstName: summary.recipient.firstName,
        lastName: summary.recipient.lastName,
        phone: summary.recipient.phone,
        email: summary.recipient.email,
        streetAddress: summary.recipient.streetAddress,
        barangay: summary.recipient.barangay,
        city: summary.recipient.city,
        province: summary.recipient.province,
        zipCode: summary.recipient.zipCode,
        shippingType: summary.shippingMethod,
      },
    });

    const ordersMap = summary.orders.map((item) => {
      return {
        orderId: firstOrder.id,
        productId: item.productId,
        color: item.color,
        size: item.size,
        quantity: item.quantity,
        priceCents: item.product.priceCents,
      };
    });

    await tx.orderItem.createMany({
      data: ordersMap,
    });

    await tx.cartItem.deleteMany({
      where: {
        userId,
      },
    });

    return firstOrder;
  });

  revalidatePath("/");
  return result;
}

export async function decreaseCartItemCount(id: string, userId: string) {
  try {
    const result = await prisma.cartItem.findFirst({
      where: {
        id,
        userId,
      },

      select: {
        quantity: true,
      },
    });

    if (!result) return { success: false, message: "Item not found" };

    if (result.quantity <= 1) {
      return { success: false, message: "Minimum quantity reached" };
    }

    await prisma.cartItem.update({
      where: {
        id,
      },

      data: {
        quantity: {
          decrement: 1,
        },
      },
    });

    revalidatePath("/cart");

    return { success: true, data: result };
  } catch (error) {
    return { success: false, message: "Database error" };
  }
}

export async function increaseCartItemCount(id: string, userId: string) {
  try {
    const result = await prisma.cartItem.findFirst({
      where: {
        id,
      },
    });

    if (!result) return { success: false, message: "Product not found" };

    if (result.quantity >= 10) {
      return { Success: false, message: "Maximum quantity reached" };
    }

    await prisma.cartItem.update({
      where: {
        id,
        userId,
      },

      data: {
        quantity: { increment: 1 },
      },
    });

    revalidatePath("/cart");

    return { success: true, data: result };
  } catch (error) {
    return { success: false, message: "Database error" };
  }
}

export async function updateCheckCartItem(
  id: string,
  userId: string,
  selectValue: boolean,
) {
  try {
    await prisma.cartItem.update({
      where: {
        id,
        userId,
      },
      data: {
        isChecked: selectValue,
      },
    });

    revalidatePath("/cart");
  } catch (error) {
    console.log(error);
  }
}

export async function deleteCartItem(id: string) {
  try {
    await prisma.cartItem.delete({
      where: {
        id,
      },
    });

    revalidatePath("/cart");
  } catch (error) {
    console.log(error);
  }
}

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

    const productsMap = result.map((item: ProductData) => {
      return mapProductData(item);
    });

    return { success: true, data: productsMap, error: null };
  } catch (error: any) {
    console.error("Prisma FindMany Error:", error.message);

    return { success: false, data: [], error: null };
  }
}

export async function findUserCartProducts(userId: string) {
  try {
    const result = await prisma.cartItem.findMany({
      where: {
        userId: userId,
      },

      include: {
        product: true,
      },
    });

    if (!result) throw new Error("Cannot find cart items");

    const cartItemMap = result.map((item: CartItemWithProduct) => {
      return mapCartItemData(item);
    });

    return { success: true, data: cartItemMap, error: null };
  } catch (error: any) {
    console.error("Prisma find many error:", error.message);

    return { success: false, data: [], error: "cannot find specific product" };
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

    const productMap = mapProductData(result);

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

  const result = await prisma.$transaction(
    async (tx: Prisma.TransactionClient) => {
      await tx.product.upsert({
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

      return await tx.cartItem.upsert({
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
    },
  );

  revalidatePath("/");

  return result;
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
