"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

type Category = {
  _id: string;
  categoryName: string;
};

type Product = {
  _id: string;
  productName: string;
  image: string;
  price: number;
  description: string;
  categoryId: string;
  quantity: number;
};

type CategoryWithProducts = {
  category: Category;
  image: string;
  productCount: number;
};

export const CategoryBox = ({ products }: { products: Record<string, Product[]> }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryData, setCategoryData] = useState<CategoryWithProducts[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8000/getCategories");
        setCategories(response.data.fetchedData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0 && products) {
      const data = categories.map((category) => {
        const categoryProducts = products[category.categoryName] || [];
        // Get the first product's image for the category thumbnail
        const image = categoryProducts.length > 0 ? categoryProducts[0].image : "/logo2.jpeg";
        return {
          category,
          image,
          productCount: categoryProducts.length,
        };
      });
      setCategoryData(data);
    }
  }, [categories, products]);

  if (categoryData.length === 0) {
    return null;
  }

  return (
    <div className="w-full lg:w-[930px] mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Shop by Category</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
        {categoryData.map((item) => (
          <Link
            key={item.category._id}
            href={`/category/${encodeURIComponent(item.category.categoryName)}`}
            className="group"
          >
            <div className="bg-white rounded-xl border-2 border-gray-200 overflow-hidden hover:border-blue-500 hover:shadow-lg transition-all duration-300 cursor-pointer">
              {/* Image Container */}
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.category.categoryName}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                />
              </div>
              
              {/* Category Info */}
              <div className="p-4 text-center">
                <h3 className="font-bold text-gray-900 text-sm md:text-base mb-1 group-hover:text-blue-600 transition-colors">
                  {item.category.categoryName}
                </h3>
                <p className="text-xs md:text-sm text-gray-500">
                  {item.productCount} {item.productCount === 1 ? 'item' : 'items'}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

