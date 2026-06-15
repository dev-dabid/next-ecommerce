"use client";

import { UserButton } from "@clerk/nextjs";
import { Package } from "lucide-react";

const MyUserButton = () => {
  const links = [
    {
      label: "Track orders",
      href: "orders",
    },
  ];

  return (
    <UserButton
      appearance={{
        elements: {
          userButtonPopoverActionButton:
            "hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-primary transition-colors",

          userButtonPopoverActionButtonIcon:
            "text-neutral-500 group-hover:text-primary transition-colors",
        },
      }}
    >
      <UserButton.MenuItems>
        {links.map((item, index) => {
          return (
            <UserButton.Link
              key={index}
              label={item.label}
              href={item.href}
              labelIcon={<Package size={15} />}
            />
          );
        })}
      </UserButton.MenuItems>
    </UserButton>
  );
};

export default MyUserButton;
