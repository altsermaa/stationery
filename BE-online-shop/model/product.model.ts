import { Schema, model } from "mongoose";

export type Products = {
  _id: Schema.Types.ObjectId;
  productName: string;
  price: number;
  image: string;
  description: string;
  categoryId: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

const Products = new Schema({
    productName: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  categoryId: { type: Schema.ObjectId, required: true, ref: "ProductCategory" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

Products.index({ productName: 1 }, { unique: true });

export const ProductsModel = model<Products>("Products", Products);
