import { Router } from "express";
import { getAllCarouselSlides } from "../controller/carousel/get-all-carousel-slides";
import { createCarouselSlide } from "../controller/carousel/create-carousel-slide";
import { updateCarouselSlide } from "../controller/carousel/update-carousel-slide";
import { deleteCarouselSlide } from "../controller/carousel/delete-carousel-slide";

const router = Router();

router.get("/getAllCarousel", getAllCarouselSlides);

router.post("/createCarousel", createCarouselSlide);

router.put("/updateCarousel/:id", updateCarouselSlide);

router.delete("/deleteCarousel/:id", deleteCarouselSlide);

export default router;
