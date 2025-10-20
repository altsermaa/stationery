import { Router } from "express";
import { createHolidaySetting } from "../controller/holiday/create-holiday-setting";
import { getHolidaySettings } from "../controller/holiday/get-holiday-settings";
import { updateHolidaySetting } from "../controller/holiday/update-holiday-setting";
import { deleteHolidaySetting } from "../controller/holiday/delete-holiday-setting";
import { getActiveHoliday } from "../controller/holiday/get-active-holiday";
import { verifyToken, isAdmin } from "../middleware/auth.middleware";

const router = Router();

// Public routes (no authentication required)
router.get("/getHolidaySettings", getHolidaySettings);
router.get("/getActiveHoliday", getActiveHoliday);

// Admin only routes (create, update, delete)
router.post("/createHolidaySetting", verifyToken, isAdmin, createHolidaySetting);
router.put("/updateHolidaySetting/:id", verifyToken, isAdmin, updateHolidaySetting);
router.delete("/deleteHolidaySetting/:id", verifyToken, isAdmin, deleteHolidaySetting);

export { router as HolidayRouter };
