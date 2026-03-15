import TrendCard from "./TrendCard";

const TrendSection = () => {
  return (
    <div className="bg-white py-20">
      <div className="max-w-300 mx-auto">
        <div className="text-center mb-15">
          <h1 className="text-[clamp(1.1rem,5vw,2rem)] font-bold">
            Trending Now
          </h1>
          <p className="text-[clamp(0.71rem,3vw,1.125rem)] max-w-[50ch] inline-block text-gray-400">
            The pieces everyone is talking about this week. Handpicked
            essentials for the modern lifestyle.
          </p>
        </div>

        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6">
          <TrendCard />
          <TrendCard />
          <TrendCard />
          <TrendCard />
        </div>
      </div>
    </div>
  );
};

export default TrendSection;
