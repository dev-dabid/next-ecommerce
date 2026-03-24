import Image from "next/image";
type ProductRatingProps = {
  ratingValue: number;
  ratingCount: number;
};

const ProductRating = ({ ratingValue, ratingCount }: ProductRatingProps) => {
  const imageSuffix = Math.round(ratingValue * 10);

  return (
    <div className="flex items-center gap-2">
      <div className="pb-1">
        <Image
          className="h-full w-30 object-contain"
          src={`/images/ratings/rating-${imageSuffix}.png`}
          alt=""
          width={200}
          height={200}
        />
      </div>
      <div>
        <p className="text-lg">{`(${ratingCount} reviews)`}</p>
      </div>
    </div>
  );
};

export default ProductRating;
