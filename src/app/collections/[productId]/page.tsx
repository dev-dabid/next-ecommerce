import { findUniqueProduct } from "@/actions/cart";
import ProductView from "@/components/ProductView";
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

  const { id, image, name, ratingStars, ratingCount, priceCents, keywords } =
    product.data;

  const productMap = {
    id: id,
    image: image,
    name: name,
    rating: {
      stars: ratingStars,
      count: ratingCount,
    },
    priceCents: priceCents,
    keywords: keywords,
  };

  return (
    <div>
      <div className="max-w-300 mx-auto">
        <ProductView product={productMap} />
      </div>
      <Footer />
    </div>
  );
}
