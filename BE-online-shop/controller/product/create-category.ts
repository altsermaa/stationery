import express, { Request, response, Response } from "express";
import { ProductCategoryModel } from "../../model/productCategory";


export const createCategory = async (request: Request, response: Response) => {
  const { categoryName } = request.body;
  try {
    const isCategoryExisted = await ProductCategoryModel.findOne({ categoryName });

    if (!isCategoryExisted) {
      await ProductCategoryModel.create({ categoryName });
      response.send({ message: "Successfully created category" });
      return;
    }
    response.status(400).send({ message: "This category already exists" });
  } catch (err) {
    response.send(err);
  }
};
