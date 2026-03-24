import ProductView from "@/components/ProductView";

type ProductPageProps = {
  params: Promise<{
    productId: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params;

  return (
    <div className="max-w-300 mx-auto">
      <ProductView id={productId} />
    </div>
  );
}
