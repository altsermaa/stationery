"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {MenuIcon, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Order } from "./Order";
import { useEffect, useState } from "react";
import { Product } from "./ShowCards";
import axios from "axios";
import { SearchResult } from "./SearchResult";
import { MobileSearch } from "./MobileSearch";


export const Header = () => {
  const [search, setSearch] = useState("");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  useEffect(() => {
    const getAllProducts = async () => {
      const response = await axios.get(
        "https://onlineshop-sqmq.onrender.com/getAllProducts"
      );

      const flatProducts = Object.values(response.data.products).flat() as Product[];
    setAllProducts(flatProducts);
    };

    getAllProducts();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setProducts([]);
      return;
    }

    const filtered = allProducts.filter((product) =>
      product.productName.toLowerCase().includes(search.toLowerCase())
    );

    setProducts(filtered);
  }, [search, allProducts]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value)
    }

      const handleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
  };


    return  <div className="w-full bg-[#c93c70] lg:bg-white px-4 lg:px-10 py-3 border-b">
      {showMobileSearch ? (
        <MobileSearch handleMobileSearch={() => setShowMobileSearch(false)} />
      ) : (
      <div className="flex justify-between items-center h-[50px] w-full lg:w-[930px] m-auto lg:py-3">
        <div className="flex items-center">
          <div className="flex gap-3 items-center">
            <div className="relative flex items-center gap-1">
              <MenuIcon className="text-white h-6 w-6"/>
              {/* this is a search button on mobile display */}
              <Button
               onClick={() => setShowMobileSearch(true)}
                className="bg-[#c93c70] border-none lg:hidden p-1"
                variant="ghost"
              >
                <Search className="text-white" 
                  strokeWidth={2}
                  style={{ width: 24, height: 24 }}/>
              </Button> 
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hidden lg:block"
                  size={20}
                />
              <Input
                  type="text"
                  placeholder="Search"
                  value={search}
                  onChange={handleSearch}
                  className="hidden lg:block lg:pl-10 w-fit lg:w-[379px]"
                />
            </div>
            {!showMobileSearch && search !=="" && products.length>0 &&
             (<div className="absolute w-[577px] border border-[#e4e3e6] p-5 bg-white z-10 flex rounded-xl top-15 flex-col m-auto">
               {products.slice(0,3).map((product)=> { 
                return (<SearchResult description={product.description} categoryId={product.categoryId} key={product._id} productName={product.productName} image={product.image} _id={product._id} price={product.price}/>)
              })}
             </div>)
            }
          </div>
          <div
            className="flex gap-2 font-black items-center absolute left-1/2 transform -translate-x-1/2" 
          >
            <Link href={`/`}>
              <Image src="/logo3.jpeg" width={100} height={100} alt="logo"/>
            </Link>
          </div>
        </div>

        <div className="flex gap-3 lg:w-[723px] lg:justify-between">

          <div className="flex items-center gap-4 text-white bg-[#c93c70] lg:bg-transparent">
              <Order />
          </div>
        </div>
      </div>
)}

  </div>
}