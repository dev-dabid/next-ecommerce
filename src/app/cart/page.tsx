import { auth } from "@clerk/nextjs/server";
import CartPage from "./CartPage";
import { findUserCartProducts } from "@/actions/cart";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function Cart() {
  const { userId } = await auth();
  const cartItems = await findUserCartProducts(userId || "");

  return (
    <div>
      <CartPage userId={userId || ""} cartProducts={cartItems.data} />
    </div>
  );
}
