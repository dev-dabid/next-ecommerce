import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { CategoryCatalog } from "../_components/category-catalog";

export default async function Appliances() {
  const { userId } = await auth();
  const products = await prisma.product.findMany({});

  if (!userId) {
    return (
      <CategoryCatalog
        userId={userId}
        categoryType={"appliances"}
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

  const productAppliances = productsMap.filter((item) => {
    const appliances = item.keywords.find((k) => k === "appliances");

    return appliances;
  });

  return (
    <div>
      <CategoryCatalog
        userId={userId}
        categoryType={"appliances"}
        products={productAppliances}
      />
    </div>
  );
}
