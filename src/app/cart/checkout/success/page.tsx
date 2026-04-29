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

      <div className="flex justify-between gap-5">
        <div className="p-3 flex-1 bg-white rounded-3xl flex flex-col">
          <h1 className="text-xl font-semibold">ORDER SUMMARY</h1>
          <div className="my-10 max-h-75 lg:max-h-100 overflow-y-auto pr-2 py-2">
            <div className="grid grid-cols-1 gap-4 content-start">
              {orderSummary.orders.map((item) => {
                return <SuccessCard key={item.id} cartItem={item} />;
              })}
            </div>
          </div>
          <div className="w-full border border-gray-300"></div>
          <div className="flex flex-col">
            <div className="flex justify-between">
              <p>Subtotal</p>
              <p>{orderSummary.subtotal}</p>
            </div>
            <div className="flex justify-between">
              <p>Shipping</p>
              <p>{orderSummary.shipping}</p>
            </div>
            <div className="flex justify-between">
              <p>Total</p>
              <p>{orderSummary.total}</p>
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
