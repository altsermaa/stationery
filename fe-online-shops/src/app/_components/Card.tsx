import Image from "next/image";
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
import { Product } from "./ShowCards";
import Link from "next/link";

export const ProductCard = ({ image, productName, description, price, _id, categoryId}: Product) => {

let MNT = new Intl.NumberFormat('mn-MN', {
    style: 'currency',
    currency: 'MNT',
});

const convertedPrice = MNT.format(price)

  return (
    <Link href={`/details/${_id}`}>
      <Card className="h-[342px] w-full p-4 gap-5">
        <CardDescription className="h-full w-full relative">
          <Image src={image} fill objectFit="contain" alt="productImage" />
        </CardDescription>

        <CardContent>
          
              <h1 className="text-sm">{productName}</h1>
              <p className="text-gray-400 text-sm hidden lg:block">{description}</p>
        </CardContent>

        <CardFooter>
          <p className="font-black text-sm">{convertedPrice}</p>
        </CardFooter>
      </Card>
    </Link>

  );
};
