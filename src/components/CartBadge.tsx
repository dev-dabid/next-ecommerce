"use client";

import useCart from "@/hooks/useCart";
import { useEffect } from "react";
import { ShoppingBag } from "lucide-react";

type CartBadgeProps = {
  userId: string | null;
  initialCount: number;
};

const CartBadge = ({ userId, initialCount }: CartBadgeProps) => {
  const { count, setCount, cart } = useCart();

  const cartItemTotal = Array.from(cart.values()).reduce(
    (total, item) => total + item.quantity,
    0,
  );

  useEffect(() => {
    setCount(initialCount);
  }, [initialCount, setCount]);

  return (
    <div className="relative">
      <ShoppingBag />
      <div className="absolute w-5 h-5 rounded-full bg-sky-400 -top-2 -right-2.5 flex justify-center items-center text-xs text-white">
        {userId ? count : cartItemTotal}
      </div>
    </div>
  );
};

export default CartBadge;
