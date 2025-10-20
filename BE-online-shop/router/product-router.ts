import { Router } from "express";
import { createProduct } from "../controller/product/create-product";
import { createCategory } from "../controller/product/create-category";
import { getAllProducts } from "../controller/product/get-all-products";
import { getSingleProduct } from "../controller/product/get-single-product";
import { getCategories } from "../controller/product/get-categories";
import { updateSingleProduct } from "../controller/product/update-single-product";
import { deleteProduct } from "../controller/product/delete-product";
import { getProductsByHoliday } from "../controller/product/get-products-by-holiday";
import { updateProductQuantity } from "../controller/product/update-product-quantity";
import { getNewArrivals } from "../controller/product/get-new-arrivals";
import { verifyToken, isAdmin } from "../middleware/auth.middleware";

export const ProductsRouter = Router();

// Public routes (no authentication required)
ProductsRouter.get("/getCategories", getCategories);
ProductsRouter.get("/getAllProducts", getAllProducts);
ProductsRouter.get("/getSingleProduct/:id", getSingleProduct);
ProductsRouter.get("/getHolidayProducts", getProductsByHoliday);
ProductsRouter.get("/getNewArrivals", getNewArrivals);

// Admin only routes (create, update, delete)
ProductsRouter.post("/createProduct", verifyToken, isAdmin, createProduct);
ProductsRouter.post("/createCategory", verifyToken, isAdmin, createCategory);
ProductsRouter.put("/updateSingleProduct", verifyToken, isAdmin, updateSingleProduct);
ProductsRouter.put("/updateProductQuantity", verifyToken, isAdmin, updateProductQuantity);
ProductsRouter.delete("/admin/deleteProduct", verifyToken, isAdmin, deleteProduct);
