import mongoose from "mongoose";

const TimeRangeSchema = new mongoose.Schema(
  {
    start: { type: String, required: false }, // ex: "09:00"
    end: { type: String, required: false }, // ex: "12:00"
  },
  { _id: false }
);

const WorkingHoursSchema = new mongoose.Schema({
  day: {
    type: String,
    enum: [
      "monday",
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ],
    required: true,
    unique: true,
  },
  isWorkingDay: { type: Boolean, default: false },
  morning: TimeRangeSchema,
  afternoon: TimeRangeSchema,
});

export default mongoose.model("WorkingHours", WorkingHoursSchema);
