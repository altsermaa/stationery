"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {CircleUser, MenuIcon, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Order } from "./Order";
import { useEffect, useState } from "react";
import { Product } from "./ShowCards";
import axios from "axios";
import { SearchResult } from "./SearchResult";
import { MobileSearch } from "./MobileSearch";
import { usePathname } from "next/navigation";


export const Header = () => {
  const [search, setSearch] = useState("");
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await axios.get("http://localhost:8000/getAllProducts");
        
        if (response.data.products) {
          const flatProducts = Object.values(response.data.products).flat() as Product[];
          setAllProducts(flatProducts);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getAllProducts();
  }, []);

  useEffect(() => {
    if (!search.trim()) {
      setFilteredProducts([]);
      return;
    }

    const filtered = allProducts.filter((product) =>
      product.productName.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredProducts(filtered);
  }, [search, allProducts]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
  };

  const clear = () => {
    setFilteredProducts([]);
    setSearch("");
  };

  const pathName = usePathname(); 
  const paths = ["/login", "/register", "/admin"];

  return (
    <div className="w-full bg-[#c93c70] lg:bg-white px-4 lg:px-10 py-3">
      {paths.includes(pathName) ? null : (
        showMobileSearch ? (
        <MobileSearch 
          handleMobileSearch={() => setShowMobileSearch(false)} 
          allProducts={allProducts}
          search={search}
          setSearch={setSearch}
          onClear={clear}
        />
      ) : (
        <div className="flex justify-between items-center h-[50px] w-full lg:w-[930px] m-auto lg:py-3">
          
          <div className="flex items-center gap-3 lg:gap-4">
            <MenuIcon className="text-white lg:text-[#c93c70] h-6 w-6"/>
            
            <Button
              onClick={() => setShowMobileSearch(true)}
              className="bg-[#c93c70] border-none lg:hidden p-1"
              variant="ghost"
            >
              <Search className="text-white" 
                strokeWidth={2}
                style={{ width: 24, height: 24 }}/>
            </Button>
            
            <Link href={`/`} className="hidden lg:block">
              <Image src="/logo2.jpeg" width={100} height={100} alt="logo"/>
            </Link>
          </div>

          <div className="flex items-center">
            <Link href={`/`} className="lg:hidden">
              <Image src="/logo3.jpeg" width={100} height={100} alt="logo"/>
            </Link>
            
            <div className="hidden lg:block relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                type="text"
                placeholder="Search"
                value={search}
                onChange={handleSearch}
                className="pl-10 w-[379px]"
              />
              {search !== "" && filteredProducts.length > 0 && (
                <div className="absolute w-fit border border-[#e4e3e6] p-5 bg-white z-10 flex rounded-xl top-15 flex-col m-auto">
                  {filteredProducts.slice(0,3).map((product) => { 
                    return (
                      <SearchResult 
                        description={product.description} 
                        categoryId={product.categoryId} 
                        key={product._id} 
                        productName={product.productName} 
                        image={product.image} 
                        _id={product._id} 
                        price={product.price}
                        onClear={clear}
                      />
                    )
                  })}
                  {filteredProducts.length > 3 && (
                    <div className="border-t border-gray-200 py-2 mt-2">
                      <Link href={`/searchResult?search=${search}&products=${encodeURIComponent(JSON.stringify(filteredProducts))}`}>
                        <p onClick={clear} className="px-4 py-2 text-black hover:text-blue-800 cursor-pointer">
                          See more results of "{search}"
                        </p>
                      </Link>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/login">
              <CircleUser className="text-white lg:text-[#c93c70] h-6 w-6 cursor-pointer hover:opacity-80 transition-opacity"/>
            </Link>
            <Order />
          </div>
        </div>
        )
      )}
    </div>
  );
};