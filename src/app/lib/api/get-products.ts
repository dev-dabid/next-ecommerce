import productsData from "@/content/backend/products.json";
import { Product } from "@/types/types";

export async function getProducts(): Promise<Product[]> {
  return productsData as Product[];
}
