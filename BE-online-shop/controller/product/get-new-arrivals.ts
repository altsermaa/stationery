import { Request, Response } from "express";
import { ProductsModel } from "../../model/product.model";

export const getNewArrivals = async (req: Request, res: Response) => {
  try {
    const newArrivals = await ProductsModel.aggregate([
      {
        $match: { isNewIn: true }
      },
      {
        $lookup: {
          from: "productcategories",
          localField: "categoryId",
          foreignField: "_id",
          as: "categoryInfo"
        }
      },
      {
        $unwind: "$categoryInfo"
      },
      {
        $lookup: {
          from: "productsubcategories",
          localField: "subCategoryId",
          foreignField: "_id",
          as: "subCategoryInfo"
        }
      },
      {
        $unwind: "$subCategoryInfo"
      },
      {
        $project: {
          _id: 1,
          productName: 1,
          price: 1,
          image: 1,
          description: 1,
          quantity: 1,
          isNewIn: 1,
          isHoliday: 1,
          categoryName: "$categoryInfo.categoryName",
          subCategoryName: "$subCategoryInfo.subCategoryName",
          createdAt: 1
        }
      },
      {
        $sort: { createdAt: -1 }
      }
    ]);

    res.status(200).json({
      success: true,
      message: "New arrivals retrieved successfully",
      products: newArrivals
    });
  } catch (error) {
    console.error("Error fetching new arrivals:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};
