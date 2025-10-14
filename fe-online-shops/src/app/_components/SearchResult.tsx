import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Product } from "./ShowCards";

export const SearchResult = ({productName, image, price, _id, onClear}:Product & {onClear?: () => void}) => {
    const router = useRouter(); 
    const routerHandler = (path:string) => {
        router.push(path)}
        
    const formattedPrice = price.toLocaleString();
        
    const handleClick = () => {
        onClear?.(); // Clear search results if callback provided
        routerHandler(`/details/${_id}`);
    }
        
    return     <div className="flex gap-2 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200 ease-in-out" onClick={handleClick}>
      <div className="relative w-[67px] h-[100px]">
        <Image
          src={image}
          fill
          objectFit="contain"
          alt="image"
          className="transition-transform duration-200 ease-in-out hover:scale-105"
        />
      </div>
      <div className="flex flex-col text-sm">
        <h1 className="font-medium hover:text-blue-600 transition-colors duration-200">{productName}</h1>
        <p className="text-right font-semibold text-gray-700">{formattedPrice}</p>
      </div>
    </div>
}