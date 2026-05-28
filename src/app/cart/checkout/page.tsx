import prisma from "@/lib/prisma";
import CheckoutPage from "./CheckoutPage";
import { mapCartItemData } from "@/actions/helper";

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
    return mapCartItemData(item);
  });

  return <CheckoutPage cartItems={cartProductsMap} />;
}
