import { Request, Response } from "express";
import { HolidaySettingsModel } from "../../model/holidaySettings.model";

export const getHolidaySettings = async (req: Request, res: Response) => {
  try {
    const holidaySettings = await HolidaySettingsModel.find({ isActive: true })
      .sort({ holidayName: 1 })
      .select('-createdAt -updatedAt');

    res.status(200).json({
      success: true,
      message: "Holiday settings retrieved successfully",
      holidaySettings
    });
  } catch (error) {
    console.error("Error fetching holiday settings:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};
