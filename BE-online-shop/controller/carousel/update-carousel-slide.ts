import { Request, Response } from "express";
import { CarouselSlideModel } from "../../model/carousel.model";

export const updateCarouselSlide = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Remove fields that shouldn't be updated directly
    delete updateData._id;
    delete updateData.createdAt;

    const updatedSlide = await CarouselSlideModel.findByIdAndUpdate(
      id,
      { ...updateData, updatedAt: new Date() },
      { runValidators: true }
    );

    if (!updatedSlide) {
      return res.status(404).json({
        success: false,
        message: "Carousel slide not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Carousel slide updated successfully"
    });
  } catch (error) {
    console.error("Error updating carousel slide:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};
