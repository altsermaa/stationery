import { Request, Response } from "express";
import { HolidaySettingsModel } from "../../model/holidaySettings.model";

export const getActiveHoliday = async (req: Request, res: Response) => {
  try {
    const activeHoliday = await HolidaySettingsModel.findOne({ isActive: true });

    if (!activeHoliday) {
      return res.status(200).json({
        success: true,
        message: "No active holiday found",
        holiday: null
      });
    }

    res.status(200).json({
      success: true,
      message: "Active holiday retrieved successfully",
      holiday: activeHoliday
    });
  } catch (error) {
    console.error("Error fetching active holiday:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};
