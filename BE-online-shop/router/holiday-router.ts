import { Router } from "express";
import { createHolidaySetting } from "../controller/holiday/create-holiday-setting";
import { getHolidaySettings } from "../controller/holiday/get-holiday-settings";
import { updateHolidaySetting } from "../controller/holiday/update-holiday-setting";
import { deleteHolidaySetting } from "../controller/holiday/delete-holiday-setting";

const router = Router();

router.post("/createHolidaySetting", createHolidaySetting);
router.get("/getHolidaySettings", getHolidaySettings);
router.put("/updateHolidaySetting/:id", updateHolidaySetting);
router.delete("/deleteHolidaySetting/:id", deleteHolidaySetting);

export { router as HolidayRouter };
