import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import { useState } from "react";

const colors = [
  { name: "white", color: "bg-white" },
  { name: "black", color: "bg-gray-950" },
  { name: "blue", color: "bg-blue-500" },
];

const ColorSelector = () => {
  let [selected, setSelected] = useState(colors[0]);

  return (
    <div>
      <p className="font-semibold mb-2 text-gray-500 text-sm">COLOR</p>
      <RadioGroup
        className="flex gap-3"
        value={selected}
        onChange={setSelected}
        aria-label="Server size"
      >
        {colors.map((color) => {
          return (
            <Field key={color.name}>
              <Radio
                className={` ${color.color} relative block  p-1 size-8 rounded-2xl data-checked:border data-checked:border-sky-500 data-disabled:border-none`}
                value={color.name}
              ></Radio>
            </Field>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default ColorSelector;
