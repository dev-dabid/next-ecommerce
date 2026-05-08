import useCart from "./useCart";
import { formattedPrice } from "@/lib/utils/money";

type ShippingMethod = {
  type: string;
  title: string;
  days: string;
  price: number;
};

type CartTotalsProps = {
  shipMethod?: ShippingMethod;
};

const useCartTotals = ({ shipMethod }: CartTotalsProps = {}) => {
  const { cart } = useCart();

  const cartItems = Array.from(cart.values());

  const subtotalCents = cartItems.reduce(
    (acc, item) =>
      item.isChecked && item.quantity > 0
        ? acc + item.priceCents * item.quantity
        : acc,
    0,
  );

  const FREE_SHIPPING_THRESHOLD = 50000;
  const hasFreeShipping =
    subtotalCents >= FREE_SHIPPING_THRESHOLD || subtotalCents === 0;
  const actualShippingFee = hasFreeShipping ? 0 : 1000;

  const shippingTypePrice =
    shipMethod?.type === "express" ? shipMethod.price : 0;

  const estimatedTaxCents = Math.round(subtotalCents * 0.07);
  const totalCents = subtotalCents + estimatedTaxCents + actualShippingFee;
  const actualTotalCents = shipMethod
    ? totalCents + shippingTypePrice
    : totalCents;
  const shippingType = shipMethod?.price === 0 ? "Complimentary" : "Express";

  const preTotalDisplay = `$${formattedPrice(subtotalCents)}`;
  const estimatedTaxDisplay = `$${formattedPrice(estimatedTaxCents)}`;
  const shippingDisplay = hasFreeShipping
    ? "FREE"
    : `$${formattedPrice(actualShippingFee)}`;
  const checkoutShippingDisplay = shipMethod ? shippingType : shippingDisplay;
  const totalDisplay = `$${formattedPrice(actualTotalCents)}`;

  return {
    totalCents,
    subtotalCents,
    estimatedTaxCents,
    hasFreeShipping,
    actualShippingFee,
    preTotalDisplay,
    estimatedTaxDisplay,
    checkoutShippingDisplay,
    totalDisplay,
    shippingTypePrice,
    shippingDisplay,
  };
};

export default useCartTotals;
