import { Router } from "express";
import { getAllCarouselSlides } from "../controller/carousel/get-all-carousel-slides";
import { createCarouselSlide } from "../controller/carousel/create-carousel-slide";
import { updateCarouselSlide } from "../controller/carousel/update-carousel-slide";
import { deleteCarouselSlide } from "../controller/carousel/delete-carousel-slide";

const router = Router();

// GET /api/carousel - Get all active carousel slides
router.get("/", getAllCarouselSlides);

// POST /api/carousel - Create a new carousel slide
router.post("/", createCarouselSlide);

// PUT /api/carousel/:id - Update a carousel slide
router.put("/:id", updateCarouselSlide);

// DELETE /api/carousel/:id - Delete a carousel slide
router.delete("/:id", deleteCarouselSlide);

export default router;
