"use client";

import type { SelectProperty } from "@/types/types";
import { Dispatch, SetStateAction } from "react";

type QuantitySelectorProps = {
  selected: SelectProperty;
  setSelected: Dispatch<SetStateAction<SelectProperty>>;
};

const QuantitySelector = ({ selected, setSelected }: QuantitySelectorProps) => {
  const handleDecrease = () => {
    setSelected((prev) => {
      return prev.count <= 1 ? { ...prev } : { ...prev, count: prev.count - 1 };
    });
  };
  const handleIncrease = () => {
    setSelected((prev) => {
      return prev.count >= 20
        ? { ...prev }
        : { ...prev, count: prev.count + 1 };
    });
  };
  return (
    <div>
      <p className="font-semibold mb-2 text-gray-500 text-sm">QUANTITY</p>
      <div className="flex border border-sky-200 w-fit rounded-lg overflow-hidden">
        <button
          className="text-xl font-bold flex gap-2 cursor-pointer  py-3 px-5 active:bg-sky-500 active:text-white hover:bg-sky-200"
          onClick={handleDecrease}
        >
          -
        </button>
        <input
          className="text-center border-l border-l-sky-200  border-r border-r-sky-200 outline-none max-w-[100]"
          value={selected.count}
          type="text"
        />
        <button
          className="text-xl text-sky-500  font-bold flex gap-2 cursor-pointer py-3 px-5 active:bg-sky-500 active:text-white hover:bg-sky-200"
          onClick={handleIncrease}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
