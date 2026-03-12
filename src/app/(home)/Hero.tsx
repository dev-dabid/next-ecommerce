import Image from "next/image";
import Woman from "@/images/products/woman.png";

const Hero = () => {
  return (
    <div className="flex items-center justify-around bg-white py-20 px-10 rounded-3xl">
      <div className="flex flex-col">
        <p className="text-sky-400 font-semibold tracking-widest">
          NEW SEASON ARRIVAL
        </p>
        <p className="text-gray-950 font-semibold text-8xl max-w-[12ch] mt-5">
          Elevate Your <span className="text-sky-400">Everyday</span> Style
        </p>
        <p className="max-w-[42ch] mt-5 text-xl">
          Experience premium craftsmanship with our sustainably sourced
          materials and timeless minimalist designs.
        </p>
      </div>
      <div className="h-150 w-120 rounded-2xl overflow-hidden">
        <Image
          className="transition-transform duration-300 ease-in-out hover:scale-105 object-cover w-full h-full"
          src={Woman}
          alt="Hero"
          height={500}
          width={500}
        />
      </div>
    </div>
  );
};

export default Hero;
