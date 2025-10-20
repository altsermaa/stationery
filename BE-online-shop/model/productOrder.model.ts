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
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
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
