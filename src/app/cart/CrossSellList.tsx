import useProducts from "@/hooks/useProducts";
import useCart from "@/hooks/useCart";
import { useMemo } from "react";

const CrossSellList = () => {
  const { products } = useProducts();
  const { cart } = useCart();

  const cartKeywords = new Set(
    Array.from(cart.values()).flatMap((item) => item.keywords),
  );

  const relatedProducts = products.filter((product) => {
    const isInCart = cart.has(product.id);
    const isRelated = product.keywords.some((key) => cartKeywords.has(key));

    return !isInCart && isRelated;
  });

  const crossSellList = relatedProducts.slice(0, 4);

  return (
    <div>
      <div></div>
    </div>
  );
};

export default CrossSellList;
