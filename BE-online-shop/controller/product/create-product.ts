import { Request, Response } from "express";
import { ProductsModel } from "../../model/product.model";

export const createProduct = async (request: Request, response: Response) => {
  const { productName, price, image, description, categoryId } = request.body;

  try {
    const isProductExisted = await ProductsModel.findOne({ productName });

    if (!isProductExisted) {
      await ProductsModel.create({
        productName,
        price,
        image,
        description,
        categoryId,
      });
      response.send({ message: "Successfully created new product" });
      return;
    }

    response.status(400).send({ message: "This product already exists" });
  } catch (err) {
    response.send(err);
  }
};
