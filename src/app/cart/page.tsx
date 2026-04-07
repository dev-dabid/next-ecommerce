"use client";

import useCart from "@/hooks/useCart";
import { useMemo, useState } from "react";
import CartCard from "./CartCard";
import OrderSummary from "./OrderSummary";
import Footer from "@/components/Footer";

export default function Cart() {
  const {
    cart,
    updateQuantity,
    inputQuantity,
    removeAllItem,
    removeItem,
    selectItem,
  } = useCart();

  const [isConfirmingClear, setIsConfirmingClear] = useState(false);

  const cartItems = Array.from(cart.values());
  const cartTotalItems = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0,
  );

  const displayCartTotalItems = `(${cartTotalItems} items)`;

  const handleCancel = () => {
    setIsConfirmingClear(false);
  };

  const handleOpen = () => {
    setIsConfirmingClear(true);
  };

  const handleConfirm = () => {
    handleCancel();
    removeAllItem();
  };

  console.log(cartItems);

  return (
    <div className="mt-5">
      {isConfirmingClear && (
        <div className="absolute inset-0 bg-gray-500/40 flex justify-center items-center z-10">
          <div className="bg-white flex flex-col mb-50 w-full max-w-100 p-5 rounded-xl">
            <h2 className="font-semibold text-xl">Delete all cart items</h2>
            <p className="text-sm text-gray-500 mt-2">
              You are deleting all cart items. Do you want to proceed?
            </p>
            <div className="mt-8 flex justify-between gap-3">
              <button
                className="w-full border border-gray-300 py-2 rounded-lg font-semibold"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="w-full border bg-sky-400 py-2 rounded-lg text-white font-semibold"
                onClick={handleConfirm}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col lg:flex-row justify-between max-w-300 mx-auto gap-10">
        <div className="flex flex-col w-full">
          <div className="flex justify-between mb-5">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold">Shopping Cart</h1>
              <p>{displayCartTotalItems}</p>
            </div>

            <button onClick={handleOpen}>
              <p className="text-sky-500">Clear all</p>
            </button>
          </div>
          <div className="max-h-[300px] lg:max-h-[500px] overflow-y-auto pr-2 py-2">
            <div className="grid grid-cols-1 gap-5 content-start">
              {cartItems.map((item, index) => (
                <div key={index} className="h-fit w-full">
                  <CartCard
                    product={item}
                    updateQuantity={updateQuantity}
                    inputQuantity={inputQuantity}
                    removeItem={removeItem}
                    selectItem={selectItem}
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
