import Input from "@/components/Input";
import { ShoppingBag, Gem, CircleUserRound } from "lucide-react";
import { SignOutButton, SignInButton, UserButton } from "@clerk/nextjs";
import NavigationLinks from "./NavigationLinks";
import CartBadge from "./CartBadge";
import { cartItemCount } from "@/actions/cart";
import useCart from "@/hooks/useCart";
import Link from "next/link";
import { auth } from "@clerk/nextjs/server";

const Header = async () => {
  const { userId } = await auth();

  const cartCount = await cartItemCount(userId || "");

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
            <CartBadge userId={userId} initialCount={cartCount} />
          </Link>

          {userId ? null : (
            <div>
              <SignOutButton>
                <SignInButton mode="modal">
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
                    Sign In
                  </button>
                </SignInButton>
              </SignOutButton>
            </div>
          )}

          <div className="flex items-center">
            <UserButton />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
