import { Request, Response } from "express";
import { ProductsModel } from "../../model/product.model";

export const getProductsByHoliday = async (req: Request, res: Response) => {
  try {
    const products = await ProductsModel.aggregate([
      {
        $match: { isHoliday: true }
      },
      {
        $lookup: {
          from: "productcategories",
          localField: "categoryId",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },
      {
        $lookup: {
          from: "productsubcategories",
          localField: "subCategoryId",
          foreignField: "_id",
          as: "subCategoryInfo",
        },
      },
      {
        $unwind: "$categoryInfo",
      },
      {
        $unwind: "$subCategoryInfo",
      },
      {
        $group: {
          _id: "$categoryInfo.categoryName",
          products: {
            $push: {
              _id: "$_id",
              productName: "$productName",
              image: "$image",
              price: "$price",
              description: "$description",
              categoryId: "$categoryId",
              subCategoryId: "$subCategoryId",
              subCategoryName: "$subCategoryInfo.subCategoryName",
              isNewIn: "$isNewIn",
              isHoliday: "$isHoliday",
              quantity: "$quantity",
            },
          },
        },
      },
    ]);

    const groupByCategory = products.reduce((acc, item) => {
      acc[item._id] = item.products;
      return acc;
    }, {});

    res.status(200).json({
      success: true,
      message: "Holiday products retrieved successfully",
      products: groupByCategory
    });
  } catch (error) {
    console.error("Error fetching products by holiday:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};
