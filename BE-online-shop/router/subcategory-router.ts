import { Router } from "express";
import { createSubCategory } from "../controller/subcategory/create-subcategory";
import { getAllSubCategories } from "../controller/subcategory/get-all-subcategories";
import { updateSubCategory } from "../controller/subcategory/update-subcategory";
import { deleteSubCategory } from "../controller/subcategory/delete-subcategory";

const router = Router();

router.post("/createSubCategory", createSubCategory);
router.get("/getAllSubCategories", getAllSubCategories);
router.put("/updateSubCategory/:id", updateSubCategory);
router.delete("/deleteSubCategory/:id", deleteSubCategory);

export { router as SubCategoryRouter };
