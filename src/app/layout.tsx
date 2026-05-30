import "./globals.css";
import prisma from "@/lib/prisma";
import Header from "@/components/Header";
import { Inter } from "next/font/google";
import { getProducts } from "../lib/api/get-products";
import StoreInitializer from "@/components/providers/StoreInitializer";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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

  const data = await getProducts();

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          <main className="p-2 bg-gray-50 h-full">
            <StoreInitializer data={data} />
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  );
}
