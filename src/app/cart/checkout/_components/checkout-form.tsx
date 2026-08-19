"use client";

import React, { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { FormFields } from "@/types/types";
import { Loader2 } from "lucide-react";

type SelectedType = {
  type: string;
  title: string;
  days: string;
  price: number;
};

type CheckoutFormProps = {
  isPending: boolean;
  updateShipping: (
    newValue: SelectedType,
    userId: string,
    form: FormFields,
  ) => Promise<void>;
  selected: SelectedType;
  userId: string;
  form: FormFields;
};

export function CheckoutForm({
  isPending,
  updateShipping,
  selected,
  userId,
  form,
}: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    await updateShipping(selected, userId, form);

    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setErrorMessage(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message || "Card details error!");
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/success`,
      },
    });

    if (error) {
      setErrorMessage(error.message || "Payment unsuccessful.");
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 border rounded-lg bg-white shadow-md"
    >
      <PaymentElement />
      {errorMessage && (
        <div className="text-red-500 mt-2 text-sm font-semibold">
          {errorMessage}
        </div>
      )}
      <button
        disabled={!stripe || loading || isPending}
        className="flex justify-center items-center w-full mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50 font-medium transition-colors"
      >
        {isPending ? (
          <Loader2 className="animate-spin" />
        ) : loading ? (
          "Processing Payment..."
        ) : (
          "Pay Now"
        )}
      </button>
    </form>
  );
}
