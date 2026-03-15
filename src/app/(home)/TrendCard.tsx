import Image from "next/image";
import Model from "@/images/backpack.jpg";

const TrendCard = () => {
  return (
    <div>
      <div className="overflow-hidden rounded-2xl">
        <div className="relative after:content-[''] after:absolute after:bottom-0 after:h-4 after:w-[90%] after:rounded-t-2xl after:bg-white flex justify-center">
          <div className="inset-0 bg-linear-to-b from-white/15 to-black/10 w-full h-full absolute"></div>
          <div className="p-5">
            <Image
              className="w-full h-full object-contain"
              src={Model}
              height={300}
              width={300}
              alt=""
            />
          </div>
        </div>
      </div>
      <div>
        <p className="font-semibold text-[clamp(0.95rem,2vw,1.125rem)] truncate">
          Wool Blend Overcoat
        </p>
        <p className="text-sky-500 font-bold text-[clamp(0.95rem,2vw,1.125rem)]">
          $249.00
        </p>
      </div>
    </div>
  );
};

export default TrendCard;
