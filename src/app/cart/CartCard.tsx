import type { CartProduct } from "@/types/types";
import Image from "next/image";
import { formattedPrice } from "../lib/utils/money";

type CartCardProps = {
  product: CartProduct;
  updateQuantity: (itemKey: string, value: number) => void;
};

const CartCard = ({ product, updateQuantity }: CartCardProps) => {
  const { id, image, name, quantity, priceCents } = product;

  const totalPrice = priceCents * quantity;

  return (
    <div className="flex gap-3 p-3 bg-white rounded-xl border border-sky-50 shadow-sm w-full overflow-hidden group hover:border-sky-200 transition-colors">
      <div className="relative aspect-square w-20 shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
        <div className="absolute inset-0 bg-linear-to-b from-gray-200/10 to-black/5 z-10 pointer-events-none" />
        <Image
          className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
          src={`/${image}`}
          alt={name}
          fill
          sizes="80px"
        />
      </div>

      <div className="flex flex-col flex-1 min-w-0 h-full">
        <h1 className="text-sm font-semibold text-gray-800 truncate leading-tight">
          {name}
        </h1>
        <p className="text-[10px] uppercase tracking-wider text-gray-400 mt-0.5">
          Quantity: {product.quantity}
        </p>
        <div className="flex gap-2">
          {product.color && product.size ? (
            <>
              <p className="text-[10px] uppercase tracking-wider text-gray-400 mt-0.5">
                color: {product.color}
              </p>
              <p className="text-[10px] uppercase tracking-wider text-gray-400 mt-0.5">
                size: {product.size}
              </p>
            </>
          ) : (
            ""
          )}
        </div>
        <div className="flex items-end mt-3">
          <button onClick={() => updateQuantity(id, 1)}>+</button>
          <button>-</button>
        </div>
      </div>

      <div className="shrink-0 text-right ml-2">
        <p className="text-sm font-bold text-sky-600">
          ${formattedPrice(totalPrice)}
        </p>
        <button className="text-[10px] text-gray-300 hover:text-red-500 transition-colors mt-1">
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartCard;
