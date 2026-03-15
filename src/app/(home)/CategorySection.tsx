import CategoryCard from "./CategoryCard";
import { Product } from "@/types/types";
import DefaultImage from "@/images/backpack.jpg";

type CategorySectionProps = {
  products: Product[];
};

const CategorySection = ({ products }: CategorySectionProps) => {
  const homepageCategories = [
    "apparel",
    "accessories",
    "footwear",
    "appliances",
  ];

  const getCategoryImage = (category: string) => {
    const product = products.find((product) =>
      product.keywords.some((keyword) => keyword === category),
    );

    const image = product?.image ? `/${product.image}` : DefaultImage;

    return image;
  };

  return (
    <div className="mt-30 h-full pb-20">
      <div className="flex flex-col">
        <div className="flex justify-between items-center">
          <p
            className="
           text-[clamp(1.1rem,5vw,2rem)] font-bold relative 
           after:content-[''] 
           after:absolute 
           after:-bottom-2 
           after:left-0 
           after:w-[32%] 
           after:h-1.25 
           after:bg-sky-400 
           after:origin-left 
           after:scale-x-100 
           after:rounded-2xl
           inline-block"
          >
            Shop by Category
          </p>
          <a
            className="text-[clamp(0.875rem,2vw,1.2rem)] flex items-center gap-1 text-sky-400"
            href=""
          >
            View All
          </a>
        </div>
        <div className="flex gap-2 overflow-x-auto snap-x snap-mandatory lg:grid lg:grid-cols-4 lg:gap-5 lg:overflow-visible mt-10">
          {homepageCategories.map((category, index) => (
            <CategoryCard
              key={index}
              name={category}
              image={getCategoryImage(category)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
