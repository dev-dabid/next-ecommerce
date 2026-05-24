import { Dispatch, SetStateAction } from "react";

type CategoryProps = {
  category: string;
  isChecked: Set<string>;
  setIsChecked: Dispatch<SetStateAction<Set<string>>>;
};

const Category = ({ category, isChecked, setIsChecked }: CategoryProps) => {
  return (
    <div className="flex items-center gap-3">
      <input
        type="checkbox"
        value={category}
        checked={isChecked.has(category)}
        onChange={() =>
          setIsChecked((prev) => {
            const next = new Set(prev);
            next.has(category) ? next.delete(category) : next.add(category);
            return next;
          })
        }
      />
      <p>{category}</p>
    </div>
  );
};

export default Category;
