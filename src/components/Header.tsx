import Input from "@/components/Input";
import { ShoppingBag, Gem, CircleUserRound, User, Heart } from "lucide-react";
import { SignOutButton, SignInButton, UserButton } from "@clerk/nextjs";
import NavigationLinks from "./NavigationLinks";
import CartBadge from "./CartBadge";
import { cartItemCount } from "@/actions/cart";
import useCart from "@/hooks/useCart";
import MyUserButton from "./MyUserButton";
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
          <div className="flex gap-5 items-center">
            <NavigationLinks />
            {cartCount === 0 ? (
              <Link href={`/collections`}>
                <div className="bg-sky-400 text-white px-4 py-2 rounded-md text-sm mr-4 font-semibold hover:-translate-y-1 hover:bg-sky-500 active:bg-sky-600 transition-all">
                  Shop Now
                </div>
              </Link>
            ) : null}
          </div>
        </div>
        <div className="flex items-center gap-4">
          {/* <div className="hidden lg:block">
            <Input />
          </div> */}

          <Link href={"/wishlist"}>
            <Heart />
          </Link>

          <Link href={"/cart"}>
            <CartBadge userId={userId} initialCount={cartCount} />
          </Link>

          {userId ? (
            <div className="flex items-center">
              <MyUserButton />
            </div>
          ) : (
            <button className="block cursor-pointer">
              <SignOutButton>
                <SignInButton mode="modal">
                  <div className="flex gap-2">
                    <User />
                    <p className="font-semibold hidden md:flex">
                      LogIn / Register
                    </p>
                  </div>
                </SignInButton>
              </SignOutButton>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
