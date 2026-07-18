import { auth } from "@clerk/nextjs/server";
import {
  findUniqueProduct,
  findRelatedProducts,
  findUserCartProducts,
} from "@/actions/cart";
import ProductView from "@/components/ProductView";
import RelatedProducts from "@/components/RelatedProducts";
import Footer from "@/components/Footer";
import prisma from "@/lib/prisma";

type ProductPageProps = {
  params: Promise<{
    productId: string;
  }>;
};

export default async function ProductPage({ params }: ProductPageProps) {
  const { userId } = await auth();
  const { productId } = await params;
  const product = await findUniqueProduct(productId);
  const userCartItems = await findUserCartProducts(userId || "");

  console.log(userCartItems);

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
        <ProductView
          userId={userId}
          product={product.data}
          cartItems={userCartItems.data}
        />
        <div className="pb-20">
          <RelatedProducts products={relatedData} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
