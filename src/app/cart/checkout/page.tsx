import { auth } from "@clerk/nextjs/server";
import prisma from "@/lib/prisma";
import CheckoutPage from "./CheckoutPage";
import { mapCartItemData } from "@/actions/helper";

export default async function Checkout() {
  const { userId } = await auth();
  const cartProducts = await prisma.cartItem.findMany({
    where: {
      userId: userId || "",
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

  return <CheckoutPage userId={userId || ""} cartItems={cartProductsMap} />;
}
