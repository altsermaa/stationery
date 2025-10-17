import { Request, Response } from "express";
import { ProductSubCategoryModel } from "../../model/productSubCategory";
import { ProductsModel } from "../../model/product.model";

export const deleteSubCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    // Check if any products are using this subcategory
    const productsUsingSubCategory = await ProductsModel.find({ subCategoryId: id });
    
    if (productsUsingSubCategory.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete subcategory. ${productsUsingSubCategory.length} product(s) are using this subcategory. Please reassign or delete those products first.`
      });
    }

    const result = await ProductSubCategoryModel.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "SubCategory not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "SubCategory deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting subcategory:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};
