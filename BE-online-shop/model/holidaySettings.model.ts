import { Schema, model } from "mongoose";

export type HolidaySettings = {
  _id: Schema.Types.ObjectId;
  holidayName: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};

const HolidaySettings = new Schema({
  holidayName: { type: String, required: true, unique: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

HolidaySettings.index({ holidayName: 1 }, { unique: true });

export const HolidaySettingsModel = model<HolidaySettings>("HolidaySettings", HolidaySettings);
