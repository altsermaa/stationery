import { Schema, model } from "mongoose";

const ProductCategory = new Schema({
  categoryName: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

ProductCategory.index({ categoryName: 1 }, { unique: true });

export const ProductCategoryModel = model("ProductCategories", ProductCategory);
