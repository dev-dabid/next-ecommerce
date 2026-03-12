"use client";

import useStore from "@/store/store";
import { useEffect } from "react";
import Hero from "./Hero";

export default function Homepage() {
  return (
    <div className="max-w-7xl mx-auto">
      <Hero />
    </div>
  );
}
