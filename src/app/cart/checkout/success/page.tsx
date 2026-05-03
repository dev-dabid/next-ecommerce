"use client";

import useCart from "@/hooks/useCart";
import SuccessCard from "./SuccessCard";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function Success() {
  const { orderSummary } = useCart();
  const recipient = orderSummary.recipient;

  return (
    <div>
      <div className="max-w-300 mx-auto mb-20">
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

          <div className="flex flex-col max-w-90 w-full gap-5">
            <div className="md:col-span-2  bg-white rounded-3xl p-6 text-white">
              <h2 className="text-xl font-semibold">Wide Feature</h2>
              <p className="text-wrap wrap-break-word"></p>
            </div>

            <div className="md:col-span-2  bg-white rounded-3xl p-10 h-full">
              <h2 className="text-sm font-medium text-gray-500 font-semibold mb-5">
                SHIPPING DETAILS
              </h2>
              <div className="mb-5">
                <p className="text-gray-600 font-semibold mb-1">RECIPIENT</p>
                <p className="text-lg font-bold">{`${recipient.firstName} ${recipient.lastName}`}</p>
              </div>
              <div>
                <p className="text-gray-600 font-semibold">ADDRESS</p>
                <p className="text-lg">{`${recipient.address}, ${recipient.city}, ${recipient.state}, ${recipient.zipCode}`}</p>
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Link href={"/collections"}>
                <button className="text-white bg-gray-950 p-3 rounded-lg w-full">
                  CONTINUE SHOPPING
                </button>
              </Link>
              <button className="bg-gray-200 p-3 rounded-lg">
                TRACK ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
