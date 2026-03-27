import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import { useState } from "react";

const colors = [
  { name: "white", color: "bg-gray-200" },
  { name: "black", color: "bg-gray-950" },
  { name: "blue", color: "bg-blue-500" },
];

const ColorSelector = () => {
  let [selected, setSelected] = useState(colors[0]);

  return (
    <div>
      <p className="font-semibold mb-4 text-gray-500 text-sm">COLOR</p>
      <RadioGroup
        className="flex gap-4"
        value={selected}
        onChange={setSelected}
        aria-label="Server size"
      >
        {colors.map((color) => {
          return (
            <Field key={color.name}>
              <Radio
                className={`relative ${color.color} data-checked:after:border-sky-500 after:rounded-3xl flex justify-center items-center after:block data-checked:after:border-2 after:size-10 after:absolute after:content-[''] size-8 rounded-2xl  data-disabled:border-none`}
                value={color.name}
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
