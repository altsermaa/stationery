import { Request, Response } from "express";
import { HolidaySettingsModel } from "../../model/holidaySettings.model";

export const deleteHolidaySetting = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const result = await HolidaySettingsModel.findByIdAndDelete(id);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Holiday setting not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Holiday setting deleted successfully"
    });
  } catch (error) {
    console.error("Error deleting holiday setting:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};
