import { Dispatch, SetStateAction } from "react";

type Inputs = {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
};

type TitledInputProps = {
  title: string;
  name: string;
  value: string;
  setInput: (name: string, value: string) => void;
};

const TitledInput = ({ title, name, value, setInput }: TitledInputProps) => {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setInput(name, value);
  };

  return (
    <div className="w-full">
      <p className="mb-1">{title}</p>
      <div className="p-2 border rounded border-gray-300 bg-white w-full">
        <input
          name={name}
          value={value}
          className="w-full outline-none"
          type="text"
          onChange={handleInput}
        />
      </div>
    </div>
  );
};

export default TitledInput;
