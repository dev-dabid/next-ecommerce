import type { Product } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { formattedPrice } from "@/app/lib/utils/money";

type RelatedProductsProps = {
  mainProductId: string;
  products: Product[];
  relatedKey: string;
};

const RelatedProducts = ({
  mainProductId,
  products,
  relatedKey,
}: RelatedProductsProps) => {
  const filteredProducts = products
    .filter(
      (product) =>
        product.keywords.includes(relatedKey) && product.id !== mainProductId,
    )
    .slice(0, 4);

  return (
    <>
      {filteredProducts.length > 0 ? (
        <div className="mt-20">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold lg:px-0">Related Products</h1>
            <Link className="font-semibold text-sky-500" href={""}>
              View all
            </Link>
          </div>

          <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide lg:grid lg:grid-cols-4 lg:gap-6 mt-4 pb-4 px-4 lg:px-0">
            {filteredProducts.map((product, index) => (
              <div
                className="flex flex-col min-w-[70%] sm:min-w-[40%] lg:min-w-full snap-start group"
                key={index}
              >
                <div className="relative aspect-square overflow-hidden rounded-2xl bg-white mb-3">
                  <Image
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    src={`/${product.image}`}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 70vw, 25vw"
                  />
                </div>

                <div className="flex flex-col flex-1">
                  <h2 className="text-sm font-semibold text-zinc-900 line-clamp-2 min-h-[2.5rem] ">
                    {product.name}
                  </h2>
                  <p className="mt-1 text-sky-600 font-bold">
                    ${formattedPrice(product.priceCents)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default RelatedProducts;
