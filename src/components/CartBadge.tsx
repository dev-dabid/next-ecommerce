"use client";

import useCart from "@/hooks/useCart";
import { useEffect } from "react";
import { ShoppingBag } from "lucide-react";

const CartBadge = ({ initialCount }: { initialCount: number }) => {
  const { count, setCount } = useCart();

  useEffect(() => {
    setCount(initialCount);
  }, [initialCount, setCount]);

  return (
    <div className="relative">
      <ShoppingBag />
      <div className="absolute w-5 h-5 rounded-full bg-sky-400 -top-2 -right-2.5 flex justify-center items-center text-xs text-white">
        {count}
      </div>
    </div>
  );
};

export default CartBadge;
