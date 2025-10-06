import { Request, Response } from "express";
import { ProductCategoryModel } from "../../model/productCategory";


export const getCategories = async (
  _request: Request,
  response: Response
) => {

  try {
    const categories = await ProductCategoryModel.find();

    response.status(200).send({
      message: "Fetched categories successfully",
      fetchedData: categories,
    });
  } catch (err) {
    response.status(400).send({ message: "Error in fetching data", err });
  }
};
