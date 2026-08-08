"use client";

import useCart from "@/hooks/useCart";
import useCartTotals from "@/hooks/useCartTotals";
import Breadcrumb from "@/components/Breadcrumb";
import { TitledInput } from "./titled-input";
import { OrderSummary } from "../../_components/order-summary";
import { submitOrderData } from "@/actions/cart";
import { CircleTag } from "./circle-tag";
import { Radio, RadioGroup } from "@headlessui/react";
import { useState, useEffect } from "react";
import { formattedPrice } from "@/lib/utils/money";
import Footer from "@/components/Footer";
import { useRouter } from "next/navigation";
import { CartProduct } from "@/types/types";
import { useTransition } from "react";
import { toast } from "sonner";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "./checkout-form";

type CheckoutPageProps = {
  cartItems: CartProduct[];
  userId: string;
};

type SelectedType = {
  type: string;
  title: string;
  days: string;
  price: number;
};

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
);

export function CheckoutPage({ userId, cartItems }: CheckoutPageProps) {
  const router = useRouter();
  const { form, getInputValue, resetForm } = useCart();

  const shipMethods = [
    {
      type: "STANDARD",
      title: "Standard Delivery",
      days: "4-7 business days",
      price: 0,
    },
    {
      type: "EXPRESS",
      title: "Express Courier",
      days: "1-2 business days",
      price: 3500,
    },
  ];

  const [selected, setSelected] = useState(shipMethods[0]);

  const {
    preTotalDisplay,
    shippingDisplay,
    totalDisplay,
    totalCents,
    actualTotalCents,
    actualShippingFee,
    hasFreeShipping,
  } = useCartTotals({ cartItems });

  const [isMounted, setIsMounted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [clientSecret, setClientSecret] = useState<string>("");

  const options = {
    clientSecret: clientSecret,
  };

  const initializePayment = async (newValue: SelectedType) => {
    try {
      const response = await fetch("/api/webhooks/checkout", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          userId: userId,
          shipping: newValue,
        }),
      });

      const data = await response.json();

      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
      }
    } catch (err) {
      console.error("Cannot load payment gateway:", err);
    }
  };

  useEffect(() => {
    initializePayment(selected);
  }, []);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setIsReady(true);

    if (cartItems.length === 0) {
      router.push("/cart");
    }
  }, [cartItems, router]);

  if (!isReady || cartItems.length === 0) {
    return null;
  }

  const updateShippingType = (newValue: SelectedType) => {
    const preVal = selected;
    setSelected(newValue);
    startTransition(async () => {
      try {
        await initializePayment(newValue);
      } catch (err) {
        console.error("Cannot update shipping type:", err);
        toast.error("Failed to update shipping type!", {
          position: "top-center",
        });
        setSelected(preVal);
      }
    });
  };

  const handlePlaceOrder = () => {
    const summary = {
      recipient: form,
      orders: [...cartItems],
      actualTotalCents: actualTotalCents + selected.price,
      shippingMethod: selected.type,
      shippingFee: selected.price,
      actualShippingFee: actualShippingFee,
      hasFreeShipping: hasFreeShipping,
    };

    startTransition(async () => {
      const response = (await submitOrderData(userId, summary)) as
        | { success: true; orderId: string }
        | { success: false; message: string };

      if (!response) return;

      if (response.success) {
        router.push(`/cart/checkout/success?id=${response.orderId}`);
      } else {
        alert(response.message);
      }
    });
  };

  const openCheckoutForm = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      <div className="max-w-300 mx-auto mb-20">
        <Breadcrumb />
        <h1 className="text-4xl font-bold mb-10">Finalize Order</h1>
        <div className="flex gap-15 flex-col lg:flex-row justify-between">
          <div className="flex flex-col flex-1">
            <form
              id="checkout-form"
              action={openCheckoutForm}
              className="flex flex-col"
            >
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
                <div className="flex flex-col lg:flex-row gap-4 mt-6">
                  <TitledInput
                    title={"MOBILE NUMBER"}
                    name={"phone"}
                    value={form.phone}
                    setInput={getInputValue}
                  />
                  <TitledInput
                    title={"EMAIL ADDRESS"}
                    name={"email"}
                    value={form.email}
                    setInput={getInputValue}
                  />
                </div>
                <div className="flex flex-col lg:flex-row gap-4 mt-6">
                  <TitledInput
                    title={"STREET ADDRESS"}
                    name={"streetAddress"}
                    value={form.streetAddress}
                    setInput={getInputValue}
                  />
                  <TitledInput
                    title={"BARANGAY"}
                    name={"barangay"}
                    value={form.barangay}
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
                      title={"PROVINCE"}
                      name={"province"}
                      value={form.province}
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
            </form>
            <div className="flex flex-col mt-15">
              <CircleTag count={2} title={"Shipping Method"} />
              <div className="flex  flex-1">
                <RadioGroup
                  value={selected}
                  onChange={(newValue) => updateShippingType(newValue)}
                  className="flex flex-1 gap-5 mt-7 flex-col lg:flex-row"
                  disabled={isPending}
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
          <div className="flex w-full lg:max-w-100 items-start">
            {isOpen ? (
              <Elements stripe={stripePromise} options={options}>
                <div className="w-full">
                  <CheckoutForm isPending={isPending} />
                </div>
              </Elements>
            ) : (
              <OrderSummary
                cartItems={cartItems}
                shipMethod={selected}
                buttonTitle={"PLACE ORDER"}
                onNavigate={() => {}}
                isPending={isPending}
              />
            )}

            {/* <OrderSummary
                cartItems={cartItems}
                shipMethod={selected}
                buttonTitle={"PLACE ORDER"}
                onNavigate={() => {}}
                isPending={isPending}
              /> */}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
