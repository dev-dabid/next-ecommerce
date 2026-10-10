"use client";

import useProducts from "@/hooks/useProducts";
import { useState, useEffect, useMemo, useRef } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import { FilterDropdown } from "./filter-dropdown";
import ProductCard from "@/components/ProductCard";
import { Category } from "./category";
import Footer from "@/components/Footer";
import { Button } from "@/components/Button";
import { X, Shirt, Watch, Footprints, Tv } from "lucide-react";
import Link from "next/link";

export function ProductCatalog() {
  const { products } = useProducts();
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(8);
  const [isDragging, setIsDragging] = useState(false);
  const [positionX, setPositionX] = useState(0);
  const dragOffsetX = useRef(0);
  const [isOpen, setIsOpen] = useState(false);

  const total = products.length;
  const uniqueKeywords = useMemo(() => {
    return Array.from(new Set(products.flatMap((p) => p.keywords)));
  }, [products]);

  const [isChecked, setIsChecked] = useState<Set<string>>(new Set());

  const filteredProducts = products.filter((item) => {
    if (isChecked.size === 0) return true;
    return item.keywords.some((key) => isChecked.has(key));
  });

  console.log(filteredProducts);

  const progressPercentage = (visible / total) * 100;

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    console.log(e.clientX);
  };

  const handleExploreMore = () => {
    setVisible((prev) => Math.min(prev + 8, total));
  };

  const firstChar = (chars: string) => {
    const charsSplit = chars.split(" ");
    const capitalizeFirstChar = charsSplit.map((char) => {
      const firstChar = char.charAt(0).toUpperCase();
      const charSliced = char.slice(1);

      return firstChar + charSliced;
    });
    const charsJoin = capitalizeFirstChar.join(" ");

    return charsJoin;
  };

  console.log(firstChar("mens wear"));

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

        <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
          <div className="flex lg:hidden relative">
            <FilterDropdown title="Categories" />
            {isOpen && (
              <div className="flex flex-wrap absolute z-1000 bg-white gap-5 top-12 p-3 rounded-md">
                {uniqueKeywords.map((item) => {
                  return (
                    <Category
                      key={item}
                      category={item}
                      isChecked={isChecked}
                      setIsChecked={setIsChecked}
                    />
                  );
                })}
              </div>
            )}
          </div>
          <div className="hidden lg:flex flex-col max-w-65 w-full sticky top-20 h-fit">
            <div className="flex flex-col mb-6 gap-2 text-xl">
              <Link href={`/collections/`} className="flex items-center gap-3">
                <Shirt className="text-sky-400" /> Apparel
              </Link>
              <Link href={`/collections/`} className="flex items-center gap-3">
                <Watch className="text-sky-400" />
                Accessories
              </Link>
              <Link href={`/collections/`} className="flex items-center gap-3">
                <Footprints className="text-sky-400" />
                Footwear
              </Link>
              <Link href={`/collections/`} className="flex items-center gap-3">
                <Tv className="text-sky-400" />
                Appliances
              </Link>
            </div>
            <div>
              <h2 className="font-semibold text-xl">CATEGORY</h2>
              <div className="flex flex-col">
                <div className="my-2 max-h-48 overflow-y-auto pr-2 flex flex-col gap-2">
                  {uniqueKeywords.map((item) => {
                    return (
                      <Category
                        key={item}
                        category={item}
                        isChecked={isChecked}
                        setIsChecked={setIsChecked}
                      />
                    );
                  })}
                </div>
                <Button action={() => setIsChecked(new Set())}>
                  <p className="text-white font-semibold">Clear All</p>
                </Button>

                <div className="flex flex-wrap mt-5 items-start gap-2">
                  {Array.from(isChecked).map((item, index) => {
                    return (
                      <button
                        key={index}
                        className="bg-sky-400 grow py-2 px-2 rounded text-white flex justify-center items-center gap-2"
                        onClick={() =>
                          setIsChecked((prev) => {
                            const newKeys = new Set(prev);
                            newKeys.delete(item);
                            return newKeys;
                          })
                        }
                      >
                        {firstChar(item)}
                        <X size={20} />
                      </button>
                    );
                  })}
                </div>
              </div>
              {/* <div className="w-fit">
                <div
                  className="w-fit"
                  onMouseDown={(e) => handleMouseDown(e)}
                  style={{
                    transform: `translateX(${positionX}px)`,
                    cursor: isDragging ? "grabbing" : "grab",
                  }}
                >
                  bilog
                </div>
              </div> */}
            </div>
          </div>
          <div>
            <div></div>
            <div className="flex flex-col gap-15">
              <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-6 gap-y-5">
                {filteredProducts.map((product) => {
                  return <ProductCard key={product.id} product={product} />;
                })}
              </div>
              {/* <div className="flex justify-center items-center flex-col">
                <p className="mb-4">
                  Showing {visible} of {filteredProducts.length} products
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
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
