"use client";

import useCart from "@/hooks/useCart";
import Breadcrumb from "@/components/Breadcrumb";
import TitledInput from "./TitledInput";
import OrderSummary from "../OrderSummary";
import CircleTag from "./CircleTag";
import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import { useState, useEffect } from "react";
import { formattedPrice } from "@/app/lib/utils/money";

export default function Checkout() {
  const { cart } = useCart();

  const shipMethods = [
    {
      type: "standard",
      title: "Standard Delivery",
      days: "4-7 business days",
      price: 0,
    },
    {
      type: "express",
      title: "Express Courier",
      days: "1-2 business days",
      price: 3500,
    },
  ];
  const [selected, setSelected] = useState(shipMethods[0]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartItems = Array.from(cart.values());

  console.log(selected);
  return (
    <div>
      <div className="max-w-300 mx-auto">
        <Breadcrumb />
        <h1 className="text-4xl font-bold mb-10">Finalize Order</h1>
        <div className="flex gap-15 justify-between">
          <div className="flex flex-col flex-1">
            <div className="flex flex-col">
              <CircleTag count={1} title={"Shipping Information"} />
              <div className="mt-5">
                <div className="flex gap-4">
                  <TitledInput title={"FIRST NAME"} />
                  <TitledInput title={"LAST NAME"} />
                </div>
                <div className="mt-6">
                  <TitledInput title={"ADDRESS"} />
                </div>
                <div className="flex gap-4 mt-6">
                  <TitledInput title={"CITY"} />
                  <div className="flex gap-4 w-full">
                    <TitledInput title={"STATE"} />
                    <TitledInput title={"ZIP CODE"} />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col mt-15">
              <CircleTag count={2} title={"Shipping Method"} />
              <div className="flex  flex-1">
                <RadioGroup
                  value={selected}
                  onChange={setSelected}
                  className="flex flex-1 gap-5 mt-7"
                  by="type"
                >
                  {shipMethods.map((method) => (
                    <Radio
                      key={method.title}
                      value={method}
                      className="border-2 border-transparent bg-white data-checked:border-sky-300 flex items-center p-4 w-full justify-between rounded-lg"
                    >
                      <div>
                        <h2 className="mb-1 text-lg font-semibold">
                          {method.title}
                        </h2>
                        <p className="text-sm text-gray-500">{method.days}</p>
                      </div>
                      <p className="text-sm font-semibold text-sky-400">
                        {method.price === 0
                          ? "Complimentary"
                          : `${formattedPrice(method.price)}`}
                      </p>
                    </Radio>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
          <div className="">
            <OrderSummary cartItems={cartItems} />
          </div>
        </div>
      </div>
    </div>
  );
}
