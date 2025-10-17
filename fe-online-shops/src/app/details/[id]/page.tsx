import axios from "axios";
import { DetailPageShow } from "./_components/DetailPageShow";
import { useParams } from "next/navigation";
import { FC } from "react";

interface Product {
  productName: string;
  price: number;
  image: string;
  _id: string;
  categoryId: string;
  description: string;
}

const DetailPage = async ({params}: {params: Promise<{id: string}>}) => {
  const { id } = await params;

  const res = await fetch(`http://localhost:8000/getSingleProduct/${id}`, {
    cache: "no-store",
  });
  const data: {fetchedData: Product } = await res.json();
  console.log(data.fetchedData);

  if (!data.fetchedData) {
    return <div>Product not found.</div>;
  }

  return (
    <div>
      <DetailPageShow
        productName={data.fetchedData.productName}
        price={data.fetchedData.price}
        image={data.fetchedData.image}
        _id={data.fetchedData._id}
        categoryId={data.fetchedData.categoryId}
        description={data.fetchedData.description}
      />
    </div>
  );
};

export default DetailPage;
