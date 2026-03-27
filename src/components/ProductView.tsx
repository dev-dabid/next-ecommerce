"use client";

import useProducts from "@/hooks/useProducts";
import { useState, useEffect } from "react";
import Image from "next/image";
import { formattedPrice } from "@/app/lib/utils/money";
import ProductRating from "./ProductRating";
import SizeSelector from "./SizeSelector";
import ColorSelector from "./ColorSelector";

type ProductViewProps = {
  id: string;
};

const ProductView = ({ id }: ProductViewProps) => {
  const [mounted, setMounted] = useState(false);
  const { products } = useProducts();

  useEffect(() => {
    setMounted(true);
  }, []);

  const getProduct = products.find((product) =>
    String(product.id).includes(String(id)),
  );

  console.log(getProduct);

  if (!mounted)
    return <div className="animate-pulse bg-gray-200 h-96 rounded-xl" />;

  if (!getProduct) return <p>Product not found, bro.</p>;

  const { image, name, priceCents, rating } = getProduct;

  return (
    <div>
      <div className="flex flex-col lg:flex-row gap-10">
        <div>
          <div className="overflow-hidden rounded-2xl">
            <Image
              className="object-contain"
              src={`/${image}`}
              alt=""
              width={500}
              height={500}
            />
          </div>
        </div>
        <div>
          <div className="mt-2  border-b border-b-sky-100 pb-8">
            <h1 className="text-4xl font-bold">{name}</h1>
            <div className="mt-4 flex items-center gap-4">
              <h1 className="text-3xl font-bold text-sky-400">
                ${formattedPrice(priceCents)}
              </h1>
              <ProductRating
                ratingValue={rating.stars}
                ratingCount={rating.count}
              />
            </div>
          </div>
          <div className="mt-7">
            <p className="inline-block max-w-[50ch] text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat
            </p>
            <div>
              <div className="mt-5">
                <ColorSelector />
                <SizeSelector />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductView;
