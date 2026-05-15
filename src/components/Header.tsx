import Input from "@/components/Input";
import { ShoppingBag, Gem, CircleUserRound } from "lucide-react";
import NavigationLinks from "./NavigationLinks";
import CartBadge from "./CartBadge";
import { cartItemCount } from "@/actions/cart";
import Link from "next/link";

const Header = async () => {
  const cartCount = await cartItemCount("user-1234");

  return (
    <header className=" bg-gray-50 p-5 border-b border-b-sky-100 sticky top-0 z-50">
      <div className="flex justify-between max-w-300 mx-auto ">
        <div className="flex gap-5 items-center">
          <div className="flex gap-2">
            <Gem className="text-sky-500" size={32} />
            <p className="font-semibold text-xl">Lumina</p>
          </div>
          <NavigationLinks />
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <Input />
          </div>

          <Link href={"/cart"}>
            <CartBadge initialCount={cartCount} />
          </Link>

          <div className="hidden lg:block">
            <CircleUserRound />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
