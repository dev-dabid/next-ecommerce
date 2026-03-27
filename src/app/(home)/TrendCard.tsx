import { Product } from "@/types/types";
import { formattedPrice } from "../lib/utils/money";
import Image from "next/image";
import Model from "@/images/backpack.jpg";

type TrendCardProps = {
  product: Product;
};

const TrendCard = ({ product }: TrendCardProps) => {
  const { image, name, priceCents } = product;
  return (
    <div className="h-full">
      <div className="overflow-hidden rounded-2xl h-full">
        <div className="relative after:content-[''] after:absolute after:bottom-0 after:h-4 after:w-[90%] after:rounded-t-xl after:bg-white flex justify-center h-full">
          <div className="inset-0 bg-linear-to-b from-white/15 to-black/10 w-full h-full absolute"></div>
          <div className="p-5 h-full">
            <Image
              className="w-full h-full object-contain"
              src={`/${image}`}
              height={300}
              width={300}
              alt=""
            />
          </div>
        </div>
      </div>
      <div>
        <p className="font-semibold text-[clamp(0.95rem,2vw,1.125rem)] truncate">
          {name}
        </p>
        <p className="text-sky-500 font-bold text-[clamp(0.95rem,2vw,1.125rem)]">
          ${formattedPrice(priceCents)}
        </p>
      </div>
    </div>
  );
};

export default TrendCard;
