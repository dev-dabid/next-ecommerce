import { Gem } from "lucide-react";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <div className="border-t border-t-sky-100 px-2">
      <div className="flex flex-col md:flex-row justify-between max-w-300 mx-auto py-15 gap-6">
        <div className="">
          <div className="flex gap-2">
            <Gem className="text-sky-500" size={32} />
            <p className="font-semibold text-xl">Lumina</p>
          </div>
          <p className="max-w-[40ch] mt-4 text-gray-500">
            Redefining performance apparel through sustainable innovation and
            minimalist design. Join our journey towards a better future.
          </p>
        </div>
        <div className="flex w-full md:w-80 lg:w-130">
          <div className="flex flex-col flex-1">
            <h2 className="mb-4 text-gray-400 font-semibold">Shop</h2>
            <a
              className="text-gray-700 hover:text-sky-400 active:text-sky-600"
              href=""
            >
              New Arrivals
            </a>
            <a
              className="text-gray-700 hover:text-sky-400 active:text-sky-600"
              href=""
            >
              Bestsellers
            </a>
            <a
              className="text-gray-700 hover:text-sky-400 active:text-sky-600"
              href=""
            >
              Sustainability
            </a>
            <a
              className="text-gray-700 hover:text-sky-400 active:text-sky-600"
              href=""
            >
              Sale
            </a>
          </div>
          <div className="flex flex-col flex-1">
            <h2 className="mb-4 text-gray-400 font-semibold">Support</h2>
            <a
              className="text-gray-700 hover:text-sky-400 active:text-sky-600"
              href=""
            >
              Shipping
            </a>
            <a
              className="text-gray-700 hover:text-sky-400 active:text-sky-600"
              href=""
            >
              Returns
            </a>
            <a
              className="text-gray-700 hover:text-sky-400 active:text-sky-600"
              href=""
            >
              Care Guide
            </a>
            <a
              className="text-gray-700 hover:text-sky-400 active:text-sky-600"
              href=""
            >
              Contact
            </a>
          </div>
        </div>
      </div>
      <div className=" border-t border-t-sky-100">
        <div className="flex justify-center md:justify-between items-center flex-col md:flex-row max-w-300 mx-auto pt-10 pb-15 gap-4">
          <p className="text-sm text-gray-400">
            ©{year} Lumina Apparel. All rights reserved.
          </p>
          <div className="flex gap-5 text-sm text-gray-400 ">
            <a className="hover:text-sky-400 active:text-sky-600" href="">
              Privacy Policy
            </a>
            <a className="hover:text-sky-400 active:text-sky-600" href="">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
