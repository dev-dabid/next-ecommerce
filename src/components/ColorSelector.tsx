"use client";

import type { Color, SelectProperty } from "@/types/types";
import { Dispatch, SetStateAction } from "react";
import { Field, Label, Radio, RadioGroup } from "@headlessui/react";

type ColorSelectorProps = {
  selected: SelectProperty;
  setSelected: Dispatch<SetStateAction<SelectProperty>>;
  colors: Color[];
};

const ColorSelector = ({
  selected,
  setSelected,
  colors,
}: ColorSelectorProps) => {
  return (
    <div>
      <p className="font-semibold mb-4 text-gray-500 text-sm">COLOR</p>
      <RadioGroup
        by="name"
        className="flex gap-4"
        value={selected.color}
        onChange={(newColor) => setSelected({ ...selected, color: newColor })}
        aria-label="Server size"
      >
        {colors.map((color) => {
          return (
            <Field key={color.name}>
              <Radio
                className={`relative ${color.color} data-checked:after:border-sky-500 after:rounded-3xl flex justify-center items-center after:block data-checked:after:border-2 after:size-10 after:absolute after:content-[''] size-8 rounded-2xl  data-disabled:border-none`}
                value={color}
              >
                <span className="block size-8 rounded-2xl"></span>
              </Radio>
            </Field>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default ColorSelector;
