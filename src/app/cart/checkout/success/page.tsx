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

      <div className="grid grid-cols-1 md:grid-cols-6 grid-rows-3 gap-4 p-6 h-screen">
        <div className="md:col-span-4 md:row-span-3 bg-white rounded-3xl p-6 flex flex-col">
          <h1 className="text-xl font-semibold">ORDER SUMMARY</h1>
          <div className="my-10 max-h-75 lg:max-h-100 overflow-y-auto pr-2 py-2">
            <div className="grid grid-cols-1 gap-4 content-start">
              {orderSummary.orders.map((item) => {
                return <SuccessCard key={item.id} cartItem={item} />;
              })}
            </div>
          </div>
          <div className="w-full border border-gray-300"></div>
          <div></div>
        </div>

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
  );
}
