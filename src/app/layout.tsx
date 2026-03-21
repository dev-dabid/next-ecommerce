import "./globals.css";
import Header from "@/components/Header";
import { Inter } from "next/font/google";
import { getProducts } from "./lib/api/get-products";
import StoreInitializer from "@/components/providers/StoreInitializer";

const inter = Inter({
  subsets: ["latin"],
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const data = await getProducts();

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="p-2 bg-gray-50 h-full">
          <StoreInitializer data={data} />
          {children}
        </main>
      </body>
    </html>
  );
}
