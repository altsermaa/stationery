import { Request, Response } from "express";
import { ProductsModel } from "../../model/product.model";

export const updateProductQuantity = async (req: Request, res: Response) => {
  try {
    const { productId, quantity, operation } = req.body;

    if (!productId || quantity === undefined) {
      return res.status(400).json({
        success: false,
        message: "Product ID and quantity are required"
      });
    }

    if (quantity < 0) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be 0 or greater"
      });
    }

    const product = await ProductsModel.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    let newQuantity = quantity;

    // Handle different operations
    if (operation === 'add') {
      newQuantity = product.quantity + quantity;
    } else if (operation === 'subtract') {
      newQuantity = product.quantity - quantity;
      if (newQuantity < 0) {
        return res.status(400).json({
          success: false,
          message: "Cannot subtract more than available quantity"
        });
      }
    } else if (operation === 'set') {
      newQuantity = quantity;
    }

    const result = await ProductsModel.findByIdAndUpdate(
      productId,
      { 
        quantity: newQuantity,
        updatedAt: new Date()
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Product quantity updated successfully",
      product: {
        _id: result?._id,
        productName: result?.productName,
        quantity: result?.quantity
      }
    });
  } catch (error) {
    console.error("Error updating product quantity:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};
