import Image from "next/image";
import Woman from "@/images/products/woman.png";

const Hero = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-around bg-white py-[clamp(2rem,10vw,5rem)] px-[clamp(1.5rem,1vw,2.5rem)] rounded-3xl mt-[clamp(1rem,5vw,5rem)] gap-[clamp(4rem,2vw,5rem)]">
      <div className="flex flex-col">
        <p className="text-[clamp(0.7rem,1vw,1rem)] text-sky-400 font-semibold tracking-widest">
          NEW SEASON ARRIVAL
        </p>
        <p className="text-[clamp(2.5rem,13vw,4.5rem)] leading-none text-gray-950 font-semibold max-w-[12ch] mt-5">
          Elevate Your <span className="text-sky-400">Everyday</span> Style
        </p>
        <p className="text-[clamp(0.8rem,3.8vw,1.3rem)] max-w-[42ch] mt-5">
          Experience premium craftsmanship with our sustainably sourced
          materials and timeless minimalist designs.
        </p>

        <div className="flex gap-4 mt-7">
          <button className="text-[clamp(0.60rem,3vw,1.125rem)] active:bg-sky-600  hover:bg-sky-300 bg-sky-400 font-[550] py-3 px-3 lg:px-6 rounded-xl w-full">
            Shop Collection
          </button>
          <button className="text-[clamp(0.55rem,3vw,1.125rem)] active:bg-gray-400 hover:bg-gray-200 bg white font-[550] py-3 px-3 lg:px-6 rounded-xl border-2 border-gray-300 w-full">
            Explore Lookbook
          </button>
        </div>
      </div>
      <div className="hidden lg:block h-150 w-120 rounded-2xl overflow-hidden">
        <Image
          className="transition-transform duration-300 ease-in-out hover:scale-105 object-cover w-full h-full"
          src={Woman}
          alt="Hero"
        />
      </div>
    </div>
  );
};

export default Hero;
