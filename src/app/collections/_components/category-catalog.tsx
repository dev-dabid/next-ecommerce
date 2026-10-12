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
  return (
    <div>
      {products.map((item) => {
        return <div>{item.name}</div>;
      })}
    </div>
  );
}
