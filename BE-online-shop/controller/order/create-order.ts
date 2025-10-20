import { Request, Response } from "express";
import { ProductOrderModel } from "../../model/productOrder.model";
import { UserModel } from "../../model/user.model";

export const createOrder = async (request: Request, response: Response) => {
  const { userId, totalPrice, productOrderItems } = request.body;

  try {
    const newOrder = await ProductOrderModel.create({
      userId: userId,
      totalPrice: totalPrice, 
      productOrderItems: productOrderItems
    });

    // Add order to user's orderedProducts array
    await UserModel.findByIdAndUpdate(
      userId,
      { $push: { orderedProducts: newOrder._id } },
      { new: true }
    );

    response.status(200).send({ message: "Order created successfully", order: newOrder });
  } catch (err) {
    response.status(400).send({ message: "Error creating order", err });
  }
};
