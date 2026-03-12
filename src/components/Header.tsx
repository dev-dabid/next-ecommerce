import Input from "@/components/Input";
import { ShoppingBag, Gem, CircleUserRound } from "lucide-react";

type NavItem = {
  label: string;
  href?: string;
  children?: NavItem[];
};

const Header = () => {
  const navItems: NavItem[] = [
    {
      label: "Home",
    },
    {
      label: "Collections",
    },
    {
      label: "New Arrivals",
    },
    {
      label: "Sale",
    },
  ];

  return (
    <header className=" bg-white p-5 border-b-2 border-b-cyan-50">
      <div className="flex justify-between max-w-7xl mx-auto ">
        <div className="flex gap-5 items-center">
          <div className="flex gap-2">
            <Gem className="text-cyan-500" size={32} />
            <p className="font-semibold text-xl">Lumina</p>
          </div>
          <nav className="hidden lg:flex gap-5">
            {navItems.map((item, index) => {
              return (
                <a
                  key={index}
                  href={item.href}
                  className="relative cursor-pointer active:text-cyan-700 hover:text-cyan-500 text-md w-fit block after:block after:content-[''] after:absolute after:h-[3px] after:bg-cyan-500 after:w-full after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:duration-300 after:origin-left"
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            <Input />
          </div>
          <div className="relative after:conte">
            <ShoppingBag />
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
