import { ProductCard } from "@/app/_components/Card";

type Product = {
  _id: string;
  productName: string;
  image: string;
  price: number;
  description: string;
  categoryId: string;
  quantity: number;
};

type CategoryPageProps = {
  params: {
    name: string;
  };
};

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const categoryName = decodeURIComponent(params.name);

  const response = await fetch("http://localhost:8000/getAllProducts", {
    cache: "no-store",
  });
  const data = await response.json();
  const products: Product[] = data.products[categoryName] || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{categoryName}</h1>
          <p className="text-gray-600">
            {products.length} {products.length === 1 ? 'product' : 'products'} available
          </p>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-lg p-12 shadow-sm">
              <svg
                className="mx-auto h-24 w-24 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-500">
                There are no products available in this category yet.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard
                key={product._id}
                image={product.image}
                productName={product.productName}
                description={product.description}
                price={product.price}
                _id={product._id}
                categoryId={product.categoryId}
                quantity={product.quantity}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;

