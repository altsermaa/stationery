
import { CircleMinus, CirclePlus, CircleX } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CartItemType } from "./CartProvider";

export type ProductTypeProps = {
  _id: string;
  productName: string;
  description: string;
  price: number;
  image: string;
  addcount: number;
  onRemove: () => void;
  setCart: Dispatch<SetStateAction<CartItemType[]>>;
};

export const OrderedItem = ({
  productName,
  description,
  price,
  image,
  addcount,
  _id,
  onRemove,
}: ProductTypeProps) => {
  const [qty, setQty] = useState<number>(addcount);
const storageKey = "productCart";

  const minusQty = () => {
    if (qty > 1) {
      setQty((prev) => prev - 1);
      const existingData = localStorage.getItem(storageKey);
      const cartItems: CartItemType[] = existingData
        ? JSON.parse(existingData)
        : [];
      const newProducts = cartItems.map((product) => {
        if (product._id === _id) {
          return { ...product, addcount: product.addcount - 1 };
        } else {
          return product;
      }
    });
    localStorage.setItem(storageKey, JSON.stringify(newProducts));
    }
  };

  const plusQty = () => {
    setQty((prev) => prev + 1);
    const existingData = localStorage.getItem(storageKey);
    const cartItems: CartItemType[] = existingData
      ? JSON.parse(existingData)
      : [];
    const newProducts = cartItems.map((product) => {
      if (product._id === _id) {
        return { ...product, addcount: product.addcount + 1 };
      } else {
        return product;
      }
    });
    localStorage.setItem(storageKey, JSON.stringify(newProducts));
  };

  const deleteProduct = () => {
    const storageKey = "productCart";

    const existingData = localStorage.getItem(storageKey);
    const cartItems: CartItemType[] = existingData
      ? JSON.parse(existingData)
      : [];

    const newProducts = cartItems.filter((product) => product._id !== _id);
    localStorage.setItem(storageKey, JSON.stringify(newProducts));

    onRemove();
  };



  return (
    <div className="w-full">
      <div className="flex w-full max-w-lg sm:max-w-xl md:max-w-2xl h-auto gap-3 p-2 rounded-lg bg-white/5">
        <div className="w-24 h-24 relative shrink-0">
          <Image
            src={image}
            fill
            objectFit="cover"
            alt="productImage"
            className="rounded-2xl"
          />
        </div>
        <div className="flex flex-col justify-between flex-1 overflow-hidden">
          <div className="flex justify-between items-start gap-2">
            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <h3 className="text-[#FD543F] text-sm sm:text-baseline-clamp-2 break-words">{productName}</h3>
              <p className="text-xs line-clamp-2 break-words overflow-hidden">
                {description}
              </p>
            </div>
            <div onClick={deleteProduct}>
              <CircleX className="text-[#FD543F] shrink-0 cursor-pointer" />
            </div>
          </div>

          <div className="flex flex-row-reverse justify-between">
            <p className="text-base">{price * qty}₮</p>
            <div className="flex h-full gap-2 text-lg">
              <button type="button" onClick={minusQty}>
                <CircleMinus className="border-none" />
              </button>

              <p>{qty}</p>
              <button type="button" onClick={plusQty}>
                <CirclePlus />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
