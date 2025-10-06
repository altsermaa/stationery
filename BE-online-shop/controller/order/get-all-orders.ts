import { Request, Response } from "express";
import { ProductOrderModel } from "../../model/productOrder.model";

export const getAllOrders = async (_request: Request, response: Response) => {

  try {
    const allOrders = await ProductOrderModel.find({
    }).populate({
      path: "productOrderItems",
      populate: {
        path: "product",
        model: "Products",
      },
    });

    response.status(200).send({
      message: "Order fetched successfully",
      orders: allOrders,
    });
  } catch (err) {
    console.log(err);
    response.status(400).send({ message: "Cannot get orders", err });
    return;
  }
};
