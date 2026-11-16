import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { CategoryCatalog } from "../_components/category-catalog";

export default async function Footwear() {
  const { userId } = await auth();
  const products = await prisma.product.findMany({});

  if (!userId) {
    return (
      <CategoryCatalog
        userId={userId}
        categoryType={"footwear"}
        products={[]}
      />
    );
  }

  const productsMap = products.map((item) => {
    return {
      id: item.id,
      image: item.image,
      name: item.name,
      rating: {
        stars: item.ratingStars,
        count: item.ratingCount,
      },
      priceCents: item.priceCents,
      keywords: item.keywords,
    };
  });

  const productAccessories = productsMap.filter((item) => {
    const accessories = item.keywords.find((k) => k === "footwear");

    return accessories;
  });

  return (
    <div>
      <CategoryCatalog
        userId={userId}
        categoryType={"footwear"}
        products={productAccessories}
      />
    </div>
  );
}
