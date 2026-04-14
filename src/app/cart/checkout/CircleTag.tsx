type CircleProps = {
  count: number;
  title: string;
};

const CircleTag = ({ count, title }: CircleProps) => {
  return (
    <div className="flex items-center gap-4">
      <p className="rounded-full w-10 h-10 bg-sky-400 text-white flex justify-center items-center">
        {count}
      </p>
      <h2 className="text-xl font-semibold">{title}</h2>
    </div>
  );
};

export default CircleTag;
