"use client";

import useProducts from "@/hooks/useProducts";
import { useState, useEffect, useMemo } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import FilterDropdown from "./FilterDropdown";
import ProductCard from "../../components/ProductCard";
import Footer from "@/components/Footer";

export default function Collections() {
  const { products } = useProducts();

  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(8);

  const total = products.length;

  const uniqueKeywords = useMemo(() => {
    return Array.from(new Set(products.flatMap((p) => p.keywords)));
  }, [products]);

  const progressPercentage = (visible / total) * 100;
  const slicedProducts = products.slice(0, visible);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleExploreMore = () => {
    setVisible((prev) => Math.min(prev + 8, total));
  };

  if (!mounted) return null;

  return (
    <div className="">
      <div className="max-w-300 mx-auto mb-30">
        <Breadcrumb />
        <div className="mb-10">
          <div>
            <h1 className="text-[clamp(1.9rem,5vw,3rem)] font-bold mb-2">
              Summer Essentials
            </h1>
            <p className="text-[clamp(1rem,2vw,1.125rem)] max-w-[30ch] md:max-w-[53ch]">
              Curated selection of premium pieces designed for light, airy
              comfort and timeless style.
            </p>
          </div>
        </div>

        <div>
          <div className="hidden md:flex gap-5">
            <FilterDropdown title={"Category"} menuItem={uniqueKeywords} />
            <FilterDropdown title={"Price Range"} />
          </div>

          <div className="flex flex-col gap-15">
            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 gap-y-5">
              {products.slice(0, visible).map((product) => {
                return <ProductCard key={product.id} product={product} />;
              })}
            </div>
            <div className="flex justify-center items-center flex-col">
              <p className="mb-4">
                Showing {visible} of {products.length} products
              </p>
              <div className={`w-[clamp(17.5rem,80vw,25rem)] bg-gray-200 mb-7`}>
                <div
                  className="h-2 bg-sky-400 transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
              <button
                onClick={handleExploreMore}
                className={`${visible >= total ? "hidden" : "flex"} py-3 px-8 font-semibold border-2 border-gray-300 rounded-xl hover:bg-sky-300 active:bg-sky-400`}
              >
                Explore More
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
