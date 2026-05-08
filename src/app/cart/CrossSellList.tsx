import useProducts from "@/hooks/useProducts";
import useCart from "@/hooks/useCart";
import { useMemo } from "react";
import { generateCartKey } from "../../lib/utils/cart";
import { formattedPrice } from "../../lib/utils/money";
import Image from "next/image";

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
    <div className="w-full max-w-[1200px] mx-auto p-4 mt-20">
      <h2 className="text-xl font-bold mb-4">You might also like</h2>
      <div className="flex flex-nowrap overflow-x-auto gap-6 pb-4 lg:grid lg:grid-cols-4 lg:overflow-x-visible">
        {crossListProducts.map((item) => (
          <div
            key={item.id}
            className="group cursor-pointer w-[70%] shrink-0 lg:w-full"
          >
            <div className="relative aspect-square w-full bg-white rounded-lg overflow-hidden">
              <Image
                src={`/${item.image}`}
                alt={item.name}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                className="object-contain p-2 group-hover:scale-105 transition-transform"
              />
            </div>
            <p className="mt-2 text-sm font-medium">{item.name}</p>
            <p className="text-gray-400">${formattedPrice(item.priceCents)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CrossSellList;
