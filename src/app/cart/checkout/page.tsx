import prisma from "@/lib/prisma";
import CheckoutPage from "./CheckoutPage";

export default async function Checkout() {
  const cartProducts = await prisma.cartItem.findMany({
    where: {
      userId: "user-1234",
      isChecked: true,
    },

    include: {
      product: true,
    },
  });

  if (!cartProducts) return;

  const cartProductsMap = cartProducts.map((item) => {
    return {
      id: item.id,
      color: item.color,
      size: item.size,
      quantity: item.quantity,
      isChecked: item.isChecked,
      image: item.product.image,
      name: item.product.name,
      rating: {
        stars: item.product.ratingStars,
        count: item.product.ratingCount,
      },
      priceCents: item.product.priceCents,
      keywords: item.product.keywords,
    };
  });

  return <CheckoutPage cartItems={cartProductsMap} />;
}
