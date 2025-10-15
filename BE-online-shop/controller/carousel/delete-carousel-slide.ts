import { Request, Response } from "express";
import { CarouselSlideModel } from "../../model/carousel.model";

export const deleteCarouselSlide = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const deletedSlide = await CarouselSlideModel.findByIdAndDelete(id);

    if (!deletedSlide) {
      return res.status(404).json({
        success: false,
        message: "Carousel slide not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Carousel slide deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting carousel slide:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};
