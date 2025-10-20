import { Request, Response } from "express";
import { UserModel } from "../../model/user.model";
import bcrypt from "bcrypt";

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { email, password, phoneNumber, address, role } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }
    
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (address) user.address = address;
    if (role) user.role = role;
    
    if (password) {
      const saltRounds = 10;
      user.password = await bcrypt.hash(password, saltRounds);
    }

    user.updatedAt = new Date();
    await user.save();

    res.status(200).json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

