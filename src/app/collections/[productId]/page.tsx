import ProductView from "@/components/ProductView";
import Footer from "@/components/Footer";

type ProductPageProps = {
  params: Promise<{
    productId: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params;

  return (
    <div>
      <div className="max-w-300 mx-auto">
        <ProductView id={productId} />
      </div>
      <Footer />
    </div>
  );
}
