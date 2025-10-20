import { Request, Response } from "express";
import { UserModel } from "../../model/user.model";

export const getUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const user = await UserModel.findById(userId)
      .select("-password")
      .populate({
        path: "orderedProducts",
        populate: {
          path: "productOrderItems",
          populate: {
            path: "product",
            model: "Products"
          }
        }
      });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "User retrieved successfully",
      user
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

