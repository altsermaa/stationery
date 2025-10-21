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

type Category = {
  _id: string;
  categoryName: string;
};

export default function ProductTable() {
  const [products, setProducts] = useState<Record<string, Product[]>>();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    const getAllProducts = async () => {
      const response = await axios.get(
        "http://localhost:8000/getAllProducts",
      );
      setProducts(response?.data?.products);
    };
    getAllProducts();
  }, []);

  useEffect(() => {
    const getCategories = async () => {
      const response = await axios.get("http://localhost:8000/getCategories");
      setCategories(response.data.fetchedData);
    };
    getCategories();
  }, []);

  console.log(products);
  if (!products) return <div>Loading...</div>;
  const keys = Object.keys(products)



  // Filter categories based on selection
  const filteredKeys = selectedCategory === "all" 
    ? keys 
    : keys.filter(key => key === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row sm:justify-end sm:items-end gap-2">
        <div className="flex sm:flex-row gap-2 w-full sm:w-auto">
          <AddCategory />
          <AddProduct />
        </div>
      </div>

      {/* Categories Horizontal Navigation */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex items-center gap-2 mb-3">
          <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
            Filter by Category:
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            onClick={() => setSelectedCategory("all")}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
              selectedCategory === "all"
                ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Categories
          </Button>
          {categories.map((category) => (
            <Button
              key={category._id}
              onClick={() => setSelectedCategory(category.categoryName)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200 ${
                selectedCategory === category.categoryName
                  ? "bg-blue-600 text-white shadow-sm hover:bg-blue-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {category.categoryName}
              <span className="ml-2 px-1.5 py-0.5 text-xs rounded-full bg-white/20">
                {products[category.categoryName]?.length || 0}
              </span>
            </Button>
          ))}
        </div>
      </div>

      {/* Products Display */}
      <div className="space-y-8">
        {filteredKeys.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-500">No products found in this category.</p>
          </div>
        ) : (
          filteredKeys.map((el, index) => {
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{el}</h2>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                    {products[el].length} {products[el].length === 1 ? 'product' : 'products'}
                  </span>
                </div>
                <div className="w-full overflow-x-auto">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 min-w-[320px]">
                    {products[el].length === 0 ? (
                      <div className="col-span-full p-8 text-center bg-gray-50 rounded-lg">
                        <p className="text-gray-500">No products yet in this category.</p>
                      </div>
                    ) : (
                      products[el].map((product, index) => (
                        <ShowSingleProduct 
                          key={index} 
                          productName={product.productName} 
                          price={product.price} 
                          image={product.image} 
                          _id={product._id} 
                          description={product.description} 
                          categoryId={product.categoryId}
                          quantity={product.quantity}
                        />
                      ))
                    )}
                  </div>
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  );
} 