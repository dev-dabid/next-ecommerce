import prisma from "@/lib/prisma";
import ProductCatalog from "./ProductsCatalog";

export default async function CollectionsPage() {
  const getProducts = async () => {
    const result = (await prisma.product.findMany()).map((item) => {
      return {
        id: item.id,
        image: item.image,
        keywords: item.keywords,
        name: item.name,
        priceCents: item.priceCents,
        rating: {
          stars: item.ratingStars,
          count: item.ratingCount,
        },
      };
    });

    return result;
  };

  const products = await getProducts();

  if (!products) return;

  return <ProductCatalog products={products} />;
}
