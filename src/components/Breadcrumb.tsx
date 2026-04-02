"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import useProducts from "@/hooks/useProducts";
import { ChevronRight } from "lucide-react";

const Breadcrumb = () => {
  const { products } = useProducts();
  const pathname = usePathname();

  const productMap = new Map();

  products.forEach((product) => {
    const id = product.id;
    productMap.set(id, product);
  });

  const paths = pathname.split("/").map((path) => {
    return path === ""
      ? { name: "Home", href: "/" }
      : productMap.has(path)
        ? { name: productMap.get(path).name, href: productMap.get(path).id }
        : { name: path[0].toUpperCase() + path.slice(1), href: path };
  });

  console.log(paths.length);

  return (
    <div className="py-6">
      <div className="flex gap-4">
        {paths.map((path, index) => {
          return (
            <div className="flex gap-4 items-center" key={index}>
              <Link
                className={`${pathname.split("/").includes(path.href) ? "text-sky-500" : ""}`}
                href={path.href}
              >
                {path.name}
              </Link>
              {index + 1 >= paths.length ? (
                ""
              ) : (
                <span>
                  <ChevronRight size={20} />
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Breadcrumb;
