import { Request, Response } from "express";
import { CarouselSlideModel } from "../../model/carousel.model";

export const createCarouselSlide = async (req: Request, res: Response) => {
  try {
    const { title, subtitle, image, imageAlt, order, linkUrl, linkText, isActive = true } = req.body;

    // Validate required fields
    if (!title || !subtitle || !image || !imageAlt) {
      return res.status(400).json({
        success: false,
        message: "Title, subtitle, image, and imageAlt are required fields"
      });
    }

    // Create new carousel slide
    await CarouselSlideModel.create({
      title,
      subtitle,
      image,
      imageAlt,
      order: order || 0,
      linkUrl,
      linkText,
      isActive
    });

    res.status(201).json({
      success: true,
      message: "Carousel slide created successfully"
    });
  } catch (error) {
    console.error("Error creating carousel slide:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};
