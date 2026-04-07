import type { CartProduct, UpdateType } from "@/types/types";
import Image from "next/image";
import { formattedPrice } from "../lib/utils/money";
import { generateCartKey } from "../lib/utils/cart";
import { Minus } from "lucide-react";
import { Plus } from "lucide-react";
import { SyntheticEvent, useState } from "react";

type CartCardProps = {
  product: CartProduct;
  updateQuantity: (itemKey: string, value: number, type: UpdateType) => void;
  inputQuantity: (itemKey: string, value: number) => void;
  selectItem: (itemKey: string, value: boolean) => void;
  removeItem: (itemKey: string) => void;
};

const CartCard = ({
  product,
  updateQuantity,
  inputQuantity,
  selectItem,
  removeItem,
}: CartCardProps) => {
  const { id, image, name, quantity, priceCents, color, size, isChecked } =
    product;

  const keyItem = generateCartKey(id, color, size);
  const totalPrice = priceCents * quantity;

  const displayTotalPrice = `$${formattedPrice(totalPrice)}`;

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    inputQuantity(keyItem, value);
  };

  const handleToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.checked;
    selectItem(keyItem, value);
  };

  console.log(isChecked);

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

      <div className="flex flex-col justify-between flex-1 min-w-0 h-full">
        <div className="flex flex-col">
          <h1 className="text-sm font-semibold text-gray-800 truncate leading-tight">
            {name}
          </h1>
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
            ) : null}
          </div>
        </div>

        <div className="flex items-end">
          <div className="flex items-center mt-3 border w-fit rounded-lg border-sky-200">
            <button
              className="py-3 px-2 font-bold"
              onClick={() => updateQuantity(keyItem, 1, "reduce")}
            >
              <Minus size={15} />
            </button>
            <input
              className="text-center w-full max-w-20"
              type="text"
              value={quantity}
              onChange={(e) => handleInput(e)}
            />
            <button
              className="py-3 px-2 text-sky-500 font-bold"
              onClick={() => updateQuantity(keyItem, 1, "add")}
            >
              <Plus size={15} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between">
        <div className="shrink-0 text-right ml-2">
          <p className="text-sm font-bold text-sky-600">{displayTotalPrice}</p>
          <button
            className="text-[10px] text-gray-300 hover:text-red-500 transition-colors mt-1"
            onClick={() => removeItem(keyItem)}
          >
            Remove
          </button>
        </div>
        <div className="flex justify-end">
          <input type="checkbox" checked={isChecked} onChange={handleToggle} />
        </div>
      </div>
    </div>
  );
};

export default CartCard;
