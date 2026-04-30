"use client";

import useCart from "@/hooks/useCart";
import SuccessCard from "./SuccessCard";

export default function Success() {
  const { orderSummary } = useCart();

  console.log(orderSummary);

  return (
    <div className="max-w-300 mx-auto">
      <div className="flex justify-center my-10">
        <h1 className="text-6xl font-semibold">THANK YOU FOR YOUR ORDER!</h1>
      </div>

      <div className="flex justify-between gap-5 ">
        <div className="flex-1 bg-white rounded-3xl flex flex-col p-10">
          <h1 className="text-xl font-semibold">ORDER SUMMARY</h1>
          <div className="mt-10 max-h-75 lg:max-h-70 overflow-y-auto py-2">
            <div className="grid grid-cols-1 gap-4 content-star">
              {orderSummary.orders.map((item, index) => {
                return <SuccessCard key={index} cartItem={item} />;
              })}
            </div>
          </div>
          <div className="w-full border border-gray-100 my-10"></div>
          <div className="flex flex-col">
            <div className="flex justify-between mb-3">
              <p className="text-gray-400">Subtotal</p>
              <p className="font-semibold">{orderSummary.subtotal}</p>
            </div>
            <div className="flex justify-between mb-8">
              <p className="text-gray-400">Shipping</p>
              <p className="font-semibold">{orderSummary.shipping}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-2xl font-semibold">TOTAL</p>
              <p className="text-2xl font-semibold">{orderSummary.total}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col max-w-100 w-full">
          <div className="md:col-span-2  bg-orange-400 rounded-3xl p-6 text-white">
            <h2 className="text-xl font-semibold">Wide Feature</h2>
          </div>

          <div className="md:col-span-2  bg-zinc-800 rounded-3xl p-6 text-white">
            <h2 className="text-lg font-medium">Stats</h2>
          </div>
          <div className="md:col-span-2  bg-zinc-800 rounded-3xl p-6 text-white">
            <h2 className="text-lg font-medium">Stats</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
