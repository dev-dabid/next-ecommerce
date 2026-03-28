"use client";

import { Dispatch, SetStateAction } from "react";
import { Field, Label, Radio, RadioGroup } from "@headlessui/react";

type Color = {
  name: string;
  color: string;
};

interface Size {
  id: number;
  name: string;
}

type SelectProperty = {
  color: Color;
  size: Size;
};

type SizeSelectorProps = {
  selected: SelectProperty;
  setSelected: Dispatch<SetStateAction<SelectProperty>>;
  sizes: Size[];
};

const SizeSelector = ({ selected, setSelected, sizes }: SizeSelectorProps) => {
  return (
    <div>
      <p className="font-semibold mb-2 text-gray-500 text-sm">SIZE</p>
      <RadioGroup
        by="name"
        value={selected.size}
        onChange={(newSize) =>
          setSelected((prev) => ({ ...prev, size: newSize }))
        }
        aria-label="Server size"
        className="flex gap-2"
      >
        {sizes.map((size) => (
          <Field key={size.id}>
            <Radio
              className={({ checked, disabled }) =>
                `relative text-sm flex gap-2 cursor-pointer rounded-lg border py-3 px-5 transition focus:outline-none ${checked ? " text-white border-sky-400 bg-sky-400  ring-blue-100" : "border-sky-200 bg-white"} ${disabled ? "cursor-not-allowed border-sky-500 bg-slate-50 opacity-60 " : ""}`
              }
              value={size}
            >
              <Label className={`font-semibold`}>{size.name}</Label>
            </Radio>
          </Field>
        ))}
      </RadioGroup>
    </div>
  );
};

export default SizeSelector;
