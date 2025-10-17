import { Request, Response } from "express";
import { ProductsModel } from "../../model/product.model";


export const updateSingleProduct = async (
  request: Request,
  response: Response
) => {
  const { _id, productName, price, image, description, categoryId, subCategoryId, isNewIn, isHoliday, quantity } = request.body;

  try {
    if (!_id) {
      return response.status(400).json({
        success: false,
        message: "Product ID is required"
      });
    }

    const updateData: any = {};
    if (productName) updateData.productName = productName;
    if (price) updateData.price = price;
    if (image) updateData.image = image;
    if (description) updateData.description = description;
    if (categoryId) updateData.categoryId = categoryId;
    if (subCategoryId) updateData.subCategoryId = subCategoryId;
    if (typeof isNewIn === 'boolean') updateData.isNewIn = isNewIn;
    if (typeof isHoliday === 'boolean') updateData.isHoliday = isHoliday;
    if (quantity !== undefined) {
      if (quantity < 0) {
        return response.status(400).json({
          success: false,
          message: "Quantity must be 0 or greater"
        });
      }
      updateData.quantity = quantity;
    }
    updateData.updatedAt = new Date();

    const result = await ProductsModel.findByIdAndUpdate(
      _id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!result) {
      return response.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    response.status(200).json({
      success: true,
      message: "Updated product data successfully"
    });
  } catch (err) {
    console.error("Error updating product:", err);
    response.status(500).json({
      success: false,
      message: "Error in updating product data",
      error: err instanceof Error ? err.message : "Unknown error"
    });
  }
};
