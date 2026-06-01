"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

const NavigationLinks = () => {
  const pathname = usePathname();
  const navItems: NavItem[] = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Collections",
      href: "/collections",
    },
    // {
    //   label: "New Arrivals",
    //   href: "/newarrivals",
    // },
    // {
    //   label: "Sale",
    //   href: "/sale",
    // },
  ];

  return (
    <nav className="hidden lg:flex gap-5">
      {navItems.map((item) => {
        return (
          <Link
            className={`${pathname === item.href ? "after:scale-x-100 text-sky-500 -translate-y-1" : ""} relative cursor-pointer active:text-sky-700 hover:text-sky-500 text-md w-fit block after:block after:content-[''] after:absolute after:h-0.75 after:bg-sky-500 after:w-full after:scale-x-0  after:transition-transform after:duration-300 after:origin-left`}
            key={item.href}
            href={item.href}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavigationLinks;
