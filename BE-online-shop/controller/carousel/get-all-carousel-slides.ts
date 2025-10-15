import { Request, Response } from "express";
import { CarouselSlideModel } from "../../model/carousel.model";

export const getAllCarouselSlides = async (req: Request, res: Response) => {
  try {
    const slides = await CarouselSlideModel.find({ isActive: true })
      .sort({ order: 1 })
      .select('-createdAt -updatedAt');

    res.status(200).json({
      success: true,
      message: "Carousel slides retrieved successfully",
      slides
    });
  } catch (error) {
    console.error("Error fetching carousel slides:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};
