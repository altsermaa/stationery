import { Request, Response } from "express";
import { ProductSubCategoryModel } from "../../model/productSubCategory";

export const createSubCategory = async (req: Request, res: Response) => {
  try {
    const { subCategoryName, categoryId } = req.body;

    if (!subCategoryName || !categoryId) {
      return res.status(400).json({
        success: false,
        message: "SubCategory name and category ID are required"
      });
    }

    await ProductSubCategoryModel.create({
      subCategoryName,
      categoryId
    });

    res.status(201).json({
      success: true,
      message: "SubCategory created successfully"
    });
  } catch (error) {
    console.error("Error creating subcategory:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};
