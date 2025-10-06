import { Request, Response } from "express";
import { ProductsModel } from "../../model/product.model";

export const deleteProduct = async (
    request: Request,
    response: Response
  ) => {
    const {_id} = request.body;
  
    try {
      await ProductsModel.findByIdAndDelete({_id});
      response.status(200).send("Removed product successfully");
    } catch (err) {
      response.status(400).send({ message: "Error in fetching product data", err });
    }
  };