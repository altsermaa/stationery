import { Request, Response } from "express";
import { ProductsModel } from "../../model/product.model";

export const createProduct = async (request: Request, response: Response) => {
  const { productName, price, image, description, categoryId, subCategoryId, isNewIn, isHoliday, quantity } = request.body;

  try {
    // Validate required fields
    if (!productName || !price || !image || !description || !categoryId || !subCategoryId || quantity === undefined) {
      return response.status(400).json({
        success: false,
        message: "All fields are required: productName, price, image, description, categoryId, subCategoryId, quantity"
      });
    }

    // Validate quantity
    if (quantity < 0) {
      return response.status(400).json({
        success: false,
        message: "Quantity must be 0 or greater"
      });
    }

    const isProductExisted = await ProductsModel.findOne({ productName });

    if (!isProductExisted) {
      await ProductsModel.create({
        productName,
        price,
        image,
        description,
        categoryId,
        subCategoryId,
        isNewIn: isNewIn || false,
        isHoliday: isHoliday || false,
        quantity: quantity,
      });
      
      response.status(201).json({
        success: true,
        message: "Successfully created new product"
      });
      return;
    }

    response.status(400).json({
      success: false,
      message: "This product already exists"
    });
  } catch (err) {
    console.error("Error creating product:", err);
    response.status(500).json({
      success: false,
      message: "Internal server error",
      error: err instanceof Error ? err.message : "Unknown error"
    });
  }
};
