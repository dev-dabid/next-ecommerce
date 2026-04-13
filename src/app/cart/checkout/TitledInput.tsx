type TitledInputProps = {
  title: string;
};

const TitledInput = ({ title }: TitledInputProps) => {
  return (
    <div className="w-full">
      <p className="mb-1">{title}</p>
      <div className="p-2 border rounded border-gray-300 bg-white w-full">
        <input className="w-full outline-none" type="text" />
      </div>
    </div>
  );
};

export default TitledInput;
