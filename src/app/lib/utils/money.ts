export const formattedPrice = (priceCents: number) =>
  Number((priceCents / 100).toFixed(2));
