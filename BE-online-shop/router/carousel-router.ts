import { Router } from "express";
import { getAllCarouselSlides } from "../controller/carousel/get-all-carousel-slides";
import { createCarouselSlide } from "../controller/carousel/create-carousel-slide";
import { updateCarouselSlide } from "../controller/carousel/update-carousel-slide";
import { deleteCarouselSlide } from "../controller/carousel/delete-carousel-slide";
import { verifyToken, isAdmin } from "../middleware/auth.middleware";

const router = Router();

// Public route (no authentication required)
router.get("/getAllCarousel", getAllCarouselSlides);

// Admin only routes (create, update, delete)
router.post("/createCarousel", verifyToken, isAdmin, createCarouselSlide);
router.put("/updateCarousel/:id", verifyToken, isAdmin, updateCarouselSlide);
router.delete("/deleteCarousel/:id", verifyToken, isAdmin, deleteCarouselSlide);

export default router;
