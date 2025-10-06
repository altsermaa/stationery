import { Request, Response } from "express";
import { ProductOrderModel } from "../../model/productOrder.model";

export const updateOrder = async (request: Request, response: Response) => {
  const { orders } = request.body;

  try {
    await Promise.all(
      orders.map(
        async (order: Record<string, string>) =>
          await ProductOrderModel.findOneAndUpdate(
            { _id: order._id },
            { status: order.status }
          )
      )
    );

    response.status(200).send({ message: "Order successfully updated" });
  } catch (err) {
    response.status(400).send({ message: "aldaa", err });
  }
};
