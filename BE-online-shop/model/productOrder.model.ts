import { Schema, model } from "mongoose";

const ProductOrderItem = new Schema(
  {
    product: { type: Schema.ObjectId, required: true, ref: "Products" },
    quantity: { type: Number, required: true },
  },
  { _id: false }
);

enum ProductOrderEnum {
  PENDING = "PENDING",
  CANCELLED = "CANCELLED",
  DELIVERED = "DELIVERED",
}

const ProductOrder = new Schema({
  phoneNumber1: { type: String, required: true},
  phoneNumber2: { type: String, required: true},
  address: { type: String, required: true },
  totalPrice: { type: Number, required: true },
  productOrderItems: { type: [ProductOrderItem], required: true },
  status: {
    type: String,
    enum: ["PENDING", "CANCELLED", "DELIVERED"],
    default: ProductOrderEnum.PENDING,
    required: true,
  },
  createdAt: { type: Date, default: Date.now, immutable: true },
  updatedAt: { type: Date, default: Date.now },
});

export const ProductOrderModel = model("ProductOrder", ProductOrder);
