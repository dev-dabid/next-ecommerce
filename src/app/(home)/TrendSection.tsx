import { Product } from "@/types/types";
import TrendCard from "./TrendCard";

type TrendSectionProps = {
  products: Product[];
};

const TrendSection = ({ products }: TrendSectionProps) => {
  const trendProducts = products
    .filter((product) => product.rating.count > 100)
    .slice(0, 4);

  return (
    <div className="bg-white py-[clamp(1rem,5vw,5rem)]">
      <div className="max-w-300 mx-auto">
        <div className="text-center mb-5">
          <h1 className="text-[clamp(1.1rem,5vw,2rem)] font-bold">
            Trending Now
          </h1>
          <p className="text-[clamp(0.71rem,3vw,1.125rem)] max-w-[50ch] inline-block text-gray-400">
            The pieces everyone is talking about this week. Handpicked
            essentials for the modern lifestyle.
          </p>
        </div>

        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 lg:gap-6 mb-20">
          {trendProducts.map((product, index) => (
            <TrendCard key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendSection;
