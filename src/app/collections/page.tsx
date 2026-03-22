"use client";

import useProducts from "@/hooks/useProducts";
import { useState, useEffect, useMemo } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import FilterDropdown from "./FilterDropdown";
import CollectionCard from "./CollectionCard";
import Footer from "@/components/Footer";
import { UserSquareIcon } from "lucide-react";

export default function Page() {
  const { products } = useProducts();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const uniqueKeywords = useMemo(() => {
    const keywords = new Set<string>();
    const flatKeywords = products.flatMap((p) => p.keywords);

    flatKeywords.forEach((keyword) => {
      keywords.add(keyword);
    });

    return [...keywords];
  }, [products]);

  console.log(uniqueKeywords);

  return (
    <div className="">
      <div className="max-w-300 mx-auto mb-10">
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

          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 gap-y-5">
            {products.map((product, index) => {
              return <CollectionCard key={index} product={product} />;
            })}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
