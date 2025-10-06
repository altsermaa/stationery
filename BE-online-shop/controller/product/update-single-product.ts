import { Request, Response } from "express";
import { ProductsModel } from "../../model/product.model";


export const updateSingleProduct = async (
  request: Request,
  response: Response
) => {
  const { _id, productName, price, image, description } = request.body;

  try {
    await ProductsModel.findByIdAndUpdate(
      { _id },
      {
        productName: productName,
        price: price,
        image: image,
        description: description,

      }
    );
    response.status(200).send("Updated product data successfully");
  } catch (err) {
    response.status(400).send({ message: "Error in fetching product data", err });
  }
};
