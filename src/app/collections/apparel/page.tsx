import prisma from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { CategoryCatalog } from "../_components/category-catalog";

export default async function Apparel() {
  const { userId } = await auth();
  const products = await prisma.product.findMany({});

  if (!userId) {
    return (
      <CategoryCatalog userId={userId} categoryType={"apparel"} products={[]} />
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

  const productApparel = productsMap.filter((item) => {
    const apparel = item.keywords.find((k) => k === "apparel");
    const mens = item.keywords.find((k) => k === "mens");
    const womens = item.keywords.find((k) => k === "womens");

    return apparel || mens || womens;
  });

  return (
    <div>
      <CategoryCatalog
        userId={userId}
        categoryType={"apparel"}
        products={productApparel}
      />
    </div>
  );
}
