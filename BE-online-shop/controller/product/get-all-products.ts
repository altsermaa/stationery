import express, { Request, response, Response } from "express";
import { ProductsModel } from "../../model/product.model";

export const getAllProducts = async (_request: Request, response: Response) => {
  try {
    const allProducts = await ProductsModel.aggregate([
      {
        $lookup: {
          from: "productcategories",
          localField: "categoryId",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },
      {
        $unwind: "$categoryInfo",
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
            },
          },
        },
      },
    ]);

    const groupByCategory = allProducts.reduce((acc, item) => {
      acc[item._id] = item.products;
      return acc;
    }, {});

    response.send({ products: groupByCategory });
  } catch (err) {
    response.send(err);
  }
};
