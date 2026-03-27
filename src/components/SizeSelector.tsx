import { Field, Label, Radio, RadioGroup } from "@headlessui/react";
import { useState, useEffect } from "react";

interface Size {
  id: number;
  name: string;
}

const sizes: Size[] = [
  { id: 1, name: "XS" },
  { id: 2, name: "S" },
  { id: 3, name: "M" },
  { id: 4, name: "L" },
  { id: 5, name: "XL" },
];

function comparePlans(a: Size, b: Size) {
  return a.name.toLowerCase() === b.name.toLowerCase();
}

const SizeSelector = () => {
  const [selected, setSelected] = useState(sizes[1]);

  return (
    <div>
      <p className="font-semibold mb-2 text-gray-500 text-sm">SIZE</p>
      <RadioGroup
        value={selected}
        by={comparePlans}
        onChange={setSelected}
        aria-label="Server size"
        className="flex gap-2"
      >
        {sizes.map((plan) => (
          <Field key={plan.id}>
            <Radio
              className={({ checked, disabled }) =>
                `relative text-sm flex gap-2 cursor-pointer rounded-lg border py-3 px-5 transition focus:outline-none ${checked ? " text-white border-sky-400 bg-sky-400  ring-blue-100" : "border-sky-200 bg-white"} ${disabled ? "cursor-not-allowed border-sky-500 bg-slate-50 opacity-60 " : ""}`
              }
              value={plan}
            >
              <Label className={`font-semibold`}>{plan.name}</Label>
            </Radio>
          </Field>
        ))}
      </RadioGroup>
    </div>
  );
};

export default SizeSelector;
