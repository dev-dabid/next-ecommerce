import type { CartProduct } from "@/types/types";
import { formattedPrice } from "../lib/utils/money";
import { format } from "path";

type OrderSummaryProps = {
  cartItems: CartProduct[];
};

const OrderSummary = ({ cartItems }: OrderSummaryProps) => {
  const subtotalCents = cartItems.reduce(
    (acc, item) =>
      item.isChecked && item.quantity > 0
        ? acc + item.priceCents * item.quantity
        : acc,
    0,
  );

  const FREE_SHIPPING_THRESHOLD = 5000;
  const hasFreeShipping =
    subtotalCents >= FREE_SHIPPING_THRESHOLD || subtotalCents === 0;
  const actualShippingFee = hasFreeShipping ? 0 : 1000;

  const estimatedTaxCents = Math.round(subtotalCents * 0.07);

  const totalCents = subtotalCents + estimatedTaxCents + actualShippingFee;

  const preTotalDisplay = `$${formattedPrice(subtotalCents)}`;
  const estimatedTaxDisplay = `$${formattedPrice(estimatedTaxCents)}`;
  const shippingDisplay = hasFreeShipping
    ? "FREE"
    : `$${formattedPrice(actualShippingFee)}`;
  const totalDisplay = `$${formattedPrice(totalCents)}`;

  return (
    <div className="p-6 w-full bg-white h-fit rounded-2xl">
      <div className="flex flex-col">
        <h1 className="text-xl font-semibold mb-5">Order Summary</h1>
        <div className="flex flex-col gap-3">
          <div className="flex justify-between">
            <p className="text-gray-500">Subtotal</p>
            <p className="font-semibold">{preTotalDisplay}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-500">Shipping</p>
            <p className="font-semibold text-sky-400">{shippingDisplay}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-500">Estimated Tax</p>
            <p className="font-semibold">{estimatedTaxDisplay}</p>
          </div>

          <div className="py-2 border-t border-t-sky-200">
            <div className="flex justify-between">
              <p className="text-lg font-semibold">Total</p>
              <p className="text-2xl text-sky-500 font-bold">{totalDisplay}</p>
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
