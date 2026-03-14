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
    <div className="mt-30 h-full">
      <div className="flex flex-col">
        <div>
          <p
            className="
           text-4xl font-bold relative 
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
        </div>
        <div className="grid grid-cols-4 mt-10  gap-5">
          {homepageCategories.map((category, index) => {
            return (
              <CategoryCard
                key={index}
                name={category}
                image={getCategoryImage(category)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CategorySection;
