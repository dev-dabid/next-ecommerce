import useCart from "./useCart";

const useCartTotals = () => {
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

  const estimatedTaxCents = Math.round(subtotalCents * 0.07);
  const totalCents = subtotalCents + estimatedTaxCents + actualShippingFee;

  return {
    totalCents,
    subtotalCents,
    estimatedTaxCents,
    hasFreeShipping,
    actualShippingFee,
  };
};

export default useCartTotals;
