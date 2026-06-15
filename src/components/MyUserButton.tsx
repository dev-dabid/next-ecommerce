"use client";

import { UserButton } from "@clerk/nextjs";
import { Package } from "lucide-react";

const MyUserButton = () => {
  const links = [
    {
      label: "Track orders",
      href: "trackorders",
    },
    {
      label: "Track orders",
      href: "trackorders",
    },
  ];

  return (
    <UserButton>
      <UserButton.MenuItems>
        {links.map((item) => {
          return (
            <UserButton.Link
              label={item.label}
              href={item.href}
              labelIcon={<Package className="text-gray-500" size={15} />}
            />
          );
        })}
      </UserButton.MenuItems>
    </UserButton>
  );
};

export default MyUserButton;
