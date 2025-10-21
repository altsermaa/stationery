import { Request, Response } from "express";
import { ProductsModel } from "../../model/product.model";

export const createProduct = async (request: Request, response: Response) => {
  const { productName, price, image, description, categoryId, subCategoryId, isNewIn, isHoliday, quantity } = request.body;

  try {
    // Validate required fields (subCategoryId is optional)
    if (!productName || !price || !image || !description || !categoryId) {
      return response.status(400).json({
        success: false,
        message: "Required fields: productName, price, image, description, categoryId"
      });
    }

    // Set default quantity if not provided
    const productQuantity = quantity !== undefined ? quantity : 0;

    // Validate quantity
    if (productQuantity < 0) {
      return response.status(400).json({
        success: false,
        message: "Quantity must be 0 or greater"
      });
    }

    const isProductExisted = await ProductsModel.findOne({ productName });

    if (!isProductExisted) {
      const productData: any = {
        productName,
        price,
        image,
        description,
        categoryId,
        isNewIn: isNewIn || false,
        isHoliday: isHoliday || false,
        quantity: productQuantity,
      };

      // Only add subCategoryId if provided
      if (subCategoryId) {
        productData.subCategoryId = subCategoryId;
      }

      await ProductsModel.create(productData);
      
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
