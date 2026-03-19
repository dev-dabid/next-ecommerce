import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDown } from "lucide-react";

const FilterDropdown = () => {
  return (
    <Menu>
      <MenuButton className="data-active:bg-blue-300 data-hover:bg-amber-500 flex items-center gap-2 border border-sky-400 py-2 px-5 rounded-3xl font-semibold focus:outline-none">
        Category <ChevronDown className="pb-0.5" size={20} />
      </MenuButton>
      <MenuItems className="bg-white w-30 mt-1 p-2 rounded" anchor="bottom">
        <MenuItem>
          <a className="block data-focus:bg-blue-100" href="/settings">
            Settings
          </a>
        </MenuItem>
        <MenuItem>
          <a className="block data-focus:bg-blue-100" href="/support">
            Support
          </a>
        </MenuItem>
        <MenuItem>
          <a className="block data-focus:bg-blue-100" href="/license">
            License
          </a>
        </MenuItem>
      </MenuItems>
    </Menu>
  );
};

export default FilterDropdown;
