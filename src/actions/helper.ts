import { Prisma } from "@prisma/client";

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

export type CartItemWithProduct = Prisma.CartItemGetPayload<{
  include: { product: true };
}>;

export const mapProductData = (item: ProductData) => {
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
};

export const mapCartItemData = (item: CartItemWithProduct) => {
  return {
    id: item.id,
    image: item.product.image,
    name: item.product.name,
    color: item.color,
    size: item.size,
    rating: {
      stars: item.product.ratingStars,
      count: item.product.ratingCount,
    },
    quantity: item.quantity,
    priceCents: item.product.priceCents,
    isChecked: item.isChecked,
    keywords: item.product.keywords,
  };
};
