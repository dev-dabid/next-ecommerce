"use client";

import { useState } from "react";

const OrdersPage = () => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filters = [
    {
      title: "All Orders",
      filter: "all",
    },
    {
      title: "In Progress",
      filter: "pending",
    },
    {
      title: "Delivered",
      filter: "delivered",
    },
    {
      title: "Returns",
      filter: "returned",
    },
  ];

  return (
    <div className="">
      <div className="max-w-300 mx-auto mb-30">
        <div className="mb-10">
          <div>
            <h1 className="text-[clamp(1.9rem,5vw,3rem)] font-bold mb-2">
              Order History
            </h1>
            <p className="text-[clamp(1rem,2vw,1.125rem)] max-w-[30ch] md:max-w-[53ch]">
              Track current shipments and revisit your past acquisitions.
            </p>
          </div>
          <div className="flex justify-between items-center mt-10">
            <div className="flex gap-5">
              {filters.map((item) => {
                return (
                  <button
                    className={`${item.filter === selectedFilter ? "bg-[#ddf2f8] border-[#b3e6f6] text-sky-500" : "bg-white border-transparent"} py-2 px-6 rounded-full border`}
                    onClick={() => setSelectedFilter(item.filter)}
                  >
                    {item.title}
                  </button>
                );
              })}
            </div>
            <p>Showing 4 recent orders</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
