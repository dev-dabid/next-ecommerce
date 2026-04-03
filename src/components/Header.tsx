"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Input from "@/components/Input";
import { ShoppingBag, Gem, CircleUserRound } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  children?: NavItem[];
};

const Header = () => {
  const navItems: NavItem[] = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Collections",
      href: "/collections",
    },
    {
      label: "New Arrivals",
      href: "/newarrivals",
    },
    {
      label: "Sale",
      href: "/sale",
    },
  ];

  const pathname = usePathname();

  return (
    <header className=" bg-gray-50 p-5 border-b border-b-sky-100 sticky top-0 z-50">
      <div className="flex justify-between max-w-300 mx-auto ">
        <div className="flex gap-5 items-center">
          <div className="flex gap-2">
            <Gem className="text-sky-500" size={32} />
            <p className="font-semibold text-xl">Lumina</p>
          </div>
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
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <Input />
          </div>
          <div className="relative after:conte">
            <Link href={"/cart"}>
              <ShoppingBag />
            </Link>
          </div>
          <div className="hidden lg:block">
            <CircleUserRound />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
