import { Router } from "express";
import { createSubCategory } from "../controller/subcategory/create-subcategory";
import { getAllSubCategories } from "../controller/subcategory/get-all-subcategories";
import { updateSubCategory } from "../controller/subcategory/update-subcategory";
import { deleteSubCategory } from "../controller/subcategory/delete-subcategory";
import { verifyToken, isAdmin } from "../middleware/auth.middleware";

const router = Router();

// Public route (no authentication required)
router.get("/getAllSubCategories", getAllSubCategories);

// Admin only routes (create, update, delete)
router.post("/createSubCategory", verifyToken, isAdmin, createSubCategory);
router.put("/updateSubCategory/:id", verifyToken, isAdmin, updateSubCategory);
router.delete("/deleteSubCategory/:id", verifyToken, isAdmin, deleteSubCategory);

export { router as SubCategoryRouter };
