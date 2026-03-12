import "./globals.css";
import Header from "@/components/Header";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900">
        <Header />
        <main className="p-8">{children}</main>
        <footer className="bg-white shadow p-4 mt-8">Footer</footer>
      </body>
    </html>
  );
}
