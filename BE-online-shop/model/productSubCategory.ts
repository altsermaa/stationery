import { Schema, model } from "mongoose";

export type ProductSubCategory = {
  _id: Schema.Types.ObjectId;
  subCategoryName: string;
  categoryId: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
};

const ProductSubCategory = new Schema({
  subCategoryName: { type: String, required: true },
  categoryId: { type: Schema.ObjectId, required: true, ref: "ProductCategories" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

ProductSubCategory.index({ subCategoryName: 1, categoryId: 1 }, { unique: true });

export const ProductSubCategoryModel = model<ProductSubCategory>("ProductSubCategories", ProductSubCategory);
