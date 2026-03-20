"use client";

type FilterDropdownProps = {
  title: string;
  menuItem?: string[];
};

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

const FilterDropdown = ({ title, menuItem }: FilterDropdownProps) => {
  return (
    <Menu>
      {({ open }) => (
        <>
          <MenuButton className="data-active:bg-blue-300 data-hover:bg-sky-100 data-hover:text-sky-400 data-hover:border-sky-400 flex items-center gap-2 border border-gray-300 py-2 px-5 rounded-3xl font-semibold focus:outline-none text-sm">
            {title}
            <ChevronDown
              size={15}
              className={`transition-transform duration-70 ${open ? "rotate-180" : ""} pb-0.5`}
            />
          </MenuButton>
          <MenuItems
            className="bg-white w-30  p-2 rounded focus:outline-none"
            anchor="bottom"
          >
            {menuItem?.map((item, index) => (
              <MenuItem key={index}>
                <a className="block data-focus:bg-blue-100" href="/settings">
                  {item}
                </a>
              </MenuItem>
            ))}
          </MenuItems>
        </>
      )}
    </Menu>
  );
};

export default FilterDropdown;
