"use client";

import { useState, useEffect } from "react";
import useProducts from "@/hooks/useProducts";
import { toggleFavorite, isInFavorite } from "@/actions/cart";
import { Heart } from "lucide-react";

type FavoriteToggleProps = {
  userId: string;
  productId: string;
};

const FavoriteToggle = ({ userId, productId }: FavoriteToggleProps) => {
  const { favorites, setFavorite } = useProducts();
  const [isFav, setIsFave] = useState<boolean | null>(null);

  useEffect(() => {
    const status = async () => {
      const isInFav = await isInFavorite(userId, productId);
      setIsFave(isInFav);
    };
    status();
  }, [userId, productId]);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();

    if (isFav === null) return;

    setIsFave(!isFav);

    try {
      toggleFavorite(userId, productId);
    } catch (error) {
      setIsFave(isFav);
    }
  };

  return userId ? (
    <>
      <button
        className="group px-4 border border-sky-200 rounded-xl cursor-pointer"
        onClick={handleToggle}
      >
        <Heart
          fill="currentColor"
          className={` ${isFav ? "text-sky-500 group-hover:text-sky-500" : "text-gray-300 group-hover:text-sky-200"}`}
        />
      </button>
    </>
  ) : (
    <>
      <button
        className="group px-4 border border-sky-200 rounded-xl cursor-pointer"
        onClick={() => setFavorite(productId)}
      >
        <Heart
          fill="currentColor"
          className={` ${favorites.has(productId) ? "text-sky-500 group-hover:text-sky-500" : "text-gray-300 group-hover:text-sky-200"}`}
        />
      </button>
    </>
  );
};

export default FavoriteToggle;
