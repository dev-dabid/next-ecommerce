import { Product } from "@/types/types";

type CategoryCatalogProps = {
  userId: string | null;
  categoryType: String;
  products: Product[];
};

export function CategoryCatalog({
  categoryType,
  products,
}: CategoryCatalogProps) {
  console.log(products);
  return <div></div>;
}
