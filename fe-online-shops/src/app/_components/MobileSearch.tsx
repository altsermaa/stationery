"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown, Search, Loader2Icon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Product } from "./ShowCards";
import { SearchResult } from "./SearchResult";

type handleMobileSearchType = {
  handleMobileSearch: () => void;
};

export const MobileSearch = ({
  handleMobileSearch,
}: handleMobileSearchType) => {
  const [search, setSearch] = useState("");
   const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const clear = () => {
    setAllProducts([]);
    setSearch("");
  };

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

  return (
    <div className="flex justify-between items-center h-[59px] px-5 relative">
      <Button variant="outline" size="icon">
        <ChevronDown />
      </Button>

      <div className="relative flex items-center">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          size={20}
        />
        <Input
          type="search"
          placeholder="Search"
          value={search}
          onChange={handleSearch}
          className="pl-10 w-[250px] outline-none shadow-none border border-none"
        />
        
        {search !== "" && products.length > 0 && (
          <div className="absolute w-[250px] border border-[#e4e3e6] p-5 bg-white z-10 flex rounded-xl top-10 flex-col m-auto">
            {products.slice(0, 3).map((product) => {
              return (
                <SearchResult
                 description={product.description} categoryId={product.categoryId} key={product._id} productName={product.productName} image={product.image} _id={product._id} price={product.price}
                />
              );
            })}
            {/* <div className="border-t-1 py-2">
              <Link href={`/searchResult?search=${search}`} onClick={clear}>
                <p className="px-4 py-2">
                  See more results of "{search}"
                </p>
              </Link>
            </div> */}
          </div>
        )}
        
        {search !== "" && products.length === 0 && (
          <div onClick={clear} className="absolute w-[250px] h-[128px] border border-[#e4e3e6] p-5 bg-white z-10 flex rounded-xl top-10 justify-center items-center m-auto">
            <Loader2Icon className="animate-spin" />
          </div>
        )}
      </div>

      <Button
        variant="outline"
        size="icon"
        onClick={handleMobileSearch}
        className="outline-none"
      >
        X
      </Button>
    </div>
  );
};
