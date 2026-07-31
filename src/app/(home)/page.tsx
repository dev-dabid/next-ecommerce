"use client";

import useProducts from "@/hooks/useProducts";
import { Hero } from "./_components/hero";
import { CategorySection } from "./_components/category-section";
import { TrendSection } from "./_components/trend-section";
import { NewsLetterSection } from "./_components/news-letter-section";
import Footer from "@/components/Footer";

export default function Home() {
  const { products } = useProducts();

  return (
    <div className="">
      <Hero />
      <CategorySection products={products || []} />
      <TrendSection products={products || []} />
      <NewsLetterSection />
      <Footer />
    </div>
  );
}
