import { Request, Response } from "express";
import { ProductSubCategoryModel } from "../../model/productSubCategory";

export const updateSubCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { subCategoryName, categoryId } = req.body;

    if (!subCategoryName && !categoryId) {
      return res.status(400).json({
        success: false,
        message: "At least one field (subCategoryName or categoryId) is required"
      });
    }

    const updateData: any = {};
    if (subCategoryName) updateData.subCategoryName = subCategoryName;
    if (categoryId) updateData.categoryId = categoryId;
    updateData.updatedAt = new Date();

    const result = await ProductSubCategoryModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "SubCategory not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "SubCategory updated successfully"
    });
  } catch (error) {
    console.error("Error updating subcategory:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};
