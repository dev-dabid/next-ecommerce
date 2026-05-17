import Image from "next/image";

type ProductRatingProps = {
  ratingValue: number;
  ratingCount: number;
};

const ProductRating = ({ ratingValue, ratingCount }: ProductRatingProps) => {
  const calculatedSuffix = Math.round(ratingValue * 10);
  const imageSuffix = Math.max(0, Math.min(50, calculatedSuffix));

  return (
    <div className="flex items-center gap-2">
      <div className="relative h-5 w-[clamp(5rem,25vw,8rem)]">
        <Image
          className="object-contain object-left"
          src={`/images/ratings/rating-${imageSuffix}.png`}
          alt={`Rating: ${ratingValue} out of 5`}
          fill
          sizes="(max-width: 768px) 25vw, 128px"
        />
      </div>
      <div>
        <p className="text-[clamp(0.9rem,3vw,1rem)] leading-none">
          ({ratingCount} {ratingCount === 1 ? "review" : "reviews"})
        </p>
      </div>
    </div>
  );
};

export default ProductRating;
