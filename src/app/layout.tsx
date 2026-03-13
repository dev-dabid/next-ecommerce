import "./globals.css";
import Header from "@/components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="">
        <Header />
        <main className="p-2 bg-gray-50 h-screen">{children}</main>
      </body>
    </html>
  );
}
