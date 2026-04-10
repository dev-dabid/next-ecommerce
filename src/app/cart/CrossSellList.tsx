import useProducts from "@/hooks/useProducts";
import useCart from "@/hooks/useCart";
import { useMemo } from "react";
import { generateCartKey } from "../lib/utils/cart";

const CrossSellList = () => {
  const { products } = useProducts();
  const { cart } = useCart();

  const cartIds = new Set(Array.from(cart.values()).map((item) => item.id));
  const cartKeywords = new Set(
    Array.from(cart.values()).flatMap((item) => item.keywords),
  );

  const relatedProducts = products.filter((item) => {
    const isInCart = cartIds.has(item.id);
    const isRelated = item.keywords.some((item) => cartKeywords.has(item));

    return !isInCart && isRelated;
  });

  const crossListProducts = relatedProducts.slice(0, 4);

  return (
    <div>
      <div></div>
    </div>
  );
};

export default CrossSellList;
