import { Router } from "express";
import { createProduct } from "../controller/product/create-product";
import { createCategory } from "../controller/product/create-category";
import { getAllProducts } from "../controller/product/get-all-products";
import { getSingleProduct } from "../controller/product/get-single-product";
import { getCategories } from "../controller/product/get-categories";
import { updateSingleProduct } from "../controller/product/update-single-product";
import { deleteProduct } from "../controller/product/delete-product";

export const ProductsRouter = Router();

ProductsRouter.post("/createProduct", createProduct);
ProductsRouter.post("/createCategory", createCategory);
ProductsRouter.get("/getCategories", getCategories);
ProductsRouter.get("/getAllProducts", getAllProducts);
ProductsRouter.get("/getSingleProduct/:id", getSingleProduct);
ProductsRouter.put("/updateSingleProduct", updateSingleProduct);

ProductsRouter.delete("/admin/deleteProduct", deleteProduct);
