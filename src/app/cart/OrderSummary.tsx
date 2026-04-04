import type { CartProduct } from "@/types/types";
import { formattedPrice } from "../lib/utils/money";
import { format } from "path";

type OrderSummaryProps = {
  cartItems: CartProduct[];
};

const OrderSummary = ({ cartItems }: OrderSummaryProps) => {
  const subtotal = cartItems.reduce(
    (acc, cartItem) => acc + cartItem.priceCents * cartItem.quantity,
    0,
  );
  const taxCents = cartItems.length > 0 ? 1000 : 0;

  const estimatedTax = subtotal * 0.07;

  const isFree =
    formattedPrice(subtotal) > 500 ? "FREE" : `$${formattedPrice(taxCents)}`;

  const totalPrice =
    formattedPrice(subtotal) < 500
      ? subtotal + estimatedTax + taxCents
      : subtotal + estimatedTax;

  return (
    <div className="p-6 max-w-100 w-full bg-white h-fit rounded-2xl">
      <div className="flex flex-col">
        <h1 className="text-xl font-semibold mb-5">Order Summary</h1>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <p className="text-gray-500">Subtotal</p>
            <p className="font-semibold">${formattedPrice(subtotal)}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-500">Shipping</p>
            <p className="font-semibold text-sky-400">{isFree}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-500">Estimated Tax</p>
            <p className="font-semibold">${formattedPrice(estimatedTax)}</p>
          </div>

          <div className="py-2 border-t border-t-sky-200">
            <div className="flex justify-between">
              <p className="text-lg font-semibold">Total</p>
              <p className="text-2xl text-sky-500 font-bold">
                ${formattedPrice(totalPrice)}
              </p>
            </div>
          </div>

          <div>
            <div className="flex border border-sky-200 rounded-lg p-2">
              <input
                className="px-2 w-full outline-none"
                placeholder="Promo code"
                type="text"
              />
              <button className="text-sky-500 bg-sky-100 py-1 px-2 rounded">
                Apply
              </button>
            </div>
          </div>

          <button className="text-white bg-sky-400 py-4 rounded-xl mt-2">
            PROCEED TO CHECKOUT
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
