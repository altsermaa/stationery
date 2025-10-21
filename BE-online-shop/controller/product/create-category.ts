import express, { Request, response, Response } from "express";
import { ProductCategoryModel } from "../../model/productCategory";


export const createCategory = async (request: Request, response: Response) => {
  const { categoryName } = request.body;
  try {
    const isCategoryExisted = await ProductCategoryModel.findOne({ categoryName });

    if (!isCategoryExisted) {
      const newCategory = await ProductCategoryModel.create({ categoryName });
      response.send({ 
        success: true,
        message: "Successfully created category",
        category: {
          _id: newCategory._id,
          categoryName: newCategory.categoryName
        }
      });
      return;
    }
    response.status(400).send({ 
      success: false,
      message: "This category already exists" 
    });
  } catch (err) {
    response.status(500).send({ 
      success: false,
      message: "Error creating category",
      error: err 
    });
  }
};
