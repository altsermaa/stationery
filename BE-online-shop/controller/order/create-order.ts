import { Request, Response } from "express";
import { ProductOrderModel } from "../../model/productOrder.model";

export const createOrder = async (request: Request, response: Response) => {
  const { phoneNumber1, phoneNumber2, address, totalPrice, productOrderItems } = request.body;

  try {
    await ProductOrderModel.create({
      phoneNumber1: phoneNumber1,
      phoneNumber2: phoneNumber2,
      address: address, 
      totalPrice: totalPrice, 
      productOrderItems: productOrderItems
    });

    response.status(200).send({ message: "Order created successfully" });
  } catch (err) {
    response.send({ message: "Error creating order", err });
  }
};
