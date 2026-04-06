"use client";

import useCart from "@/hooks/useCart";
import { useMemo } from "react";
import CartCard from "./CartCard";
import OrderSummary from "./OrderSummary";
import Footer from "@/components/Footer";

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
      <div className="flex flex-col lg:flex-row justify-between max-w-300 mx-auto gap-10">
        <div className="flex flex-col w-full">
          <div className="flex justify-between mb-5">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold">Shopping Cart</h1>
              <p>{displayCartTotalItems}</p>
            </div>

            <p className="text-sky-500">Clear all</p>
          </div>
          <div className="max-h-[300px] lg:max-h-[500px] overflow-y-auto pr-2 py-2">
            <div className="grid grid-cols-1 gap-5 content-start">
              {cartItems.map((item, index) => (
                <div key={index} className="h-fit w-full">
                  <CartCard
                    product={item}
                    updateQuantity={updateQuantity}
                    inputQuantity={inputQuantity}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center max-w-full lg:max-w-100  w-full">
          <OrderSummary cartItems={cartItems} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
