import { Request, Response } from "express";
import { ProductsModel } from "../../model/product.model";
import mongoose from "mongoose";

export const getSingleProduct = async (
  request: Request,
  response: Response
) => {
  const { id } = request.params;

  try {
    // Validate MongoDB ObjectId to avoid CastError 500s
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return response.status(400).json({
        success: false,
        message: "Invalid product id",
      });
    }

    const productInfo = await ProductsModel.findById(id)
      .populate('categoryId', 'categoryName')
      .populate('subCategoryId', 'subCategoryName');

    if (!productInfo) {
      return response.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    response.status(200).json({
      success: true,
      message: "Fetched product data successfully",
      fetchedData: productInfo,
    });
  } catch (err) {
    console.error("Error fetching product:", err);
    response.status(500).json({
      success: false,
      message: "Error in fetching data",
      error: err instanceof Error ? err.message : "Unknown error"
    });
  }
};
