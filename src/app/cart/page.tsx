"use client";

import useCart from "@/hooks/useCart";
import CartCard from "./CartCard";

export default function Cart() {
  const { cart, addToCart } = useCart();

  const cartItems = Array.from(cart.values());

  return (
    <div className="">
      <div className="flex flex-col lg:flex-row justify-between max-w-300 mx-auto">
        <div className="flex flex-col w-full">
          <div className="flex justify-between">
            <h1>Shopping Cart</h1>
            <p>Clear all</p>
          </div>
          <div className="grid gap-5">
            {cartItems.map((item, index) => {
              return <CartCard key={index} product={item} />;
            })}
          </div>
        </div>
        <div>d</div>
      </div>
    </div>
  );
}
