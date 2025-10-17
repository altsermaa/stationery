import { Request, Response } from "express";
import { HolidaySettingsModel } from "../../model/holidaySettings.model";

export const updateHolidaySetting = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { holidayName, isActive } = req.body;

    if (!holidayName && typeof isActive !== 'boolean') {
      return res.status(400).json({
        success: false,
        message: "At least one field (holidayName or isActive) is required"
      });
    }

    const updateData: any = {};
    if (holidayName) updateData.holidayName = holidayName.trim();
    if (typeof isActive === 'boolean') updateData.isActive = isActive;
    updateData.updatedAt = new Date();

    const result = await HolidaySettingsModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Holiday setting not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Holiday setting updated successfully"
    });
  } catch (error) {
    console.error("Error updating holiday setting:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};
