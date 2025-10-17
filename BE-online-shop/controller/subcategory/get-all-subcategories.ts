import { Request, Response } from "express";
import { ProductSubCategoryModel } from "../../model/productSubCategory";

export const getAllSubCategories = async (req: Request, res: Response) => {
  try {
    const { categoryId } = req.query;

    let query = {};
    if (categoryId) {
      query = { categoryId };
    }

    const subCategories = await ProductSubCategoryModel.find(query)
      .populate('categoryId', 'categoryName')
      .sort({ subCategoryName: 1 })
      .select('-createdAt -updatedAt');

    res.status(200).json({
      success: true,
      message: "SubCategories retrieved successfully",
      subCategories
    });
  } catch (error) {
    console.error("Error fetching subcategories:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};
