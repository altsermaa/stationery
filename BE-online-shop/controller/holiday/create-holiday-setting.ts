import { Request, Response } from "express";
import { HolidaySettingsModel } from "../../model/holidaySettings.model";

export const createHolidaySetting = async (req: Request, res: Response) => {
  try {
    const { holidayName } = req.body;

    if (!holidayName) {
      return res.status(400).json({
        success: false,
        message: "Holiday name is required"
      });
    }

    await HolidaySettingsModel.create({
      holidayName: holidayName.trim()
    });

    res.status(201).json({
      success: true,
      message: "Holiday setting created successfully"
    });
  } catch (error) {
    console.error("Error creating holiday setting:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};
