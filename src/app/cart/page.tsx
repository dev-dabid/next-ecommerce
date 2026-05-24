import CartPage from "./CartPage";
import { findUserCartProducts } from "@/actions/cart";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";

export default async function Cart() {
  const cartItems = await findUserCartProducts("user-1234");

  if (!cartItems.success || cartItems.data === null) return;

  return (
    <div>
      <CartPage cartProducts={cartItems.data} />
    </div>
  );
}
