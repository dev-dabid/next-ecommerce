"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import useProducts from "@/hooks/useProducts";
import { ChevronRight } from "lucide-react";
import { useMemo } from "react";

const Breadcrumb = () => {
  const { products } = useProducts();
  const pathname = usePathname();
  const productMap = useMemo(() => {
    const map = new Map();
    products.forEach((p) => map.set(p.id, p.name));
    return map;
  }, [products]);

  const segments = pathname.split("/").filter((item) => item !== "");

  return (
    <nav aria-label="Breadcrumb" className="py-6">
      <ol className="flex items-center gap-2 text-sm font-medium text-zinc-500">
        <li className="flex items-center gap-2">
          <Link href="/" className="hover:text-sky-500 transition-colors">
            Home
          </Link>
          {segments.length > 0 && <ChevronRight size={16} aria-hidden="true" />}
        </li>

        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`;
          const isLast = index === segments.length - 1;

          const displayName =
            productMap.get(segment) ||
            segment.charAt(0).toUpperCase() + segment.slice(1);

          return (
            <li key={href} className="flex items-center gap-2">
              {isLast ? (
                <span
                  className="text-zinc-900 font-semibold"
                  aria-current="page"
                >
                  {displayName}
                </span>
              ) : (
                <>
                  <Link
                    href={href}
                    className="hover:text-sky-500 transition-colors"
                  >
                    {displayName}
                  </Link>
                  <ChevronRight size={16} aria-hidden="true" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
