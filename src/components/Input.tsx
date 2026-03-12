import { Search } from "lucide-react";

const Input = () => {
  return (
    <div className="flex gap-3 p-2 bg-sky-100 rounded-lg">
      <Search className="text-gray-400" />
      <input
        className="focus:ring-0 outline-none text-gray-400"
        type="text"
        placeholder="Search products..."
      />
    </div>
  );
};

export default Input;
