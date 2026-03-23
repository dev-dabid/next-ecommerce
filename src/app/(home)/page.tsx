"use client";

import useProducts from "@/hooks/useProducts";
import { useState, useEffect } from "react";
import Hero from "./Hero";
import CategorySection from "./CategorySection";
import TrendSection from "./TrendSection";
import NewsLetterSection from "./NewsLetterSection";
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
