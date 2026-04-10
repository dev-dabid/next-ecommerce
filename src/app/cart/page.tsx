"use client";

import useCart from "@/hooks/useCart";
import { useMemo, useState } from "react";
import Link from "next/link";
import CartCard from "./CartCard";
import OrderSummary from "./OrderSummary";
import CrossSellList from "./CrossSellList";
import Footer from "@/components/Footer";
import { Shield, MoveLeft, Truck } from "lucide-react";

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

  return (
    <div className="mt-8">
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
      <div className="flex flex-col mb-15">
        <div>
          <div className="flex flex-col lg:flex-row justify-between max-w-300 mx-auto gap-10 w-full">
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
              <div className="max-h-75 lg:max-h-100 overflow-y-auto pr-2 py-2">
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
            <div className="flex w-full lg:max-w-100 items-start">
              <div className="flex flex-col justify-center text-center w-full">
                <OrderSummary cartItems={cartItems} />
                <Link
                  className="mt-5 text-sm font-semibold flex justify-center items-center gap-2 text-gray-500 hover:text-gray-700"
                  href={"/collections"}
                >
                  <MoveLeft className="inline-block w-4" /> Continue Shopping
                </Link>
              </div>
            </div>
          </div>
          <div className="max-w-300 mx-auto flex flex-col gap-4 mt-10 lg:mt-5 items-center lg:items-start">
            <div className="flex gap-3 items-center">
              <Truck className=" fill-sky-500" size={30} />
              <p className="text-gray-700">Free shipping on orders over $500</p>
            </div>
            <div className="flex gap-3 items-center">
              <Shield className=" fill-sky-500" size={30} />
              <p className="text-gray-700">Secure checkout powered by Stripe</p>
            </div>
          </div>
        </div>
        {cartItems.length > 0 && <CrossSellList />}
      </div>
      <Footer />
    </div>
  );
}
