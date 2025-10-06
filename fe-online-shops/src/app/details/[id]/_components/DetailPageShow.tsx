"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { SkeletonDetails } from "./Skeleton";
import { CirclePlus, Dot, Play, Plus, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Product } from "@/app/_components/ShowCards";
import { useCart } from "@/app/_components/CartProvider";
import { CartItemType } from "@/app/_components/CartProvider";

export const DetailPageShow = ({
  productName,
  price,
  image,
  _id,
  categoryId,
  description,
}: Product) => {
  const [loading, setLoading] = useState<Boolean>(false);
  const handleLoading = () => {
    setLoading(!loading);
  };

  const [addcount, setAddCount] = useState<number>(1);
  const { setCart } = useCart();

  const minusQty = () => {
    addcount > 1 && setAddCount((prev) => prev - 1);
  };
  const plusQty = () => {
    setAddCount((prev) => prev + 1);
  };

  const storageKey = "productCart";

  const saveUnitData = () => {
    const existingData = localStorage.getItem(storageKey);
    const cartItems: CartItemType[] = existingData ? JSON.parse(existingData) : [];

    const isProductExisting = cartItems.find((product) => product._id === _id);

    if (isProductExisting) {
      const newProducts = cartItems.map((product) => {
        if (product._id === _id) {
          return { ...product, addcount };
        } else {
          return product;
        }
      });
      localStorage.setItem(storageKey, JSON.stringify(newProducts));
      setCart(newProducts);
    } else {
      const newProduct: CartItemType = { productName, price, _id, addcount, description, image, categoryId };
      const newProducts = [...cartItems, newProduct];
      localStorage.setItem(storageKey, JSON.stringify(newProducts));
      setCart(newProducts);
    }
  };

  return loading ? (
    <SkeletonDetails />
  ) : (
    <>
      <div className="flex flex-col px-4 my-8 mx-auto w-full max-w-[930px] lg:px-0 lg:mt-14 lg:mb-28">
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          <div className="flex-2/3">
            <h1 className="text-2xl font-bold">{productName}</h1>
            <div className="flex">
              <p>{price}</p>
            </div>
          </div>
          <div className="flex flex-col items-end justify-start">
            <div className="h-[16px]"></div>
            <div className="flex items-center gap-2.5">
              <Star className="text-[#f6e238] fill-yellow-300" />
            </div>
          </div>
        </div>
        <div className="relative w-full h-[211px] mt-4 mb-8 lg:hidden">
          <Image
            src={image}
            fill
            objectFit="contain"
            alt="productImage"
          />
          <div className="absolute top-3/4 left-3 z-10 flex items-center gap-3">
            <Button className="bg-white rounded-4xl text-black" size="icon">
              {/* <Plus id={id} /> */}
            </Button>
          </div>
        </div>
        {/* Desktop image */}
        <div className="hidden lg:block relative w-full max-w-[400px] h-[400px] mx-auto mb-8">
          <Image
            src={image}
            fill
            objectFit="contain"
            alt="productImage"
            className="rounded-xl"
          />
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex-2/3">
            <div className="flex flex-col gap-5">
              <p className="text-base">{description}</p>
            </div>
          </div>

          <div className="flex justify-between">
                  <div className="flex flex-col">
                    <h3>Нийт үнэ</h3>
                    <p>{price * addcount}</p>
                  </div>
                  <div className="flex h-full gap-2">
                    <button type="button" onClick={minusQty}>
                      <CirclePlus />
                    </button>

                    <p>{addcount}</p>
                    <button type="button" onClick={plusQty}>
                      <CirclePlus />
                    </button>
                  </div>
                </div>
          <Button type="button" className="w-full lg:w-[300px]" onClick={saveUnitData}>
            Сагслах
          </Button>
        </div>
      </div>
    </>
  );
};
