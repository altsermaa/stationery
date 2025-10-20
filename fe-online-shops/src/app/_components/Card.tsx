import { Product } from "./ShowCards";
import Link from "next/link";

export const ProductCard = ({ image, productName, description, price, _id, quantity }: Product) => {
  return (
    <Link href={`/details/${_id}`}>
      <div className="cursor-pointer group">
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
          <div className="relative">
            <img
              src={image}
              alt={productName}
              className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {quantity === 0 && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="text-white font-semibold">Out of Stock</span>
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
              {productName}
            </h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">
              {description}
            </p>
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-gray-900">
                ${price.toFixed(2)}
              </span>
              <span className="text-sm text-gray-500">
                Stock: {quantity}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
