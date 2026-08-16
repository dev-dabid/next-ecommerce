import useProducts from "@/hooks/useProducts";
import { formattedPrice } from "@/lib/utils/money";
import { CartProduct } from "@/types/types";
import Image from "next/image";
import Link from "next/link";

type CrossSellListProps = {
  cartItems: CartProduct[];
};

export function CrossSellList({ cartItems }: CrossSellListProps) {
  const { products } = useProducts();
  // const { cart } = useCart();

  const currentCart = new Map(cartItems.map((item) => [item.id, item]));
  const cartIds = new Set(
    Array.from(currentCart.values()).map((item) => item.id),
  );
  const cartKeywords = new Set(
    Array.from(currentCart.values()).flatMap((item) => item.keywords),
  );

  const relatedProducts = products.filter((item) => {
    const isInCart = cartIds.has(item.id);
    const isRelated = item.keywords.some((item) => cartKeywords.has(item));

    return !isInCart && isRelated;
  });

  const crossListProducts = relatedProducts.slice(0, 4);

  return (
    <div className="w-full max-w-300 mx-auto p-4 mt-20">
      <h2 className="text-xl font-bold mb-4">You might also like</h2>
      <div className="flex flex-nowrap overflow-x-auto gap-6 pb-4 lg:grid lg:grid-cols-4 lg:overflow-x-visible">
        {crossListProducts.map((item) => (
          <div
            key={item.id}
            className="group cursor-pointer w-[70%] shrink-0 lg:w-full relative"
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
            <Link
              href={`/collections/${item.id}`}
              className="mt-2 text-sm font-medium after:absolute after:inset-0"
            >
              {item.name}
            </Link>
            <p className="text-gray-400">${formattedPrice(item.priceCents)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CrossSellList;
