type TitledInputProps = {
  title: string;
};

const TitledInput = ({ title }: TitledInputProps) => {
  return (
    <div>
      <p className="mb-1">{title}</p>
      <div className="p-2 border rounded border-gray-300 bg-white">
        <input className="w-full outline-none" type="text" />
      </div>
    </div>
  );
};

export default TitledInput;
