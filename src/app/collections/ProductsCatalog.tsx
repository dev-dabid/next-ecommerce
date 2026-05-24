"use client";

import useProducts from "@/hooks/useProducts";
import { useState, useEffect, useMemo } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import FilterDropdown from "./FilterDropdown";
import ProductCard from "../../components/ProductCard";
import Footer from "@/components/Footer";
import { Product } from "@/types/types";

const ProductCatalog = () => {
  const { products } = useProducts();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(8);
  const [isChecked, setIsChecked] = useState(false);

  const total = products.length;

  const uniqueKeywords = useMemo(() => {
    return Array.from(new Set(products.flatMap((p) => p.keywords)));
  }, [products]);

  const progressPercentage = (visible / total) * 100;

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

        <div className="flex justify-between gap-5">
          <div className="flex flex-col max-w-65 w-full">
            <div>
              <h2>CATEGORY</h2>
              <div>
                <div className="my-5 max-h-48 overflow-y-auto pr-2">
                  {uniqueKeywords.map((item) => {
                    return (
                      <div className="flex items-center gap-3" key={item}>
                        <input
                          type="checkbox"
                          value={item}
                          checked={isChecked}
                          onChange={() => setIsChecked}
                        />
                        <p>{item}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-15">
              <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-6 gap-y-5">
                {products.slice(0, visible).map((product) => {
                  return <ProductCard key={product.id} product={product} />;
                })}
              </div>
              <div className="flex justify-center items-center flex-col">
                <p className="mb-4">
                  Showing {visible} of {products.length} products
                </p>
                <div
                  className={`w-[clamp(17.5rem,80vw,25rem)] bg-gray-200 mb-7`}
                >
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
      </div>
      <Footer />
    </div>
  );
};

export default ProductCatalog;
