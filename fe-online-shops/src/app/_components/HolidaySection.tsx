"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Product {
  _id: string;
  productName: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
  isHoliday: boolean;
}

interface HolidaySetting {
  _id: string;
  holidayName: string;
  isActive: boolean;
}

const HolidaySection = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [holidaySettings, setHolidaySettings] = useState<HolidaySetting[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    fetchHolidayData();
  }, []);

  const fetchHolidayData = async () => {
    try {
      // Fetch holiday settings and products in parallel
      const [settingsResponse, productsResponse] = await Promise.all([
        fetch("http://localhost:8000/getHolidaySettings"),
        fetch("http://localhost:8000/getHolidayProducts")
      ]);

      const settingsData = await settingsResponse.json();
      const productsData = await productsResponse.json();

      if (settingsData.success && Array.isArray(settingsData.holidaySettings)) {
        setHolidaySettings(settingsData.holidaySettings);
      }

      if (productsData.success && productsData.products) {
        // Flatten all products from all categories (products is an object with category names as keys)
        const allProducts = Object.values(productsData.products).flat() as Product[];
        setProducts(allProducts);
      }
    } catch (error) {
      console.error("Error fetching holiday data:", error);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex + 4 >= products.length ? 0 : prevIndex + 4
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex - 4 < 0 ? Math.max(0, products.length - 4) : prevIndex - 4
    );
  };

  const handleProductClick = (productId: string) => {
    router.push(`/details/${productId}`);
  };

  // Get active holiday name
  const activeHoliday = holidaySettings?.find(setting => setting.isActive);
  const holidayName = activeHoliday?.holidayName || "";

  // Don't render if no active holiday or no holiday name
  if (!activeHoliday || !holidayName) {
    return null;
  }

  if (loading) {
    return (
      <div className="py-8">
        <div className="w-[360px] lg:w-[930px] mx-auto">
          <h2 className="text-2xl font-bold mb-6">🎉 {holidayName}</h2>
          <div className="flex space-x-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="flex-shrink-0 w-64 h-80 bg-gray-200 animate-pulse rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-8">
        <div className="w-[360px] lg:w-[930px] mx-auto">
          <h2 className="text-2xl font-bold mb-6">🎉 {holidayName}</h2>
          <p className="text-gray-500 text-center py-8">No holiday products available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8 bg-gradient-to-r from-red-50 to-green-50">
      <div className="w-[360px] lg:w-[930px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">🎉 {holidayName}</h2>
          <div className="flex space-x-2">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
              disabled={products.length <= 4}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-white shadow-md hover:shadow-lg transition-shadow"
              disabled={products.length <= 4}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 272}px)` }}
          >
            {products.map((product) => (
              <div
                key={product._id}
                className="flex-shrink-0 w-64 mx-2 cursor-pointer group"
                onClick={() => handleProductClick(product._id)}
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.productName}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                      🎉 HOLIDAY
                    </div>
                    {product.quantity === 0 && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <span className="text-white font-semibold">Out of Stock</span>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {product.productName}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-gray-900">
                        ${product.price.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500">
                        Stock: {product.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {products.length > 4 && (
          <div className="flex justify-center mt-4 space-x-2">
            {Array.from({ length: Math.ceil(products.length / 4) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * 4)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  Math.floor(currentIndex / 4) === index ? 'bg-gray-900' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HolidaySection;
