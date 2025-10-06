import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Product } from "./ShowCards";

export const SearchResult = ({productName, image, price, _id}:Product) => {
    const router = useRouter(); 
    const routerHandler = (path:string) => {
        router.push(path)}
        
    return     <div className="flex gap-2" onClick={() => routerHandler(`/details/${_id}`)}>
      <div className="relative lg:w-[67px] lg:h-[100px]">
        <Image
          src={image}
          objectFit="cover"
          fill
          alt="image"
        />
      </div>
      <div className="flex flex-col">
        <h1>{productName}</h1>
          <p>{price}</p>
        <div className="lg:w-[454px] m-auto lg:mb-8 flex justify-between">
          {/* <h1 className="font-bold text-2xl">{release_date}</h1> */}
          <Button variant="link">
            See more <ArrowRight />
          </Button>
        </div>
      </div>
      <div></div>
    </div>
}