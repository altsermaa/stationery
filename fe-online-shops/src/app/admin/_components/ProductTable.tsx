"use client";
import { Product } from "@/app/_components/ShowCards";
import axios from "axios";
import { useEffect, useState } from "react";
import { ShowSingleProduct } from "./ShowSingleProduct";
import { AddProduct } from "./AddProduct";
import { AddCategory } from "./AddCategory";
import { Button } from "@/components/ui/button";

type PropsType = {
  products: Record<string, Product[]>;
};

export default function ProductTable() {
  const [products, setProducts] = useState<Record<string, Product[]>>();

 useEffect(() => {
    const getAllProducts = async () => {
      const response = await axios.get(
        "https://onlineshop-sqmq.onrender.com/getAllProducts",
       
      );
      setProducts(response?.data?.products);
    };
    getAllProducts();
  }, []);

  console.log(products);
    if (!products) return <div>Loading...</div>;
    const keys = Object.keys(products)



  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:justify-end sm:items-end mb-4 gap-2">
        <div className="flex sm:flex-row gap-2 w-full sm:w-auto">
          <AddCategory />
          <AddProduct />
        </div>
      </div>
      {
        keys.map((el, index) => {
          return (
            <div key={index}>
              <h2 className="my-5 text-3xl font-black">{el}</h2>
              <div className="w-full overflow-x-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 min-w-[320px]">
                  {products[el].length === 0 ? (
                    <div className="col-span-full p-4 text-center">No products yet.</div>
                  ) : (
                    products[el].map((product, index) => (
                      <ShowSingleProduct key={index} productName={product.productName} price={product.price} image={product.image} _id={product._id} description={product.description} categoryId={product.categoryId}/>
                    ))
                  )}
                </div>
              </div>
            </div>
          )
        })
      }
          
    </div>
  );
} 