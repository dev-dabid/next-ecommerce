"use client";

import { addToCartDB } from "@/actions/cart";
import useProducts from "@/hooks/useProducts";
import useCart from "@/hooks/useCart";
import { useState } from "react";
import { Product } from "@/types/types";
import Image from "next/image";
import { formattedPrice } from "@/lib/utils/money";
import Breadcrumb from "./Breadcrumb";
import ProductRating from "./ProductRating";
import SizeSelector from "./SizeSelector";
import ColorSelector from "./ColorSelector";
import QuantitySelector from "./QuantitySelector";
import RelatedProducts from "./RelatedProducts";
import FavoriteToggle from "./FavoriteToggle";
import { ShoppingCart } from "lucide-react";

type ProductViewProps = {
  product: Product;
};

const ProductView = ({ product }: ProductViewProps) => {
  const colors = [
    { name: "white", color: "bg-gray-200" },
    { name: "black", color: "bg-gray-950" },
    { name: "blue", color: "bg-blue-500" },
    { name: "green", color: "bg-green-600" },
  ];

  const sizes = [
    { id: 1, name: "XS" },
    { id: 2, name: "S" },
    { id: 3, name: "M" },
    { id: 4, name: "L" },
    { id: 5, name: "XL" },
  ];

  const [selected, setSelected] = useState({
    color: colors[0],
    size: sizes[1],
    count: 1,
  });
  const { optimisticAdd, optimisticRollback, addToCart, updateCartCount } =
    useCart();

  const { image, name, priceCents, rating } = product;

  const productItem = product.keywords.includes("apparel")
    ? {
        ...product,
        color: selected.color.name,
        size: selected.size.name,
        quantity: selected.count,
        isChecked: true,
      }
    : { ...product, quantity: selected.count, isChecked: true };

  const optimisticAddToCart = () => {
    try {
      optimisticAdd(selected.count);
      addToCartDB("user-1234", productItem);
    } catch (error) {
      optimisticRollback(selected.count);
    }
  };

  return (
    <div className="pb-10">
      <Breadcrumb />
      <div className="flex flex-col sm:items-center lg:flex-row lg:items-start gap-5 lg:gap-10">
        <div className="flex-shrink-0 w-full max-w-[500px]">
          <div className="relative overflow-hidden w-full aspect-[500/613] rounded-2xl bg-white flex items-center justify-center">
            <Image
              src={`/${image}`}
              alt="description"
              fill
              className="object-contain p-4"
              sizes="(max-width: 500px) 100vw, 500px"
              priority
            />
          </div>
        </div>
        <div className="max-w-[500px]">
          <div className="mt-1 border-b border-b-sky-100 pb-8">
            <h1 className="text-[clamp(1.5rem,5vw,2.25rem)] font-bold line-clamp-2 leading-tight">
              {name}
            </h1>
            <div className="mt-2 flex items-center gap-4">
              <h1 className="text-[clamp(1.5rem,5vw,2.25rem)] font-bold text-sky-400">
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
              <div className="mt-5 flex flex-col gap-5">
                {productItem.keywords.includes("apparel") && (
                  <>
                    <ColorSelector
                      selected={selected}
                      setSelected={setSelected}
                      colors={colors}
                    />
                    <SizeSelector
                      selected={selected}
                      setSelected={setSelected}
                      sizes={sizes}
                    />
                  </>
                )}
                <QuantitySelector
                  selected={selected}
                  setSelected={setSelected}
                />

                <div className="flex gap-3">
                  <button
                    className="hover:bg-sky-600 active:bg-sky-500 cursor-pointer text-center text-white font-semibold bg-sky-500 w-full max-w-[434.69px] py-4 rounded-xl"
                    onClick={() => {
                      optimisticAddToCart();
                    }}
                  >
                    <p className="flex justify-center items-center gap-3">
                      <ShoppingCart /> Add to Cart
                    </p>
                  </button>
                  <FavoriteToggle userId="user-1234" productId={product.id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-10"></div>
    </div>
  );
};

export default ProductView;
