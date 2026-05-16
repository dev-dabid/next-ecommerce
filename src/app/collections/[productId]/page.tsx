import { findUniqueProduct, findRelatedProducts } from "@/actions/cart";
import ProductView from "@/components/ProductView";
import RelatedProducts from "@/components/RelatedProducts";
import Footer from "@/components/Footer";

type ProductPageProps = {
  params: Promise<{
    productId: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params;
  const product = await findUniqueProduct(productId);

  if (!product.success || product.data === null) return;

  const relatedProducts = await findRelatedProducts(
    product.data.keywords,
    product.data.id,
  );

  const relatedData =
    relatedProducts.success && relatedProducts.data ? relatedProducts.data : [];

  return (
    <div>
      <div className="max-w-300 mx-auto">
        <ProductView product={product.data} />
        <RelatedProducts products={relatedData} />
      </div>
      <Footer />
    </div>
  );
}
