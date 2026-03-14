import Image, { StaticImageData } from "next/image";

type CardProps = {
  name: string;
  image?: string | StaticImageData;
};

const CategoryCard = ({ name, image }: CardProps) => {
  return (
    <div className="relative rounded-2xl bg-white p-5 max-h-75 shadow-lg">
      <div className="absolute inset-0 bg-linear-to-b hover:from-white/15 active:from-white/30 from-white/5 to-gray-950/50 rounded-2xl z-10"></div>

      <div className="relative w-full h-full rounded-2xl overflow-hidden">
        <Image
          className="h-full w-full object-contain"
          alt=""
          src={image ?? "/fallback.png"}
          width={200}
          height={200}
        />
      </div>

      <p className="absolute bottom-15 left-8 z-20 font-semibold text-white text-2xl">
        {name}
      </p>
    </div>
  );
};

export default CategoryCard;
