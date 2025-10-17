"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { Product } from "../_components/ShowCards";
import { ProductCard } from "../_components/Card";

export default function SearchResultPage() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");
  const productsParam = searchParams.get("products");

  useEffect(() => {
    // Try to get products from URL parameters first
    if (productsParam) {
      try {
        const decodedProducts = JSON.parse(decodeURIComponent(productsParam)) as Product[];
        setFilteredProducts(decodedProducts);
        setLoading(false);
        return;
      } catch (error) {
        console.error("Error parsing products from URL:", error);
      }
    }

    // Fallback: fetch all products and filter if no products in URL
    const getAllProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/getAllProducts"
        );
        const flatProducts = Object.values(response.data.products).flat() as Product[];
        
        if (searchQuery) {
          const filtered = flatProducts.filter((product) =>
            product.productName.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setFilteredProducts(filtered);
        } else {
          setFilteredProducts([]);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    getAllProducts();
  }, [searchQuery, productsParam]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">
          Search Results for "{searchQuery}"
        </h1>
        <p className="text-gray-600">
          {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
        </p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-500">
            No products found matching "{searchQuery}"
          </p>
          <p className="text-gray-400 mt-2">
            Try searching with different keywords
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              image={product.image}
              productName={product.productName}
              description={product.description}
              price={product.price}
              _id={product._id}
              categoryId={product.categoryId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
