"use client";

import useCart from "@/hooks/useCart";
import useCartTotals from "@/hooks/useCartTotals";
import Breadcrumb from "@/components/Breadcrumb";
import TitledInput from "./TitledInput";
import OrderSummary from "../OrderSummary";
import CircleTag from "./CircleTag";
import { Radio, RadioGroup } from "@headlessui/react";
import { useState, useEffect } from "react";
import { formattedPrice } from "@/lib/utils/money";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const router = useRouter();
  const {
    cart,
    form,
    getInputValue,
    removeAllItem,
    updateOrderSummary,
    resetForm,
  } = useCart();
  const { preTotalDisplay, shippingDisplay, totalDisplay } = useCartTotals();

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
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const cartItems = Array.from(cart.values());

  useEffect(() => {
    setIsReady(true);

    if (cartItems.length === 0) {
      router.push("/cart");
    }
  }, [cartItems, router]);

  if (!isReady || cartItems.length === 0) {
    return null;
  }

  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const handlePlaceOrder = async () => {
    const generatedId = `ORD-${Date.now()}-${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
    const destination = `/cart/checkout/success?orderId=${generatedId}&name=${form.firstName}`;

    const summary = {
      recipient: form,
      orders: [...cartItems],
      subtotal: preTotalDisplay,
      shipping: shippingDisplay,
      total: totalDisplay,
    };
    updateOrderSummary(summary);
    await delay(1500);
    router.push(destination);
    await delay(1500);
    removeAllItem();
    resetForm();
  };

  return (
    <div>
      <div className="max-w-300 mx-auto mb-20">
        <Breadcrumb />
        <h1 className="text-4xl font-bold mb-10">Finalize Order</h1>
        <div className="flex gap-15 flex-col lg:flex-row justify-between">
          <div className="flex flex-col flex-1">
            <div className="flex flex-col">
              <CircleTag count={1} title={"Shipping Information"} />
              <div className="mt-5">
                <div className="flex flex-col lg:flex-row gap-4">
                  <TitledInput
                    title={"FIRST NAME"}
                    name={"firstName"}
                    value={form.firstName}
                    setInput={getInputValue}
                  />
                  <TitledInput
                    title={"LAST NAME"}
                    name={"lastName"}
                    value={form.lastName}
                    setInput={getInputValue}
                  />
                </div>
                <div className="mt-6">
                  <TitledInput
                    title={"ADDRESS"}
                    name={"address"}
                    value={form.address}
                    setInput={getInputValue}
                  />
                </div>
                <div className="flex flex-col lg:flex-row gap-4 mt-6">
                  <TitledInput
                    title={"CITY"}
                    name={"city"}
                    value={form.city}
                    setInput={getInputValue}
                  />
                  <div className="flex gap-4 w-full">
                    <TitledInput
                      title={"STATE"}
                      name={"state"}
                      value={form.state}
                      setInput={getInputValue}
                    />
                    <TitledInput
                      title={"ZIP CODE"}
                      name={"zipCode"}
                      value={form.zipCode}
                      setInput={getInputValue}
                    />
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
                  className="flex flex-1 gap-5 mt-7 flex-col lg:flex-row"
                  by="type"
                >
                  {shipMethods.map((method) => (
                    <Radio
                      key={method.title}
                      value={method}
                      className="cursor-pointer relative border-2 border-transparent bg-white data-checked:border-sky-300 flex items-center p-4 w-full justify-between rounded-lg"
                    >
                      <div className="absolute inset-0"></div>
                      <div>
                        <h2 className="mb-1 text-lg font-semibold">
                          {method.title}
                        </h2>
                        <p className="text-sm text-gray-500">{method.days}</p>
                      </div>
                      <p className="text-sm font-semibold text-sky-400">
                        {method.price === 0
                          ? "Complimentary"
                          : `$${formattedPrice(method.price)}`}
                      </p>
                    </Radio>
                  ))}
                </RadioGroup>
              </div>
            </div>
          </div>
          <div className="">
            <OrderSummary
              cartItems={cartItems}
              shipMethod={selected}
              buttonTitle={"PLACE ORDER"}
              onNavigate={handlePlaceOrder}
            />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
