"use client";

import { usePathname } from "next/navigation";

const Breadcrumb = () => {
  const pathname = usePathname();
  return (
    <div className="py-6">
      <div>{pathname.slice(1)}</div>
    </div>
  );
};

export default Breadcrumb;
