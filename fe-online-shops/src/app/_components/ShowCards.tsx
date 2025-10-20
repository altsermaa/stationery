import { ProductCard } from "./Card";

export interface Product {
  _id: string, 
  productName: string, 
  image: string, 
  price: number, 
  description: string, 
  categoryId: string,
  quantity: number
}

export type CategoryProductType ={
  products: Record<string, Product[]>;
}

export const ShowCards = ({ products }: CategoryProductType ) => {

    if (!products) {
    return <div>No products available</div>; 
  }
  const keys = Object.keys(products);
  console.log(products)

  return (
    <div className="w-full py-3">
      <div className="flex flex-col gap-20">
        {keys.map((el, index) => {
          return (
            <div key={index}>
              <h2 className="my-7 text-xl font-black">{el}</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products[el].slice(0, 6).map((product) => {
                  return (
                    <div key={index}>
                    <ProductCard image={product.image} productName={product.productName} description={product.description} price={product.price} _id={product._id} categoryId={product.categoryId} quantity={product.quantity}/>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
