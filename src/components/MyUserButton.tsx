"use client";

import { UserButton } from "@clerk/nextjs";

const MyUserButton = () => {
  return (
    <UserButton>
      <UserButton.MenuItems>
        {
          <UserButton.Link
            label="Track orders"
            href="fsdf"
            labelIcon={<span></span>}
          />
        }
      </UserButton.MenuItems>
    </UserButton>
  );
};

export default MyUserButton;
