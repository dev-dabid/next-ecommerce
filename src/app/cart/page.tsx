"use client";

import useCart from "@/hooks/useCart";
import { useMemo } from "react";
import CartCard from "./CartCard";
import OrderSummary from "./OrderSummary";

export default function Cart() {
  const { cart, updateQuantity, inputQuantity } = useCart();

  const cartItems = Array.from(cart.values());

  const cartTotalItems = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  const displayCartTotalItems = `(${cartTotalItems} items)`;

  return (
    <div className="mt-5">
      <div className="flex flex-col lg:flex-row justify-between max-w-300 mx-auto h-screen gap-10">
        <div className="flex flex-col w-full">
          <div className="flex justify-between mb-5">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold">Shopping Cart</h1>
              <p>{displayCartTotalItems}</p>
            </div>

            <p className="text-sky-500">Clear all</p>
          </div>
          <div className="grid gap-5">
            {cartItems.map((item, index) => {
              return (
                <CartCard
                  key={index}
                  product={item}
                  updateQuantity={updateQuantity}
                  inputQuantity={inputQuantity}
                />
              );
            })}
          </div>
        </div>
        <OrderSummary cartItems={cartItems} />
      </div>
    </div>
  );
}
